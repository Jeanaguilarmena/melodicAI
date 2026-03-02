import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
//Here im gonna put the routes 
//Everything that starts with /api/auth will be handled by authRoutes
app.use('api/auth', authRoutes);

export default app;