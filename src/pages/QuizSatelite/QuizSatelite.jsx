import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Quizzz.scss";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFetchQuizSatelite } from '../../store/action/QuizSateliteAction';
export const QuizSatelite = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { QuizSatelite,loading } = useSelector((state) => state.QuizSatelite);
    console.log(QuizSatelite);
    const Background = QuizSatelite[0]?.background;
    const [item,setItem]= useState(QuizSatelite);
    const [active,setActive] = useState(false);

    useEffect(()=>{
        dispatch(getFetchQuizSatelite());
    },[dispatch])

        useEffect(()=>{
            if(QuizSatelite.length<=0){
        if(localStorage.getItem('quizzsat')){
           const quz = localStorage.getItem('quizzsat')
           const Quizs = JSON.parse(quz);
            setItem(Quizs)
        }}
    },[QuizSatelite])
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

          
            setFinish(true)
        }

    }
    function correctAnswer(el) {
        setCorectAnswers(el);
        setActive(el)
    }

    return (
        <div className='answer' style={{ backgroundImage: `url(${Background})`}}>
            <div className='prevButton'>
    <button onClick={()=>navigate("/Satellites")} >
      {QuizSatelite[0]?.button[3]}
    </button>
    </div>
            {loading ? <p>Loading...</p>:
          finish ? <div className='answer_next' >
            <p>{QuizSatelite[0]?.button[0]}{count}/{item.length}</p>
            <button onClick={()=>{ navigate('/Satellites')}}> {QuizSatelite[0]?.button[1]}  </button>
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
                <button className={active ? "btnActive":"btnDisable"} onClick={() => {next()}}><p>{QuizSatelite[0]?.button[2]}</p></button>
            </div>}

        </div>
    )
}