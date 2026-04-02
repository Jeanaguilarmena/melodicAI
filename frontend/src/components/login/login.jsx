import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const { authed, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && authed) {
      navigate("/home", { replace: true });
    }
  }, [authed, loading, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box
        sx={{
          width: 380,
          padding: "48px 40px",
          borderRadius: "28px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.65)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.5px",
            mb: 1,
          }}
        >
          Welcome back
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            color: "rgba(0,0,0,0.6)",
            mb: 4,
          }}
        >
          Sign in to continue
        </Typography>

        <Button
          onClick={signInWithGoogle}
          disableElevation
          sx={{
            width: "100%",
            borderRadius: "14px",
            padding: "12px 0",
            textTransform: "none",
            fontSize: 15,
            fontWeight: 500,
            backgroundColor: "#000",
            color: "#fff",
            transition: "all 0.25s ease",
            "&:hover": {
              backgroundColor: "#1a1a1a",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          Continue with Google
        </Button>
      </Box>
    </motion.div>
  );
}

export default Login;
