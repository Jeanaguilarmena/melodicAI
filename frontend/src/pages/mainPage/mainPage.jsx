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
import demoVideo from "../../assets/demoVideo.mov";

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
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          sx={{
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "16 / 9",
            margin: "0 auto",
            borderRadius: "32px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 40px 100px rgba(0,0,0,0.18)",
            backgroundColor: "#000",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "32px",
              pointerEvents: "none",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.25))",
            },
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={demoVideo} type="video/mp4" />
          </video>

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              p: 4,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.0) 60%)",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Audio Processing
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.95rem",
                  mt: 0.5,
                }}
              >
                Separate vocals and instruments seamlessly
              </Typography>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default MainPage;
