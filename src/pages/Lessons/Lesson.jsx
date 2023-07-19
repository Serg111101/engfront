import React, { useEffect, useState } from 'react';
import "./Lesson.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getFetchLectures, getFetchLesson, getFetchQuiz } from '../../store/action/LessonAction';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function Lesson() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(false);
  const dispatch = useDispatch();
  const { Lesson } = useSelector((state) => state.Lesson);
  const Background = Lesson[0]?.background;

  const count = parseInt(sessionStorage.getItem('count') || '1');

  useEffect(() => {
    if (!sessionStorage.getItem('count')) {
      sessionStorage.setItem('count', '1');
    }
  }, []);

  useEffect(() => {
    dispatch(getFetchLesson());
  }, [dispatch]);

  async function Quizz(title) {
    localStorage.setItem("lessons", JSON.stringify(title));
    dispatch(getFetchQuiz(title));
    dispatch(getFetchLectures(title));
    setQuiz(!quiz);
    navigate('/Leqtures');
  }
  return (
    <div className='LessonContainer' style={{ backgroundImage: `url(${Background})` }}>
      <div className="Lesson">
        <div className='prevButton'>
    <button onClick={()=>navigate("/")} >
      {Lesson[0]?.button}
    </button>

        </div>
        {!quiz && (
          <div className="product-grid">
            {Lesson && Lesson.map((item, index) => {
             return (
              <div key={index} className={count >= index + 1 ? "product-card" : "product-cardDisable"} onClick={() => Quizz(item?.title)}>
                <img className='imageDiv' src={item?.icon} alt={item.title} />
                <div className="color" id='color' style={{ background: item?.color }}>
                  <div className='ikonkaDiv'>
                    <img src={item?.ikonka} alt={item.title} />
                  </div>
                  <h3>{item?.title}</h3>
                  <span>
                    <PlusCircleOutlined />
                  </span>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lesson;
