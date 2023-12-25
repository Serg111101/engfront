import React, { useEffect, useState } from 'react';
import './infoStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFetchLectures, getFetchSlides } from '../../store/action/LessonAction';
import { UndoOutlined } from '@ant-design/icons';
import { Loading } from "../../components/Loading/Loading";

const Informatoin = () => {
  const { Lectures, loading } = useSelector((state) => state.Lectures);
  const { Slide } = useSelector((state) => state.Slide);
  const [lectures, setLectures] = useState(Lectures);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [elem, setElem] = useState(false);
  const [infoState, setInfoState] = useState(0);
  useEffect(() => {
    let title;
    if (localStorage.getItem('lessons')) {
      const loc = localStorage.getItem('lessons');
      title = JSON.parse(loc);
    }
    dispatch(getFetchLectures(title));
    dispatch(getFetchSlides(title));
  }, [dispatch]);
  
  useEffect(()=>{
    if(Lectures?.length>0){
      setLectures(Lectures)
    }
  },[Lectures])



  let prev = () => {
    if (infoState !== 0) {
      setInfoState((prevState) => prevState - 1);

    }
    // setLectures(0)
  };

  let next = () => {
    if (Slide[elem - 1].slides.length !== infoState) {
      setInfoState((prevState) => prevState + 1);
    } else if (infoState === Slide[elem - 1].slides.length) {
      setInfoState(0);
    }
  };

  function text(id) {
    setElem(id);
    if (lectures[0]?.lectures?.length === id) {
      navigate("/Quiz")
    }
  }


  const Background = Lectures[0]?.background;
  return (
    <>
      <div className="Lecturee" style={elem ? { display: "none" } : { backgroundImage: `url(${Background})`, }}>
        {!elem && lectures?.length > 0 && <div className='prevButton'>
          <button onClick={() => navigate("/Lessons")} >
            {Slide[0]?.button[0]}
          </button>
        </div>}
        <div className={!elem ? 'lectureTitle' : ''}>
          {loading ? (
            <Loading/>
          ) : (
            <>

              {!elem && lectures?.length > 0 && (
                <>
                  {lectures[0]?.lectures?.map((el, index) => (
                    <div
                      className="itemLecture"
                      key={index}
                      onClick={() => {
                        text(index + 1);
                      }}
                      style={{ background: el.color }}
                    >
                      <p>{el.text}</p>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {elem && elem !== 8 && (
        <div className="infoParent" style={{ backgroundImage: `url(${Background}` }}>
          <div className='infoParentSlide'>
            {infoState!==0&&<div className="prev" onClick={() => prev()}>
              <p>  {Slide[0].button[0]} </p>
            </div>}
            {infoState === 0 && <div className="infoParentContainer">
              <h1>{Slide[0]?.lessons}</h1>
              {
                Slide?.map((el, index) => {
                  return index + 1 === elem && <div className='info'>
                    {el?.lectures && <h2>{el?.lectures}</h2>}
                    {el?.text1 && el?.text1?.length > 0 && <p key={index} className='text1' >{el?.text1}</p>}
                    {el?.image && el?.image?.length > 0 && <div key={index} className='imageDiv'> <img src={el?.image} alt={el?.text1} /> </div>}
                    {el?.text2 && el?.text2?.length > 0 && <p key={index} className='text2' >{el.text2}</p>}
                    {
                      el?.text_arr?.map((elem,index) => {
                        if (elem?.includes('http')) {
                          return <div className='imageDiv' ><img key={index} src={elem} alt="nkar" /></div>
                        } else {
                          return <p>{elem}</p>
                        }
                      })
                    }
                    {
                      el?.text_arr_margin?.map((elem,index) => {
                        if (elem?.includes('http')) {
                          return <div className='imageDiv' key={index} > <img src={elem} alt='nkar' /> </div>
                        } else {
                          return <div key={index} className='marginText' >{elem}</div>
                        }
                      })
                    }
                  </div>
                })
              }
            </div>}

            {infoState !== 0 && Slide[elem - 1]?.slides !== null && Slide[elem - 1]?.slides?.length > 0 && (
              <>
                <div className="slideImage">
                  <img src={Slide[elem - 1]?.slides[infoState - 1]} alt="slideImage" />
                </div>
              </>
            )}
            {infoState !== Slide[elem - 1]?.slides?.length && Slide[elem - 1]?.slides !== null&&<div className="next" onClick={() => next()}>
              <p>  {Slide[0]?.button[1]} </p>
            </div>}
          </div>
          {/* <div className="info_next"> */}
            {/* {Slide[elem - 1].slides !== null && Slide[elem - 1]?.slides.length > 0 && (
              <div className="nextPrevButtons">


              </div>
            )} */}
            {<div className="prevvButton">
              <button onClick={() => { setElem(false); setInfoState(0) }}>
                {Slide[0]?.button[2]} <span> <UndoOutlined /> </span>
              </button>
            </div>}
          {/* </div> */}
        </div>
      )}

    </>
  );
};

export default Informatoin;