import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
//Here im gonna put the routes 
//Everything that starts with /api/auth will be handled by authRoutes
app.use('/api/users', userRoutes);

export default app;