import React, { useState } from 'react'
import Questions from './Questions'
import { useSelector, useDispatch } from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult'
import { Navigate } from 'react-router-dom'

export default function QuizQn() {
    
    const result = useSelector(state => state.result.result)
    const [check, setChecked] = useState(undefined)
    const { queue, trace } = useSelector(state => state.questions)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     console.log(result)
    // })
    function onNext(){
        console.log('next')
        if(trace < queue.length){
            dispatch(MoveNextQuestion())

            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
        setChecked(undefined)
    }

    function onPrev(){
        console.log('prev')
        if(trace > 0){ // ensure qn does not go below 0
            dispatch(MovePrevQuestion());
        }

    }
    function onChecked(check){
        console.log(check)
        setChecked(check)
    }

    if(result.length && result.length >= queue.length){
        return <Navigate to={'/quiz/result'} replace={true}></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>YadiYadi Quiz</h1>
    
            <Questions onChecked={onChecked} />
    
            <div className='grid'>
                { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    )
    
}