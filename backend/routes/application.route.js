import express from "express";
import {
  applyJob,
  getApplicants,
  getApplication,
  updateStatus,
  getApplicantsDetails,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getApplication);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
router
  .route("/:id/applicants/details")
  .get(isAuthenticated, getApplicantsDetails);

export default router;
