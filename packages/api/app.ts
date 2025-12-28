// packages/api/app.ts
import express from 'express';
import cors from 'cors';
import classRoutes from './routes/classRoutes';
import heroRoutes from './routes/heroRoutes';
import playerRoutes from './routes/playerRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routes.
app.use('/classes', classRoutes);
app.use('/heroes', heroRoutes);
// Player routes functionality moved to heroRoutes
// app.use('/player', playerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});