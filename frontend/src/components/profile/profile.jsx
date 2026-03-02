import React from "react";
import { Box, Button, Card, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import profilePhoto from "../../assets/profilePhoto.png";
import RecentProjects from "../recentProjects/recentProjects";
import { useNavigate } from "react-router-dom";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

function Profile() {
  const navigate = useNavigate();
  function handleSeeAllProjects() {
    navigate("/projects");
  }
  const projects = ["Midnight Echo", "Soft Horizon", "Analog Dreams"];
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 4,
        pt: 14,
        pb: 8,
        background: "linear-gradient(to bottom, #f8f8f8, #f2f2f2)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <MotionCard
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          sx={{
            borderRadius: "28px",
            px: 5,
            py: 6,
            mb: 6,

            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.06)",

            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Box
            component={motion.img}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            src={profilePhoto}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "24px",
              objectFit: "cover",
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 600,
                letterSpacing: "-0.5px",
                color: "#1d1d1f",
              }}
            >
              Jeannatar
            </Typography>

            <Typography sx={{ color: "#6e6e73", mt: 1 }}>
              Music Producer · Costa Rica
            </Typography>

            <Button
              sx={{
                mt: 3,
                px: 4,
                py: 1,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                background: "#1d1d1f",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#000",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </MotionCard>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 6,
            px: 2,
          }}
        >
          {[
            { label: "Projects", value: 12 },
            { label: "Melodies Generated", value: 48 },
            { label: "Favorite Genre", value: "Lo-fi" },
            { label: "Hours Created", value: "3h 42m" },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "#1d1d1f",
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#8e8e93",
                  mt: 0.5,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </MotionBox>

        <Divider sx={{ mb: 5, opacity: 0.6 }} />

        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 600,
            mb: 3,
            color: "#1d1d1f",
          }}
        >
          Recent Projects
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {projects.map((project) => (
            <RecentProjects key={project} project={project} />
          ))}
        </Box>

        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Typography
            onClick={handleSeeAllProjects}
            sx={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#1d1d1f",
              cursor: "pointer",
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 0.6 },
            }}
          >
            View All Projects →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
