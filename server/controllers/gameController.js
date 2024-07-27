import Game from '../models/gameSchema.js';

export const getHighScore = async (req, res) => {
    const { username } = req.query;
    try {
        const user = await Game.findOne({ username });
        if (user) {
            res.json(user.highScore);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const saveScore = async (req, res) => {
    const { username, score } = req.body;
    try {
        const user = await Game.findOne({ username });
        if (user) {
            user.highScore = Math.max(user.highScore, score);
            await user.save();
            res.json({ message: 'Score saved successfully' });
        } else {
            const newUser = new Game({ username, highScore: score });
            await newUser.save();
            res.json({ message: 'Score saved successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
