import React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Container,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import pianoRollWallpaper from "../../assets/pianoRollWallpaper.png";

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
        minHeight: "100vh",
        background: "linear-gradient(180deg,#ffffff 0%,#f5f5f7 100%)",
        pt: "120px",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "1.1fr 1fr" },
            gap: 8,
            alignItems: "center",
            mb: 16,
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3rem", md: "4.5rem" },
                fontWeight: 600,
                letterSpacing: "-1.5px",
                color: "#1d1d1f",
                lineHeight: 1.05,
              }}
            >
              MelodicsAI
            </Typography>

            <Typography
              sx={{
                fontSize: "1.4rem",
                color: "#6e6e73",
                mt: 3,
                maxWidth: 480,
              }}
            >
              Your AI copilot for composing expressive melodies and musical
              ideas instantly.
            </Typography>

            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280 }}
              sx={{ mt: 5 }}
            >
              <Button
                onClick={handleStartCreating}
                sx={{
                  px: 6,
                  py: 1.6,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  background: "#1d1d1f",
                  color: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  transition: "all .25s ease",
                  "&:hover": {
                    background: "#000",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Start Creating
              </Button>
            </MotionBox>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Card
              sx={{
                height: 420,
                borderRadius: "28px",
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6e6e73",
                fontSize: "1.1rem",
              }}
            >
              <CardMedia
                component="img"
                image={pianoRollWallpaper}
                alt="preview"
                sx={{
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </MotionBox>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(3,1fr)" },
            gap: 6,
            mb: 16,
          }}
        >
          {[
            {
              title: "AI Melody Generation",
              text: "Generate expressive melodies based on your harmony and musical context.",
            },
            {
              title: "Smart Harmony Context",
              text: "Understand chord progressions and generate musically coherent ideas.",
            },
            {
              title: "Interactive Piano Roll",
              text: "Edit, refine and experiment with melodies in real time.",
            },
          ].map((feature, i) => (
            <MotionCard
              key={i}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              sx={{
                p: 4,
                borderRadius: "24px",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#1d1d1f",
                  mb: 1.5,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "#6e6e73",
                }}
              >
                {feature.text}
              </Typography>
            </MotionCard>
          ))}
        </Box>

        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          sx={{
            textAlign: "center",
            mb: 10,
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#1d1d1f",
              mb: 5,
            }}
          >
            How it works
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {[
              "Enter your chord progression",
              "Generate an AI melody",
              "Refine and export",
            ].map((step, i) => (
              <MotionBox key={i} whileHover={{ y: -6 }}>
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
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          sx={{
            height: 420,
            borderRadius: "32px",
            background: "linear-gradient(135deg,#ffffff,#f2f2f5)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6e6e73",
            fontSize: "1.1rem",
          }}
        >
          Piano Roll Demo
        </MotionBox>
      </Container>
    </Box>
  );
}

export default MainPage;
