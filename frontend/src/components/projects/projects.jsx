import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionCard = motion(Card);

function Projects({ photo, project }) {
  const navigate = useNavigate();
  function handleOpenProject() {
    navigate(`/home/projects/${project.id}`, {
      state: { project },
    });
  }

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      sx={{
        p: 3,
        borderRadius: "24px",

        backdropFilter: "blur(24px)",
        background: "rgba(255,255,255,0.75)",

        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.06)",

        transition: "all 0.4s ease",
        cursor: "pointer",

        "&:hover": {
          boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
        },

        "&:hover .open-text": {
          opacity: 1,
          transform: "translateY(0px)",
        },
      }}
      onClick={handleOpenProject}
    >
      {/* IMAGE */}
      <Box
        component={motion.img}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        src={photo}
        sx={{
          width: "100%",
          height: 160,
          borderRadius: "18px",
          objectFit: "cover",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          mb: 3,
        }}
      />

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "1.1rem",
          fontWeight: 600,
          letterSpacing: "-0.3px",
          color: "#1d1d1f",
        }}
      >
        {project.name}
      </Typography>

      {/* ARTIST */}
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#6e6e73",
          mt: 0.5,
        }}
      >
        {project.artist}
      </Typography>

      {/* DESCRIPTION */}
      <Typography
        sx={{
          fontSize: "0.85rem",
          color: "#8e8e93",
          mt: 1.5,
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </Typography>

      {/* META CAPSULES */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          mt: 2.5,
          flexWrap: "wrap",
        }}
      >
        {[project.genre, `${project.bpm} BPM`, project.scale].map(
          (item, index) => (
            <Box
              key={index}
              sx={{
                px: 2,
                py: 0.7,
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#1d1d1f",

                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
              }}
            >
              {item}
            </Box>
          )
        )}
      </Box>

      {/* OPEN */}
      <Typography
        className="open-text"
        sx={{
          mt: 3,
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "#1d1d1f",
          opacity: 0,
          transform: "translateY(6px)",
          transition: "all 0.4s ease",
        }}
      >
        Open Project →
      </Typography>
    </MotionCard>
  );
}

export default Projects;
