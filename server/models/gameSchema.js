import mongoose from 'mongoose';
const { Schema } = mongoose;

const gameSchema = new Schema({
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    highScore: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
