/*eslint-disable */
import React, { useEffect, useState } from 'react'
import  { LeftOutlined,  CloseOutlined } from "@ant-design/icons"
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addFetchQuiz } from '../../store/action/QuizChildAction';
import Swal from "sweetalert2"
const QuestionModal = ({show,setShow,auth}) => {
    let title;
    if (localStorage.getItem('lessons')) {
        const loc = localStorage.getItem('lessons');
        title = JSON.parse(loc)
    }
    const [showAdd,setShowAdd] = useState(false);
    const [quesVal,setQuesVal] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoadnig] = useState(false);
 
    const navigate = useNavigate();
    const dispatch = useDispatch();

  let LocalValue;
  if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
  }
  const nav1=()=>{
    navigate("/Quiz")
  }

  const nav2=()=>{
    setShowAdd(true)
  }
  const addQuestion = (e) => {
    e.preventDefault();
    let obj = {
        lesson: title,
        question: quesVal,
        correctAnswer: "",
        incorrectAnswer:["","",""],
    }
    if(quesVal?.length.trim()>5){
        dispatch(addFetchQuiz(obj,setError,setLoadnig))
        
    }
  }
  useEffect(() => {

    if (error === 'ok') {

      Swal.fire({
        position: "center",
        icon: "success",
        title: LocalValue === 'AM' ? "Տվյալները հաջողությամբ հաստատվել են" : 'Data has been successfully verified' ,
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        setShowAdd(false)
        setError("");
        setLoadnig(false)
        setQuesVal("")
      });
    }
    if (error?.response?.status < 200 || error?.response?.status >= 400) {

      Swal.fire({
        position: "center",
        icon: "error",
        // title: "Լրացրեք բոլոր դաշտերը!!!",
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        setError("");
        setLoadnig(false)
        setQuesVal("")
      });
    }
  }, [error, loading])
  
    return (
        <div className={`CartTransferTwo2 ${show ? 'modalOpen' : 'modalClosed'}`}  >
          <div className={`modal ${show ? 'modalOpen' : 'modalClosed'}`} >
            <div className="container">
              <div className="conta">
                <div className="topBlock">
                  <div className="btnBack"  >
                    <LeftOutlined onClick={()=>setShow(false)} />
                  </div>
                  <div className="close" >
                  <CloseOutlined onClick={()=>setShow(false)} />
                  </div>
                </div>
                <div className="mainMod">
                  {!showAdd?<div>
                    <div className="link">
                      
                      <p className='linkText' onClick={()=>{nav1()}} >
                      {LocalValue === 'AM' ? 'Տեսնել հարցաշարը' : 'See the questionnaire'}
                            </p>
                            <p className='linkText' onClick={()=>{nav2()}} >
                            {LocalValue === 'AM' ? 'Ավելացնել հարցաշար' : 'Add a questionnaire'}
                            </p>
                    </div>
                  </div>
                :
                <div className="addAnswer">
                    <form autoComplete='off' onSubmit={addQuestion}>
                        <label htmlFor='22' >{LocalValue === 'AM' ? 'Ավելացնել հարց' : 'Add a question'}</label>
                        <textarea cols={8} rows={8} type='text' id='22' value={quesVal} onChange={(e)=>{setQuesVal(e.target.value)}} />
                        <button type='submit' >{LocalValue === 'AM' ? 'Ավելացնել' : 'Add'}</button>
                    </form>
                </div>  
                }


          
                </div>
    
              </div>
            </div>
          </div>
        </div>
      );
}

export default QuestionModal