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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Quiz, loading } = useSelector((state) => state.Quiz);
  const [pupilQuestion, setPupilQuestion] = useState(
 
    {
    attempts: 0,
    correct: [],
    incorrect: [],
  });
  const {auth} = useAuth()
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [active, setActive] = useState(false);
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
  }, [question, Quiz]);
  async function EditChild() {
     let obj = {...auth,level:auth?.level+1}
     localStorage.setItem('auth',JSON.stringify(obj))
    delete obj.accessToken
    delete obj.refreshToken
    await dispatch(editChildren(obj))
 
 }
  useEffect(() => {
    if (
      pupilQuestion?.correct?.length + pupilQuestion?.incorrect?.length ==
      Quiz?.length
    ) {
      localStorage.setItem(
        "attempts",
        JSON.stringify({
          ...pupilQuestion,
          lesson: Quiz[0]?.lesson,
        })
      );

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
    if (question < Quiz.length - 1) {
      if (
        Quiz[question]?.correctAnswer === corectAnswers &&
        count <= question
      ) {
        await setPupilQuestion({
          ...pupilQuestion,
          correct: [
            ...pupilQuestion?.correct,
            { question: Quiz[question]?.question, answer: corectAnswers },
          ],
        });
        setCount(++count);
      } else {
        setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question: Quiz[question]?.question, answer: corectAnswers },
          ],
        });
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
            { question: Quiz[question]?.question, answer: corectAnswers },
          ],
        });
        setCount(++count);
      } else {

        await setPupilQuestion({
          ...pupilQuestion,
          incorrect: [
            ...pupilQuestion?.incorrect,
            { question: Quiz[question]?.question, answer: corectAnswers },
          ],
        });
      }

      const sum = sessionStorage.getItem("count");
      let countStorag = JSON.parse(sum);
      const les = localStorage.getItem("level");
      const lesons = JSON.parse(les);

      if (
        count >= ((Quiz?.length * 80) / 100).toFixed(2) &&
        lesons === auth?.level
      ) {
        const sumo = sessionStorage.getItem("count");
        let countStorage = JSON.parse(sumo);
           
        sessionStorage.setItem("count", JSON.stringify(++countStorage));
        EditChild()
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
  const Background = Quiz[0]?.background;

  return (
    <div className="answer" style={{ backgroundImage: "red" }}>
      <div className="prevButton">
        <button onClick={() => navigate("/Leqtures")}>
          {Quiz[0]?.button[3]}
        </button>
      </div>
      {!wrongAnswer && (
        <div>
          {loading ? (
            <Loading />
          ) : finish ? (
            <div className="answer_next">
              <p>
                {Quiz[0]?.button[0]}
                {count}/{Quiz.length}
              </p>
              {pupilQuestion.incorrect.length > 0 && (
                <button
                  onClick={() => {
                    setWrongAnswer(true);
                  }}
                >
                  Տեսնել սխալ պատասխանները
                </button>
              )}
              <button
                onClick={() => {
                  navigate("/Lessons");
                }}
              >
                {" "}
                {Quiz[0]?.button[1]}{" "}
              </button>
            </div>
          ) : (
            <div className="quiz">
              <div>
                <h1>{Quiz[question]?.question}</h1>
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
                <p>{Quiz[0]?.button[2]}</p>
              </button>
            </div>
          )}
        </div>
      )}
      {wrongAnswer && (
        <div className="inanswer_next">
          {wrongAnswer &&
            pupilQuestion.incorrect.map((el) => (
              <div>
                <h1>{el.question}</h1>
                <p>{el.answer}</p>
              </div>
            ))}
          
        </div>
      )}
    </div>
  );
};
