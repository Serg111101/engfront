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

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(false);
  const dispatch = useDispatch();
  const { Lesson, loading } = useSelector((state) => state.Lesson);
  const Background = Lesson[0]?.background;
  const [count, setCount] = useState(1);
  const { auth } = useAuth();
  useEffect(() => {
  console.log('====================================');
  console.log(auth);
  console.log('====================================');
    
    if (auth?.role === "admin") {
      setCount(41000);
    }
    if (auth && auth?.role === "children" ) {
      // const fill = Children?.filter((el) => el?.id === auth?.id);
      // console.log('====================================');
      // console.log(fill[0]?.level);
      // console.log('====================================');
      setCount(auth?.level);
    }
  }, [auth, Children]);

  useEffect(() => {
    dispatch(getFetchLesson());
    if (auth?.teacher_id && auth?.classNumber && auth?.role === "children") {
      dispatch(
        getFetchChildren({ id: auth?.teacher_id, name: auth?.classNumber })
      );
    }
  }, [dispatch, auth]);
  async function Quizz(title, index) {
    localStorage.setItem("lessons", JSON.stringify(title));
    localStorage.setItem("level", JSON.stringify(index + 1));

    setQuiz(!quiz);
    navigate("/Leqtures");
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
              <button onClick={() => navigate("/")}>{Lesson[0]?.button}</button>
            </div>
            {!quiz && (
              <div className="product-grid">
                {Lesson &&
                  Lesson.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          count >= index + 1
                            ? "product-card"
                            : "product-cardDisable"
                        }
                        onClick={() => Quizz(item?.lesson, index)}
                      >
                        <img
                          className="imageDiv"
                          src={item?.icon}
                          alt={item.lesson}
                        />
                        <div
                          className="color"
                          id="color"
                          style={{ background: item?.color }}
                        >
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
