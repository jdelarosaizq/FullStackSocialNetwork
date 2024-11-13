import express from 'express';
import socialRoutes from './routes/socialRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', socialRoutes);

export default app