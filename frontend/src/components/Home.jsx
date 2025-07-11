/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./shared/NavBar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  const features = [
    {
      icon: "🚀",
      title: "Quick Hiring",
      description: "Connect with top talent faster than ever before",
    },
    {
      icon: "🔍",
      title: "Advanced Search",
      description: "Find the perfect candidate with our powerful filters",
    },
    {
      icon: "💼",
      title: "Multiple Jobs",
      description: "Post and manage multiple job listings easily",
    },
  ];

  const companies = [
    { name: "Walmart", logo: "./images/walmarth.jpg" },
    { name: "Amazon", logo: "./images/amazon.jpeg" },
    { name: "Adobe", logo: "./images/Adobe.png" },
    { name: "Flipkart", logo: "./images/flipkart.jpeg" },
    { name: "Microsoft", logo: "./images/Microsoft.jpeg" },
    { name: "Deloitte", logo: "./images/Deloittte.jpeg" },
    { name: "Juspay", logo: "./images/juspay.jpg" },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />

      <Box
        sx={{
          backgroundColor: "#4682B4",
          py: 4,
          my: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Trusted By Leading Companies
          </Typography>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {companies.map((company, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                }}
              >
                <Box
                  component="img"
                  src={company.logo}
                  alt={company.name}
                  sx={{
                    maxHeight: 60,
                    maxWidth: "80%",
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#4682B4",
            fontWeight: "bold",
            mb: 6,
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              background: "#4682B4",
              margin: "16px auto 0",
              borderRadius: "2px",
            },
          }}
        >
          Our Key Features
        </Typography>

        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "4px",
              height: "100%",
              background: "#4682B4",
              opacity: 0.2,
              borderRadius: "4px",
            },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                mb: 6,
                display: "flex",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                alignItems: "center",
              }}
            >
              {/* Timeline Dot with Icon */}
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "4px solid #4682B4",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#4682B4",
                }}
              >
                {feature.icon}
              </Box>

              {/* Feature Card */}
              <Card
                sx={{
                  width: "calc(50% - 40px)",
                  p: 3,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(70, 130, 180, 0.1)",
                  background: "#fff",
                  border: "1px solid rgba(70, 130, 180, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 24px rgba(70, 130, 180, 0.2)",
                    borderColor: "#4682B4",
                    background: "rgba(70, 130, 180, 0.03)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#4682B4",
                    fontWeight: "bold",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
