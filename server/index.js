import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connection from './database/db.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import passwordResetRoutes from './routes/passwordReset.js';
import router from './routes/route.js';
import gameRoutes from './routes/gameRoutes.js'; // Add this line

const app = express();
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use('/api/game', gameRoutes); // Add this line
app.use('/api', router); // Keep existing routes

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
