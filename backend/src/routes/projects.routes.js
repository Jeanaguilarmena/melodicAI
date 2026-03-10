import { Router } from 'express';
import { firebaseAuthMiddleware } from '../middleware/firebaseAuth.Middleware.js'
import { saveUserProject, getRecentUserProjects, getUserProjects } from '../services/projects.services.js';

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

router.get("/recent", firebaseAuthMiddleware, async (req, res) => {
    try {
        const id = req.user.uid;

        if (!id) {
            return res.status(400).json({ message: "User id missing" })
        }

        const result = await getRecentUserProjects(id);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching recent projects", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/all", firebaseAuthMiddleware, async (req, res) => {
    try {
        const id = req.user.uid;

        if (!id) {
            return res.status(400).json({ message: "User id missing" })
        }

        const result = await getUserProjects(id);
        res.status(200).json(result)

    } catch (error) {
        console.error("Error fetching user projects", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

export default router;