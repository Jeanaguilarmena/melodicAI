import { Box, Card, Typography } from "@mui/material";
import React from "react";

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
        <Typography>This is the profile page</Typography>
      </Card>
    </Box>
  );
}

export default ProfilePage;
