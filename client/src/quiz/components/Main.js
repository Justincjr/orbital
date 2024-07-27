import { useRef } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/Main.css'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'

export default function QuizMain() {
    const dispatch = useDispatch()
    function startQuiz(){
        const username = localStorage.getItem("username");
        if (username) {
            dispatch(setUserId(username));
        }
    }

    return (
        <div className='container'>
        <h1 className='title text-light'>General Knowledge Quiz</h1>

        <ol>
            <li>Quiz consists of 10 questions.</li>
            <li>10 points awarded for each correct answer.</li>
            <li>Each question contains three options.</li>
            <li>The result will be shown at the end of the quiz and you may compare highscores.</li>
        </ol>

        <div className='start'>
            <Link className='btn' to={'qn'} onClick={startQuiz}>Start Quiz</Link>
        </div>

    </div>
    )
}