import { Router } from 'express';
import { firebaseAuthMiddleware } from '../middleware/firebaseAuth.Middleware.js'
import { getUserById, createUser } from '../services/user.services.js'

const router = Router();

router.get('/me', firebaseAuthMiddleware, async (req, res) => {
    try {
        const id = req.user.uid;
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/me', firebaseAuthMiddleware, async (req, res) => {
    try {
        const user = req.user;

        const createdUser = await createUser(user);

        if (!createdUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(createdUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;