import React from 'react'
import { useState } from 'react'
import './quiz.scss'
import { useEffect } from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import { Loading } from '../../components/Loading/Loading'

import { getFetchQuiz } from '../../store/action/LessonAction'
import { useNavigate } from 'react-router-dom'
export const Quiz = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const { Quiz,loading } = useSelector((state) => state.Quiz);
    
    const [active,setActive] = useState(false)
        useEffect(()=>{
         
        if(localStorage.getItem('lessons')){
           const quz = localStorage.getItem('lessons')
           const Quizs = JSON.parse(quz);
           dispatch(getFetchQuiz(Quizs))
        }
  
    },[dispatch])
   
    let [question, setQuestion] = useState(0)
    let [count, setCount] = useState(0)
    const [finish, setFinish] = useState(false)
    let  [answer,setAnswer]= useState([])
    const [corectAnswers,setCorectAnswers]=useState()
    useEffect(()=>{
        if(Quiz[question]?.correctAnswer){
     let answers = [
        Quiz[question]?.correctAnswer,
            ...Quiz[question]?.incorrectAnswer
        ].map((a)=>({sort:Math.random(),value:a})).sort((a,b)=>a.sort-b.sort)
        .map((a)=>a.value)
        setAnswer(answers)
    }
    },[question,Quiz])
    
    function next() {
        if(question < Quiz.length-1){
            if (Quiz[question]?.correctAnswer === corectAnswers && count <= question) {
                setCount(++count)
            }
           
            setQuestion(++question)
            setActive(false)
        }else{
            if (Quiz[question]?.correctAnswer === corectAnswers && count <= question) {
                setCount(++count)
            }

            const sum = sessionStorage.getItem('count');
            let countStorag = JSON.parse(sum);
            const les = localStorage.getItem('level')
            const lesons = JSON.parse(les)
            
            if(count >= (Quiz?.length*80/100).toFixed(2) && lesons === countStorag){
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
    const Background = Quiz[0]?.background;

    return (
        <div className='answer' style={{ backgroundImage: `url(${Background})`}} >
            <div className='prevButton'>
    <button onClick={()=>navigate("/Leqtures")} >
      {Quiz[0]?.button[3]}
    </button>
    </div>
            {loading ? <Loading/>:
          finish ? <div className='answer_next'>
            <p>{Quiz[0]?.button[0]}{count}/{Quiz.length}</p>
            <button onClick={()=>{ navigate('/Lessons')}}> {Quiz[0]?.button[1]}  </button>
          </div> : <div className='quiz'>
                <div>
                    <h1>{Quiz[question]?.question}</h1>
                </div>
                <div className='item'>
                    {answer.length>0 && answer?.map((el,index) =>
                     <div key={index} className={(active === el)  ? 'itemdivs' : 'itemdiv'}  onClick={() => {correctAnswer(el)}}> 
                        <p >{el}</p>
                     </div>)}
                </div>
                <button className={active ? "btnActive":"btnDisable"} onClick={() => {next()}}><p>{Quiz[0]?.button[2]}</p></button>
            </div>}

        </div>
    )
}