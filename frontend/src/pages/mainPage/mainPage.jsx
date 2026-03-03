import React from "react";
import { Box, Button, Card, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

function MainPage() {
  const navigate = useNavigate();
  function handleStartCreating() {
    navigate("/home/produce");
  }

  return (
    <Box
      sx={{
        marginTop: "80px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 600,
              letterSpacing: "-1px",
              color: "#1d1d1f",
            }}
          >
            MelodicsAI
          </Typography>

          <Typography
            sx={{
              fontSize: "1.3rem",
              color: "#6e6e73",
              mt: 2,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Your AI Copilot for writing expressive melodies.
          </Typography>

          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            sx={{ mt: 4 }}
          >
            <Button
              onClick={handleStartCreating}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                px: 5,
                py: 1.5,
                borderRadius: "999px",
                fontSize: "16px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1d1d1f",
                },
              }}
            >
              Start Creating
            </Button>
          </MotionBox>
        </MotionBox>

        <MotionCard
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          sx={{
            p: 6,
            borderRadius: 6,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: 600,
              color: "#1d1d1f",
              mb: 4,
            }}
          >
            How it works
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {[
              "Enter your chord progression",
              "Generate an AI melody",
              "Refine, export or save",
            ].map((step, index) => (
              <MotionBox
                key={index}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                sx={{
                  maxWidth: 220,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#6e6e73",
                  }}
                >
                  {step}
                </Typography>
              </MotionBox>
            ))}
          </Box>
        </MotionCard>

        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          sx={{
            mt: 8,
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            sx={{
              height: 400,
              background: "linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6e6e73",
              fontSize: "1.2rem",
            }}
          >
            Demo Video (Coming Soon)
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default MainPage;
