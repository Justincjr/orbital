import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'

export default function Result() {

    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result)
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)

    useEffect(()=> {
        console.log(result)
    })
    function onRestart(){
        console.log('restart')
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    usePublishResult({ 
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achieved : flag ? "Passed" : "Failed" });
    const username = localStorage.getItem("username");
    return (
        <div className='container'>
            <h1 className='title text-light'>General Knowledge Quiz</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{username}</span>
                </div>
            </div>
            <div className='flex'>
                <span>Total Score : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Questions Attempted : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Current Score : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>

            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Home</Link>
            </div>

            <div className="container">
                <h2 className='highscores-title'>Highscores</h2>
                <ResultTable />
            </div>

        </div>
    )
}