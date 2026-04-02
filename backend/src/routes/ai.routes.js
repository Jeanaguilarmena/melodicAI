import express, { Router } from "express";
import { firebaseAuthMiddleware } from '../middleware/firebaseAuth.Middleware.js'
import { generateMelody } from "../services/ai.services.js";

const router = Router();

router.post("/generate-melody", firebaseAuthMiddleware, async (req, res) => {
    try {
        const { userNotes, aiContext, cutTime, initialSettings } = req.body;
        const generatedNotes = await generateMelody(userNotes, aiContext, cutTime, initialSettings);

        res.json({ generatedNotes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI generation failed" });
    }
})

export default router;