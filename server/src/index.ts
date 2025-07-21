import express from 'express';
import dbClient from './config/db';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute';
import claimRoutes from './routes/claimRoute';
import http from 'http';
import { initSocket } from './socket';
import cors from 'cors';

dotenv.config()
const app = express()

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = initSocket(server);


dbClient();


app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});