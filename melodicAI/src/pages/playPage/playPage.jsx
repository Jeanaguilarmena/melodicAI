import React from "react";
import { Box, Card, Typography } from "@mui/material";

function PlayPage() {
  return (
    <Box>
      <Card
        sx={{
          margin: "20px",
          marginTop: "80px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: 4,
        }}
      >
        <Typography>This is the play page</Typography>
      </Card>
    </Box>
  );
}

export default PlayPage;
