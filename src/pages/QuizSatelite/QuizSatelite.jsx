import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Quizzz.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFetchQuizSatelite } from "../../store/action/QuizSateliteAction";
import { Loading } from "../../components/Loading/Loading";
import useAuth from "../../hooks/AdminHooks/useAuth";
import { addQuizChild } from "../../store/action/QuizChildAction";

export const QuizSatelite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { QuizSatelite, loading } = useSelector((state) => state.QuizSatelite);
  const Background = QuizSatelite[0]?.background;
  const [item, setItem] = useState(QuizSatelite);
  const [active, setActive] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [pupilQuestion, setPupilQuestion] = useState({
    attempts: 0,
    correct: [],
    incorrect: [],
  });
  useEffect(() => {
    dispatch(getFetchQuizSatelite());
    
  }, [dispatch]);
 const {auth } = useAuth()
  useEffect(()=>{
    if(QuizSatelite?.length>0){
        setItem(QuizSatelite);
    }
 },[QuizSatelite])
 let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  let [question, setQuestion] = useState(0);
  let [count, setCount] = useState(0);
  const [finish, setFinish] = useState(false);
  let [answer, setAnswer] = useState([]);
  const [corectAnswers, setCorectAnswers] = useState();
  useEffect(() => {
    if (item[question]?.correctAnswer) {
      let answers = [
        item[question]?.correctAnswer,
        ...item[question]?.incorrectAnswer,
      ]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      setAnswer(answers);
    }
  }, [question, item]);
  useEffect(() => {
    if (
      pupilQuestion?.correct?.length + pupilQuestion?.incorrect?.length ==
      QuizSatelite?.length &&
      auth?.role === "children"
    ) {
      dispatch(
        addQuizChild({
          ...pupilQuestion,
          lesson: QuizSatelite[0]?.lesson,
          teacher_id: auth?.teacher_id,
          children_id: auth?.id,
        })
      );
    }
  }, [pupilQuestion]);
  async function next() {
    if (question < QuizSatelite.length - 1) {
      if (
        QuizSatelite[question]?.correctAnswer === corectAnswers &&
        count <= question
      ) {
        await setPupilQuestion({
          ...pupilQuestion,
          correct: [
            ...pupilQuestion?.correct,
            { question: `${question+1+"."}`+ QuizSatelite[question]?.question, answer: corectAnswers },
          ],
        });
        setCount(++count);
      } else {
        setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question:`${question+1+"."}`+ QuizSatelite[question]?.question, answer: corectAnswers },
          ],
        });
      }

      setQuestion(++question);
      setActive(false);
    } else {
      if (
        QuizSatelite[question]?.correctAnswer === corectAnswers &&
        count <= question
      ) {
        await setPupilQuestion({
          ...pupilQuestion,
          correct: [
            ...pupilQuestion?.correct,
            { question:`${question+1+"."}`+ QuizSatelite[question]?.question, answer: corectAnswers },
          ],
        });
        setCount(++count);
      } else {
        await setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question:`${question+1+"."}`+ QuizSatelite[question]?.question, answer: corectAnswers },
          ],
        });
      }

      // const sum = sessionStorage.getItem("count");
      // let countStorag = JSON.parse(sum);
      // const les = localStorage.getItem("level");
      // const lesons = JSON.parse(les);

      // if (
      //   count >= ((Quiz?.length * 80) / 100).toFixed(2) &&
      //   lesons === auth?.level
      // ) {
      //   // const sumo = sessionStorage.getItem("count");
      //   // let countStorage = JSON.parse(sumo);

      //   // sessionStorage.setItem("count", JSON.stringify(++countStorage));
      //   EditChild();
      // }
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
    <>
      <div className="answer" style={{ backgroundImage: `url(./image/quiz.jpg)` }}>
        <div className="prevButton">
          <button onClick={() => navigate("/Satellites")}>
            {QuizSatelite[0]?.button[3]}
          </button>
        </div>
        {!wrongAnswer && (
        <div>
        {loading ? (
          <Loading />
        ) : finish ? (
          <div className="answer_next">
            <p>
              {QuizSatelite[0]?.button[0]}
              {count}/{item.length}
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
                navigate("/Satellites");
              }}
            >
              
              {QuizSatelite[0]?.button[1]}
            </button>
          </div>
        ) : (
          <div className="quiz">
            <div>
              <h1>{question+1+" . "}{item[question]?.question}</h1>
            </div>
            <div className="item">
              {answer.length > 0 &&
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
                ))}
            </div>
            <button
              className={active ? "btnActive" : "btnDisable"}
              onClick={() => {
                next();
              }}
            >
              <p>{QuizSatelite[0]?.button[2]}</p>
            </button>
          </div>
        )}</div>)}
         {wrongAnswer && (
        <div className="inanswer_next">
          {wrongAnswer && <table>
                <thead>
                  <tr>
                    <th>{LocalValue === "AM" ? "Հարց" : "Question"}</th>
                    <th>
                      {LocalValue === "AM"
                        ? "Սխալ պատասխան"
                        : "Incorrect answer"}
                    </th>
                   
                  </tr>
                </thead>

                <tbody>
                  {
            pupilQuestion?.incorrect.map((el) => (
              
                  <tr>
                    <td>{el.question}</td>
                    <td>{el.answer}</td>
                  </tr>
 
            ))}
             </tbody>
              </table>}
        </div>
      )}
      </div>
    </>
  );
};
