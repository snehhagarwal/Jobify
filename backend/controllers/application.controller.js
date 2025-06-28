import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;

    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }
    //check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    //check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }
    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job Applied Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplication = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job Found Successfully",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//recruiter
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants Fetched Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    //finding the applicant using applicationId
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicantsDetails = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      .populate({
        path: "applicant",
        select: "fullname email phoneNumber profile",
        populate: {
          path: "profile",
          select: "resume resumeOriginalName skills",
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId)
      .select("title company")
      .populate("company", "name");

    return res.status(200).json({
      message: "Applicants details fetched successfully",
      success: true,
      data: {
        job: {
          title: job.title,
          company: job.company.name,
        },
        applications: applications.map((app) => ({
          id: app._id,
          status: app.status,
          appliedAt: app.createdAt,
          name: app.applicant.fullname,
          email: app.applicant.email,
          phone: app.applicant.phoneNumber,
          resume: app.applicant.profile?.resume,
          resumeName: app.applicant.profile?.resumeOriginalName,
          skills: app.applicant.profile?.skills || [],
        })),
        total: applications.length,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
