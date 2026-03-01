// import { Box, Card, Typography } from "@mui/material";
// import React from "react";
// import PianoRoll from "../../components/pianoRoll/pianoRoll";

// function ProducePage() {
//   return (
//     <Box>
//       <Card
//         sx={{
//           margin: "20px",
//           marginTop: "80px",
//           padding: "20px",
//           backgroundColor: "#f5f5f5",
//           borderRadius: 4,
//         }}
//       >
//         <PianoRoll initialNotes={initialProgression} />
//       </Card>
//     </Box>
//   );
// }

// export default ProducePage;

import { Box, Card } from "@mui/material";
import React from "react";
import PianoRoll from "../../components/pianoRoll/pianoRoll";

function ProducePage() {
  const composition = {
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
      ],
      user: [],
    },
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
        <PianoRoll composition={composition} />
      </Card>
    </Box>
  );
}

export default ProducePage;
