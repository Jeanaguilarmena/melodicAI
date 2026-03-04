import { Router } from 'express';
import { firebaseAuthMiddleware } from '../middleware/firebaseAuth.Middleware.js'
import { saveUserProject } from '../services/projects.services.js';

const router = Router();

router.post("/", firebaseAuthMiddleware, async (req, res) => {
    try {
        const id = req.user.uid;
        const project = req.body;

        const result = await saveUserProject(id, project);

        res.status(201).json(result);

    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;