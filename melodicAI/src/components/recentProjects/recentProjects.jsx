import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

function RecentProjects({ project }) {
  return (
    <MotionCard
      key={project}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      sx={{
        px: 4,
        py: 3,
        borderRadius: "20px",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            color: "#1d1d1f",
          }}
        >
          {project}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "#8e8e93",
            mt: 0.5,
          }}
        >
          120 BPM · Generated with AI
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: "0.85rem",
          color: "#6e6e73",
        }}
      >
        Open →
      </Typography>
    </MotionCard>
  );
}

export default RecentProjects;
