/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "./Lesson.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchLectures,
  getFetchLesson,
  getFetchQuiz,
} from "../../store/action/LessonAction";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import useAuth from "../../hooks/AdminHooks/useAuth";
import { getFetchChildren } from "../../store/action/ChildrenAction";

export function Lesson() {
  const { Children } = useSelector((state) => state?.Children);
  let LocalValue;
  // useEffect(()=>{

    if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }
  // },[localStorage.getItem("language")])
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(false);
  const dispatch = useDispatch();
  const { Lesson, loading } = useSelector((state) => state.Lesson);
  const Background = Lesson[0]?.background;
  const [count, setCount] = useState(1);
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.role === "admin") {
      setCount(41000);
    }
    if (auth && auth?.role === "children" ) {
      setCount(auth?.level);
    }
  }, [auth, Children]);
  useEffect(()=>{
    if(localStorage.getItem("auth")&& auth?.role === "children"){ 
      const authh = JSON?.parse(localStorage.getItem("auth"));
      setCount(authh?.level)
    }
  },[localStorage.getItem("auth"),Children])

  useEffect(() => {
    dispatch(getFetchLesson());
    if (auth?.teacher_id && auth?.classNumber && auth?.role === "children") {
      dispatch(
        getFetchChildren({ id: auth?.teacher_id, name: auth?.classNumber })
      );
    }
  }, [dispatch, auth]);
  async function Quizz(title, index) {
    await localStorage.setItem("lessons", JSON.stringify(title));
    await localStorage.setItem("level", JSON.stringify(index + 1));
    await setQuiz(!quiz);
    navigate(`/Leqtures/${LocalValue}`);
  }
  


  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="LessonContainer"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="Lesson">
            <div className="prevButton">
              <button onClick={() => navigate(`/home/${LocalValue}`)}>{Lesson[0]?.button}</button>
            </div>
            {!quiz && (
              <div className="product-grid">
  {Lesson &&
    Lesson.map((item, index) => {
      const isArmenian = LocalValue === "AM";
      const isNotEmpty = isArmenian ? item?.lesson !== "Դատարկ է" : item?.lesson !== "It's empty";

      if (!isNotEmpty) return null; // Skip rendering if lesson is empty

      return (
        <div
          key={index}
          className={count >= index + 1 ? "product-card" : "product-cardDisable"}
          onClick={() => Quizz(item?.unique_key, index)}
        >
          <img className="imageDiv" src={item?.icon} alt={item.lesson} />
          <div className="color" id="color" style={{ background: item?.color }}>
            <div className="ikonkaDiv">
              <img src={item?.ikonka} alt={item.lesson} />
            </div>
            <h3>{item?.lesson}</h3>
            <span>
              <PlusCircleOutlined />
            </span>
          </div>
        </div>
      );
    })}
</div>


  

            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Lesson;
