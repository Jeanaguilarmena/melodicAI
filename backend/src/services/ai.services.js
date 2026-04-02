import OpenAI from 'openai';
import { db } from '../config/firebaseAdmin.js';
import admin from "firebase-admin";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateMelody = async (userNotes, aiContext, cutTime, initialSettings) => {

    const chordsArray = Object.values(initialSettings.chordProgression);

    const prompt = `
    You are an AI specialized in generating expressive MIDI melodies for modern pop music (2010s hit style).
    
    GOAL:
    Continue and complete the melody from beat ${cutTime} until the end of the track.
    
    GLOBAL CONTEXT:
    - Tempo: 128 BPM
    - Total length: 32 beats
    - Structure: 8 bars (each bar = 4 beats)
    - Each chord lasts exactly 4 beats
    - The melody must align with the chord progression
    
    CHORD PROGRESSION (8 bars, 4 beats each):
    ${JSON.stringify(chordsArray)}
    
    EXISTING MELODY:
    
    User notes (fixed, must NOT be modified):
    ${JSON.stringify(userNotes)}
    
    Previous AI notes (already accepted, must be continued):
    ${JSON.stringify(aiContext)}
    
    RULES:
    
    1. Time & Continuity
    - Generate notes starting ONLY from beat ${cutTime}
    - Do NOT modify or overlap previous notes
    - Do NOT generate notes before ${cutTime}
    - End at or before beat 32 (never exceed it)
    
    2. Rhythm (FL Studio style grid)
    - Notes must be aligned to a 1/16 grid (0.25 beat resolution)
    - Start times must be multiples of 0.25
    - Valid note lengths are: 0.25, 0.5, 1, 2, or 4 beats
    - PRIORITY: Most notes should have length 1 beat or 0.5 beats
    - Occasionally use 0.25 for quick transitions and 2 or 4 for sustained notes
    - Notes should feel quantized and rhythmically clean
    - Avoid chaotic or overly dense rhythms
    
    3. Harmony
    - Follow the chord progression strictly
    - Notes must belong to the active chord or resolve into it
    - Use chord tones on strong beats (1, 2, 3, 4 of each bar)
    - Use passing tones only between beats for expression
    
    4. Style (VERY IMPORTANT)
    - Emotional, melancholic, catchy melody
    - Inspired by popular 2010s pop hits and vocal toplines
    - Similar feel to artists like Alan Walker, Sia, Rihanna, Lady Gaga
    - The melody should feel like a lead vocal, not random MIDI notes
    - Use repetition with slight variation (hook-based structure)
    - Use call & response phrasing between bars
    - Avoid robotic or overly mechanical patterns
    
    5. Musical Structure
    - Build phrases across bars (not random notes)
    - Create a recognizable motif and reuse it with variation
    - First phrases can be simpler, later ones can evolve
    - Create tension and release across the progression
    
    6. Density & Space
    - Do NOT overfill with notes
    - Leave breathing space between phrases
    - Avoid constant note streams
    
    7. Ending
    - The final notes (near beat 32) must feel resolved and stable
    - Prefer notes from the final chord
    - The melody should feel complete, like the end of a vocal phrase
    
    OUTPUT FORMAT (STRICT):

    - Return ONLY valid JSON
    - Do NOT include explanations
    - Do NOT include extra fields
    - Each note MUST have exactly:
    - pitch (integer)
    - start (number)
    - length (number)

    Example:

    {
    "notes": [
        { "pitch": 30, "start": 16, "length": 2 },
        { "pitch": 32, "start": 18, "length": 1 }
    ]
    }
    `;

    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
        text: {
            format: {
                type: "json_object"
            }
        }
    });

    const text = response.output_text;

    const parsed = JSON.parse(text);

    return parsed.notes;
};