import express from 'express';
import { getHighScore, saveScore } from '../controllers/gameController.js';

const router = express.Router();

// Route to get high score
router.get('/high-score', getHighScore);

// Route to save score
router.post('/save-score', saveScore);

export default router;
