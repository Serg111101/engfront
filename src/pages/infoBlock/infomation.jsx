import React, { useEffect, useState } from 'react';
import './infoStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFetchLectures, getFetchSlides } from '../../store/action/LessonAction';
import { UndoOutlined } from '@ant-design/icons';
import { Loading } from "../../components/Loading/Loading";
import QuestionModal from './QuestionModal';
import useAuth from '../../hooks/AdminHooks/useAuth';

const Informatoin = () => {
  const {auth} = useAuth();
  const { Lectures, loading } = useSelector((state) => state.Lectures);
  const { Slide } = useSelector((state) => state.Slide);
  const [lectures, setLectures] = useState(Lectures);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [elem, setElem] = useState(false);
  const [infoState, setInfoState] = useState(0);
  const [title,setTitle] = useState(localStorage.getItem('lessons')||"");
  const [show,setShow] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('lessons')) {
      const loc = localStorage.getItem('lessons');
      setTitle(JSON?.parse(loc));
    }
    if(title?.length>0){
      dispatch(getFetchLectures(title));
      dispatch(getFetchSlides(title));
    }
  }, [dispatch,title]);

  

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
    console.log(auth,"aaaa");
    if (lectures[0]?.lectures?.length === id) {
      if(auth.role === "admin"){
        setShow(true)
      }else{
        navigate("/Quiz")

      }
    }else{
      setElem(id)
    }
  }


  const Background = Lectures[0]?.background;
  return (
    <>
      <div className="Lecturee"
       style={elem ? { display: "none" } : { backgroundImage: `url(${Background})` }}
       >
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
                      key={index+1}
                      onClick={() => {
                        text(index + 1);
                      }}
                      style={{ background: el.color }}
                    >
                      <p >{el.text}</p>
                    </div>
                  ))}
                  {show&& <QuestionModal show={show} setShow={setShow} auth={auth} />}
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
                  return index + 1 === elem && <div className='info' key={index+1} >
                    {el?.lectures && <h2>{el?.lectures}</h2>}
                    {el?.text1 && el?.text1?.length > 0 && <p key={index+32} className='text1' >{el?.text1}</p>}
                    {el?.image && el?.image?.length > 0 && <div key={index+22} className='imageDiv'> <img src={el?.image} alt={el?.text1} /> </div>}
                    {el?.text2 && el?.text2?.length > 0 && <p key={index+33} className='text2' >{el.text2}</p>}
                    {
                      el?.text_arr?.map((elem,index) => {
                        if (elem?.includes('http')) {
                          return <div key={index+1} className='imageDiv' ><img  src={elem} alt="nkar" /></div>
                        } else {
                          return <p key={index+15} >{elem}</p>
                        }
                      })
                    }
                    {
                      el?.text_arr_margin?.map((elem,index) => {
                        if (elem?.includes('http')) {
                          return <div className='imageDiv' key={index+55} > <img src={elem} alt='nkar' /> </div>
                        } else {
                          return <div key={index+55} className='marginText' >{elem}</div>
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