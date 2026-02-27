import { Box, Card, Typography } from "@mui/material";
import React from "react";
import Profile from "../../components/profile/profile";

function ProfilePage() {
  return (
    <Box>
      <Card
        sx={{
          margin: "20px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: 4,
        }}
      >
        <Profile />
      </Card>
    </Box>
  );
}

export default ProfilePage;
