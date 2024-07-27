import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './game.css';

function Game() {
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [lives, setLives] = useState(3);
	const [bottles, setBottles] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const navigate = useNavigate();
	const gameIntervalRef = useRef(null);
	const username = localStorage.getItem('username');
	const token = localStorage.getItem('token');

	const fetchHighScore = useCallback(async () => {
		try {
			const response = await axios.get(`http://${process.env.REACT_APP_URL}:8080/api/game/high-score`, {
				params: { username },
				headers: { 'Authorization': `Bearer ${token}` }
			});
			setHighScore(response.data);
		} catch (error) {
			console.error('Failed to fetch high score:', error);
		}
	}, [username, token]);

	const startGame = useCallback(() => {
		gameIntervalRef.current = setInterval(() => {
			if (lives <= 0) {
				clearInterval(gameIntervalRef.current);
				checkAndSaveScore(score);
				setGameOver(true);
				return;
			}
			addNewBottle();
		}, 1000);
	}, [lives, score]);

	useEffect(() => {
		if (!username || !token) {
			navigate('/login');
		} else {
			fetchHighScore();
			startGame();
		}
		return () => {
			clearInterval(gameIntervalRef.current);
		};
	}, [fetchHighScore, navigate, startGame, username, token]);

	const addNewBottle = () => {
		const { question, answer } = generateMathQuestion();
		const duration = Math.random() * (8 - 3) + 3;
		const bottle = {
			id: Date.now(),
			question,
			answer,
			xPosition: Math.floor(Math.random() * (window.innerWidth - 100)),
			duration,
			userAnswer: ''
		};
		setBottles(prevBottles => [...prevBottles, bottle]);

		setTimeout(() => {
			handleUnsolvedBottle(bottle.id);
		}, duration * 1000);
	};

	const handleUnsolvedBottle = (bottleId) => {
		setBottles(prevBottles => {
			const bottle = prevBottles.find(b => b.id === bottleId);
			if (bottle && bottle.userAnswer.trim() !== bottle.answer) {
				setLives(lives => lives - 1);
				return prevBottles.filter(b => b.id !== bottleId);
			}
			return prevBottles;
		});
	};

	const generateMathQuestion = () => {
		const num1 = Math.floor(Math.random() * 10) + 1;
		const num2 = Math.floor(Math.random() * 10) + 1;
		const operations = ['+', '-', '*', '/'];
		const operation = operations[Math.floor(Math.random() * operations.length)];
		let question, answer;

		switch (operation) {
			case '+':
				question = `${num1} + ${num2}`;
				answer = num1 + num2;
				break;
			case '-':
				question = `${num1} - ${num2}`;
				answer = num1 - num2;
				break;
			case '*':
				question = `${num1} * ${num2}`;
				answer = num1 * num2;
				break;
			case '/':
				const divisor = Math.floor(Math.random() * 10) + 1;
				const dividend = divisor * (Math.floor(Math.random() * 10) + 1);
				question = `${dividend} / ${divisor}`;
				answer = dividend / divisor;
				break;
			default:
				break;
		}
		return { question, answer: answer.toString() };
	};

	const handleBottleClick = (id) => {
		document.getElementById(`input-${id}`).focus();
	};

	const handleInputChange = (e, id) => {
		const newBottles = bottles.map(bottle => {
			if (bottle.id === id) {
				bottle.userAnswer = e.target.value;
			}
			return bottle;
		});
		setBottles(newBottles);
	};

	const handleInputKeyPress = (e, bottle) => {
		if (e.key === 'Enter') {
			if (bottle.userAnswer.trim() === bottle.answer) {
				setScore(score + 10);
				setBottles(bottles.filter(b => b.id !== bottle.id));
			}
		}
	};

	const checkAndSaveScore = useCallback(async (currentScore) => {
		try {
			await axios.post(`http://${process.env.REACT_APP_URL}:8080/api/game/save-score`, { username, score: currentScore }, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			if (currentScore > highScore) {
				setHighScore(currentScore);
			}
		} catch (error) {
			console.error('Failed to save score:', error);
		}
	}, [username, highScore, token]);

	useEffect(() => {
		if (lives <= 0) {
			clearInterval(gameIntervalRef.current);
			checkAndSaveScore(score);
			setGameOver(true);
		}
	}, [lives, score, checkAndSaveScore]);

	if (gameOver) {
		return (
			<div className="game-over">
				<h2>Game Over! Your score is {score}</h2>
				<h2>High Score: {highScore}</h2>
				<button onClick={() => navigate('/')}>Return to Home</button>
			</div>
		);
	}

	return (
		<div className="game-container">
			<h2>Score: {score}</h2>
			<h2>High Score: {highScore}</h2>
			<h2>Lives: {lives}</h2>
			<div className="game-area">
				{bottles.map(bottle => (
					<div
						key={bottle.id}
						className="bottle"
						style={{ left: bottle.xPosition, animationDuration: `${bottle.duration}s` }}
						onClick={() => handleBottleClick(bottle.id)}
					>
						<div className="question">{bottle.question}</div>
						<input
							id={`input-${bottle.id}`}
							type="text"
							value={bottle.userAnswer}
							onChange={(e) => handleInputChange(e, bottle.id)}
							onKeyPress={(e) => handleInputKeyPress(e, bottle)}
							className="bottle-input"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Game;
