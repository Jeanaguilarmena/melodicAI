import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import PianoRoll from "../../components/pianoRoll/pianoRoll";

function ProducePage() {
  // This is hardcoded for now, but in a real app this would be loaded from a server or created by the user
  const [composition, setComposition] = useState({
    harmony: [
      {
        name: "Am",
        start: 0,
        bass: { pitch: 0, length: 16 },
        chord: [
          { pitch: 12, length: 16 },
          { pitch: 16, length: 16 },
          { pitch: 19, length: 16 },
        ],
      },
      {
        name: "F",
        start: 16,
        bass: { pitch: 2, length: 16 },
        chord: [
          { pitch: 14, length: 16 },
          { pitch: 17, length: 16 },
          { pitch: 21, length: 16 },
        ],
      },
      {
        name: "C",
        start: 32,
        bass: { pitch: 4, length: 16 },
        chord: [
          { pitch: 14, length: 16 },
          { pitch: 17, length: 16 },
          { pitch: 21, length: 16 },
        ],
      },
      {
        name: "G",
        start: 48,
        bass: { pitch: 5, length: 16 },
        chord: [
          { pitch: 17, length: 16 },
          { pitch: 21, length: 16 },
          { pitch: 24, length: 16 },
        ],
      },
      {
        name: "Am",
        start: 64,
        bass: { pitch: 0, length: 16 },
        chord: [
          { pitch: 12, length: 16 },
          { pitch: 16, length: 16 },
          { pitch: 19, length: 16 },
        ],
      },
      {
        name: "F",
        start: 80,
        bass: { pitch: 2, length: 16 },
        chord: [
          { pitch: 14, length: 16 },
          { pitch: 17, length: 16 },
          { pitch: 21, length: 16 },
        ],
      },
      {
        name: "C",
        start: 96,
        bass: { pitch: 4, length: 16 },
        chord: [
          { pitch: 14, length: 16 },
          { pitch: 17, length: 16 },
          { pitch: 21, length: 16 },
        ],
      },
      {
        name: "G",
        start: 112,
        bass: { pitch: 5, length: 16 },
        chord: [
          { pitch: 17, length: 16 },
          { pitch: 21, length: 16 },
          { pitch: 24, length: 16 },
        ],
      },
    ],

    melody: {
      ai: [
        { pitch: 24, start: 0, length: 4 },
        { pitch: 26, start: 4, length: 4 },
        { pitch: 28, start: 8, length: 4 },

        { pitch: 26, start: 16, length: 4 },
        { pitch: 28, start: 20, length: 4 },
        { pitch: 29, start: 24, length: 4 },

        { pitch: 26, start: 32, length: 4 },
        { pitch: 28, start: 36, length: 4 },
        { pitch: 29, start: 40, length: 4 },

        { pitch: 29, start: 48, length: 4 },
        { pitch: 31, start: 52, length: 4 },
        { pitch: 33, start: 56, length: 4 },

        { pitch: 31, start: 64, length: 4 },
        { pitch: 29, start: 68, length: 4 },
        { pitch: 28, start: 72, length: 4 },

        { pitch: 29, start: 80, length: 4 },
        { pitch: 28, start: 84, length: 4 },
        { pitch: 26, start: 88, length: 4 },

        { pitch: 28, start: 96, length: 4 },
        { pitch: 29, start: 100, length: 4 },
        { pitch: 31, start: 104, length: 4 },

        { pitch: 33, start: 112, length: 4 },
        { pitch: 31, start: 116, length: 4 },
        { pitch: 28, start: 120, length: 8 },
      ],
      user: [],
    },
  });

  const handleAiRequest = (payload) => {
    console.log("🔥 AI REQUEST RECEIVED →", payload);

    const { userNotes, aiContext, cutTime } = payload;

    const regenerated = [
      { pitch: 30, start: cutTime, length: 4 },
      { pitch: 31, start: cutTime + 4, length: 4 },
    ];

    setComposition((prev) => ({
      ...prev,
      melody: {
        ai: [...aiContext, ...regenerated],
        user: userNotes,
      },
    }));
  };

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
        <PianoRoll
          composition={composition}
          onCompositionChange={setComposition}
          onAiRequest={handleAiRequest}
        />
      </Card>
    </Box>
  );
}

export default ProducePage;
