import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";

const MotionBox = motion(Box);

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const headerElements = [
    { label: "Home", path: "/home", function: () => navigate("/home") },
    { label: "Profile", path: "profile", function: () => navigate("profile") },
    { label: "Produce", path: "produce", function: () => navigate("produce") },
    { label: "Play", path: "play", function: () => navigate("play") },
    { label: "Logout", path: "login", function: logout },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <MotionBox
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          width: "90%",
          maxWidth: 1100,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          px: 4,
          py: 1.5,

          borderRadius: "999px",

          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <Typography
          onClick={() => navigate("/home")}
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "-0.5px",
            color: "#1d1d1f",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          MelodicsAI
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 4,
          }}
        >
          {headerElements.map((element) => {
            const isActive = location.pathname === element.path;

            return (
              <Typography
                key={element.label}
                onClick={element.function}
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: isActive ? "#000" : "#6e6e73",
                  position: "relative",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    color: "#000",
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: isActive ? "100%" : "0%",
                    height: "2px",
                    backgroundColor: "#000",
                    transition: "width 0.3s ease",
                  },

                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {element.label}
              </Typography>
            );
          })}
        </Box>
      </MotionBox>
    </Box>
  );
}

export default Header;
