/*eslint-disable*/
import React from "react";
import { useState } from "react";
import "./quiz.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading/Loading";

import { getFetchQuiz } from "../../store/action/LessonAction";
import { useNavigate } from "react-router-dom";
import { addQuizChild } from "../../store/action/QuizChildAction";
import useAuth from "../../hooks/AdminHooks/useAuth";
import { editChildren } from "../../store/action/ChildrenAction";
export const Quiz = () => {
  let loacal;
  if(localStorage?.getItem('language')){
    let languageLocal = localStorage?.getItem('language');
    loacal = JSON.parse(languageLocal)
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Quiz, loading } = useSelector((state) => state.Quiz);
  const [pupilQuestion, setPupilQuestion] = useState({
    attempts: 0,
    correct: [],
    incorrect: [],
  });
  const [answerVal,setAnswerVal] = useState("")
  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  const { auth } = useAuth();
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("lessons")) {
      const quz = localStorage.getItem("lessons");
      const Quizs = JSON.parse(quz);
      dispatch(getFetchQuiz(Quizs));
    }

  }, [dispatch]);
  let [question, setQuestion] = useState(0);
  let [count, setCount] = useState(0);
  const [finish, setFinish] = useState(false);
  let [answer, setAnswer] = useState([]);

  const [corectAnswers, setCorectAnswers] = useState();
  useEffect(() => {
    if (Quiz[question]?.correctAnswer) {
      let answers = [
        Quiz[question]?.correctAnswer,
        ...Quiz[question]?.incorrectAnswer,
      ]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      setAnswer(answers);
    }
    else{
      setAnswer([]);
    }
  }, [question, Quiz]);
  async function EditChild() {
    if (auth?.role === "children") {
      let obj = { ...auth, level: auth?.level + 1 };
      localStorage.setItem("auth", JSON.stringify(obj));
      delete obj.accessToken;
      delete obj.refreshToken;
      await dispatch(editChildren(obj,setSuccess));
    }
  }
  useEffect(() => {
    if (Quiz?.length &&
      pupilQuestion?.correct?.length + pupilQuestion?.incorrect?.length  ===
        Quiz?.length &&
      auth?.role === "children" && finish
    ) {;
      dispatch(
        addQuizChild({
          ...pupilQuestion,
          lesson: Quiz[0]?.lesson,
          teacher_id: auth?.teacher_id,
          children_id: auth?.id,
        })
      );
 
    }
  }, [pupilQuestion]);
  async function next() {
    if (question < Quiz?.length - 1) {
      if (
        Quiz[question]?.correctAnswer === corectAnswers &&
        count <= question
      ) {
        await setPupilQuestion({
          ...pupilQuestion,
          correct: [
            ...pupilQuestion?.correct,
            { question: `${question+1+"."}`+Quiz[question]?.question, answer: corectAnswers },
          ],
        });
        setCount(++count);
      } else {
        setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question: `${question+1+"."}`+Quiz[question]?.question, answer: corectAnswers },
          ],
        });
        
      }
      if(answerVal?.length>0){
        setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question:`${question+1+"."}`+ Quiz[question]?.question,not_checked:answerVal,unverified:false },
          ],
          
        });
        setAnswerVal("");
      }

      setQuestion(++question);
      setActive(false);
    } else {
      if (
        Quiz[question]?.correctAnswer === corectAnswers &&
        count <= question
      ) {
        await setPupilQuestion({
          ...pupilQuestion,
          correct: [
            ...pupilQuestion?.correct,
            { question:`${question+1+"."}`+ Quiz[question]?.question, answer: corectAnswers },
          ],
        });
        setCount(++count);
      } else {
        await setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question:`${question+1+"."}`+ Quiz[question]?.question, answer: corectAnswers },
          ],
        });
        if(answerVal?.length>0){
          setPupilQuestion({
            ...pupilQuestion,
            incorrect: [
              ...pupilQuestion?.incorrect,
              { question:`${question+1+"."}`+ Quiz[question]?.question,not_checked:answerVal,unverified:false },
            ],
            
          });
          setAnswerVal("");
        }
      }

      // const sum = sessionStorage.getItem("count");
      // let countStorag = JSON.parse(sum);
      const les = localStorage.getItem("level");
      const lesons = JSON.parse(les);

      if (
        count >= (((Quiz?.length-2) * 80) / 100).toFixed(2) &&
        lesons === auth?.level
      ) {
        // const sumo = sessionStorage.getItem("count");
        // let countStorage = JSON.parse(sumo);

        // sessionStorage.setItem("count", JSON.stringify(++countStorage));
        EditChild();
      }
      //   setPupilQuestion({
      //     ...pupilQuestion,
      //     attempts: pupilQuestion?.attempts + 1,
      //   });

      setFinish(true);
    }
  }
  function correctAnswer(el) {
    setCorectAnswers(el);
    setActive(el);
  }
  return (

    <div className="answer" style={{ backgroundImage: `url(./image/quiz.jpg)` }}>
      <div className="prevButton">
        <button onClick={() => {navigate("/Leqtures");localStorage.removeItem('elem')}}>
          {loacal==="AM" ? "Հետ":"Back"}
        </button>
      </div>
      {!wrongAnswer && (
        <div>
          {loading ? (
            <Loading />
          ) : finish ? (
            <div className="answer_next">
              <p>
              {loacal==="AM" ? "Դուք հավաքեցիք":"You collected"}
                {count}/{Quiz.length}
              </p>
              {pupilQuestion.incorrect.length > 0 && (
                <button
                  onClick={() => {
                    setWrongAnswer(true);
                  }}
                >
                  {LocalValue === "AM"
                    ? "Տեսնել սխալ պատասխանները"
                    : "See wrong answers"}
                </button>
              )}
              <button
                onClick={() => {
                  navigate("/Lessons");
                }}
              >
                
                {loacal==="AM" ? "Դասընթացներ":"Courses"}
              </button>
            </div>
          ) : Quiz.length > 0 ? (
            <div className="quiz">
              <div>
                <h1>{question+1+" . "}{Quiz[question]?.question}</h1>
              </div>
              <div className={answer?.length > 0?"item":""}>
                {
                answer?.length > 0 ?
                  answer?.map((el, index) => (
                    <div
                      key={index}
                      className={active === el ? "itemdivs" : "itemdiv"}
                      onClick={() => {
                        correctAnswer(el);
                      }}
                    >
                      <p>{el}</p>
                      
                    </div>
                  ))
                  :
                  <div className="form-container" >
                    <label htmlFor="writeText">{loacal==="AM" ? "Լրացրեք ճիշտ պատասխանը":"Complete the correct answer"}</label>
                    <textarea cols={8} rows={8}  className="answerInput" id="writeText" value={answerVal} 
                     onCopy={(e)=>{e.preventDefault();    
                      setAnswerVal(`${LocalValue === "AM"
                      ? "Հնարավոր չէ պատճենել"
                      : "Cannot copy"}`)
                    }}
                     onPaste={(e)=>{e.preventDefault();
                      setAnswerVal(`${LocalValue === "AM"
                     ? "Հնարավոր չէ տեղադրել"
                     : "Cannot paste"}`)}} 
                     onChange={(e)=>{setAnswerVal(e.target.value);}}/>
                    <button onClick={()=>  correctAnswer(answerVal)} >{loacal==="AM" ? "Հաստատել":"Confirm"}</button>
                  </div>
                  }
              </div>
              <button

                className={active ? "btnActive" : "btnDisable"}
                onClick={() => {
                  next();
                }}
              >
               <p> {loacal==="AM" ? "Առաջ":"Next"}</p>

              </button>
            </div>
          ):  <div className='infoParentSlide1'>{LocalValue==="AM"?"Այս թեմայի համար նյութ չկա":"There is no material for this topic"}</div>}
        </div>
      )}
      {wrongAnswer && (
        <div className="inanswer_next">
          {wrongAnswer && <table>
                <thead>
                  <tr>
                    <th>{LocalValue === "AM" ? "Հարց" : "question"}</th>
                    <th>
                      {LocalValue === "AM"
                        ? "Սխալ պատասխան"
                        : "incorrect answer"}
                    </th>
                   
                  </tr>
                </thead>

                <tbody>
                  {
            pupilQuestion?.incorrect?.map((el,index) => (
                  <tr key={index+1}>
                    <td>{el?.question}</td>
                    {el?.answer?<td>{el?.answer}</td>:<td><div>{el?.not_checked}</div><div style={{color:"red"}} >{LocalValue === "AM" ? "Չստուգված" : "Unverified"}</div></td>}
                    
                  </tr>
 
            ))}
             </tbody>
              </table>}
        </div>
      )}
    </div>
  );
};
