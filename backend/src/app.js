import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import userProjects from './routes/projects.routes.js'
import aiRoutes from './routes/ai.routes.js'

const app = express();

app.use(cors());
app.use(express.json());
//Here im gonna put the routes 
//Everything that starts with /api/auth will be handled by authRoutes
app.use('/api/users', userRoutes);
//this is for projects
app.use('/api/projects', userProjects);
//This is for generate melody using ai service
app.use('/api/ai', aiRoutes)

export default app;