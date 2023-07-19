import React from 'react'
import { useState } from 'react'
import {  useSelector } from 'react-redux'
import './quiz.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const Quiz = () => {
    const navigate = useNavigate();
    const { Quiz,loading } = useSelector((state) => state.Quiz);
    const [item,setItem]= useState(Quiz)
    const [active,setActive] = useState(false)
        useEffect(()=>{
            if(Quiz.length<=0){
        if(localStorage.getItem('quizz')){
           const quz = localStorage.getItem('quizz')
           const Quizs = JSON.parse(quz);
            setItem(Quizs)
        }}

    
    },[Quiz])

  
    let [question, setQuestion] = useState(0)
    let [count, setCount] = useState(0)
    const [finish, setFinish] = useState(false)
    let  [answer,setAnswer]= useState([])
    const [corectAnswers,setCorectAnswers]=useState()
    useEffect(()=>{
        if(item[question]?.correctAnswer){
     let answers = [
        item[question]?.correctAnswer,
            ...item[question]?.incorrectAnswer
        ].map((a)=>({sort:Math.random(),value:a})).sort((a,b)=>a.sort-b.sort)
        .map((a)=>a.value)
        setAnswer(answers)
    }
    },[question,item])
    function next() {
        if(question < item.length-1){
            if (item[question]?.correctAnswer === corectAnswers && count <= question) {
                setCount(++count)
            }
           
            setQuestion(++question)
            setActive(false)
        }else{
            if (item[question]?.correctAnswer === corectAnswers && count <= question) {
                setCount(++count)
            }

            const sum = sessionStorage.getItem('count');
            let countStorag = JSON.parse(sum);
            const les = localStorage.getItem('lessons')
            const lesons = JSON.parse(les)
            let fff = lesons.slice(0,5)
            if(count >= 7 && fff === "Դաս "+ countStorag){
                const sumo = sessionStorage.getItem('count');
                let countStorage = JSON.parse(sumo);
                
                sessionStorage.setItem('count',JSON.stringify(++countStorage));
                
            }
            setFinish(true)
        }

    }
    function correctAnswer(el) {
        setCorectAnswers(el);
        setActive(el)
    }
    const Background = item[0]?.background;
    console.log(Quiz);

    return (
        <div className='answer' style={{ backgroundImage: `url(${Background})`}} >
            <div className='prevButton'>
    <button onClick={()=>navigate("/Leqtures")} >
      {item[0]?.button[3]}
    </button>
    </div>
            {loading ? <p>Loading...</p>:
          finish ? <div className='answer_next'>
            <p>{item[0]?.button[0]}{count}/{item.length}</p>
            <button onClick={()=>{ navigate('/Lessons')}}> {item[0]?.button[1]}  </button>
          </div> : <div className='quiz'>
                <div>
                    <h1>{item[question]?.question}</h1>
                </div>
                <div className='item'>
                    {answer.length>0 && answer?.map((el,index) =>
                     <div key={index} className={(active === el)  ? 'itemdivs' : 'itemdiv'}  onClick={() => {correctAnswer(el)}}> 
                        <p >{el}</p>
                     </div>)}
                </div>
                <button className={active ? "btnActive":"btnDisable"} onClick={() => {next()}}><p>{item[0]?.button[2]}</p></button>
            </div>}

        </div>
    )
}