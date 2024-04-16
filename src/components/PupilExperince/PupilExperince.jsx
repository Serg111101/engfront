  /*eslint-disable*/
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import { getQuizChild, putQuizChildStatus } from "../../store/action/QuizChildAction";
  import useAuth from "../../hooks/AdminHooks/useAuth";
  import { EyeInvisibleOutlined } from '@ant-design/icons';
  import Swal from "sweetalert2";
  // import 'antd/dist/antd.css'
  import "./PupilExperince.scss";

  export function PupilExperince() {
    const dispatch = useDispatch();
    const { name } = useParams();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { QuizChild } = useSelector((state) => state.QuizChild);

    useEffect(() => {
      dispatch(getQuizChild({ teacher_id: auth?.id, children_id: name }));
    }, [dispatch, auth, name]);
    const [view, setView] = useState(false);
    const [rows, setRows] = useState(false);
    let LocalValue;
    if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }

    

    const chaveUnverifiedStatus = async (el,indexx) => {

      Swal.fire({
        position: "center",
        icon: "info",
        title:LocalValue ==="AM"? "Հաստատել պատասխանը որպե՞ս": "Confirm answer as?",
        showConfirmButton: true,
        confirmButtonText:LocalValue ==="AM"? "Ճիշտ": "Correct",
        showCancelButton:true,
        cancelButtonText:LocalValue ==="AM"? "Սխալ": "Wrong",
    })
    .then(async (res) => {
      if(res.isConfirmed&&!res.isDismissed){
        const updatedIncorrect = [...el.incorrect];
      const updataCorrect = [...el.correct]
      const arr = [];
      const fil = await updatedIncorrect.filter((e,i)=>{
        if(i === indexx){
          return e
        }
        else{
          arr.push(e);
        }
      })
      await updataCorrect.push(fil[0]);
      let obj = {
      ... el,
      correct:updataCorrect,
      incorrect:arr
      }

      dispatch(putQuizChildStatus(obj));
      dispatch(getQuizChild({ teacher_id: auth?.id, children_id: name }));
      setRows([])
     setView([obj])

    
      }

      else{
        const updatedIncorrect = [...el.incorrect];
        
      const fil = await updatedIncorrect.map((e,i)=>{
        if(i === indexx){
          return {...e,unverified:true}
        }else {
          return e
        }
       
      })
     
      let obj = {
      ... el,
      incorrect:fil
      }

      dispatch(putQuizChildStatus(obj));
      dispatch(getQuizChild({ teacher_id: auth?.id, children_id: name }));
      setRows([])
     setView([obj])
        
      }
    
      
    });
  }

  




    

    return (

      <div
        className={QuizChild.length > 0 ? "PupilExperience" : "emptyExperince"}
      >
        {QuizChild.length > 0 && !view && (
          <table>
            <thead>
              <tr>
                <th>{LocalValue === "AM" ? "Դաս" : "Lesson"}</th>
                <th>
                  {LocalValue === "AM" ? "Հարցերի քանակը" : "Number of questions"}
                </th>
                <th>
                  {LocalValue === "AM"
                    ? "Ճիշտ պատասխանների քանակը"
                    : "Number of correct answers"}
                </th>
                <th>
                  <EyeInvisibleOutlined />
                </th>
              </tr>
            </thead>

            <tbody>
              {QuizChild.length > 0 &&
                QuizChild.map((el, index) => (
                  <tr key={index + 1}>
                    <td>{el?.lesson}</td>
                    <td>{el.incorrect?.length + el.correct?.length}</td>
                    <td>{el.correct?.length}</td>
                    <td
                      onClick={() => {
                        setView([el]); setRows([]);
                      }}
                    >
                      <EyeInvisibleOutlined />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {view.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>{LocalValue === "AM" ? "Դաս" : "Lesson"}</th>
                <th>{LocalValue === "AM" ? "Հարց" : "Question"}</th>
                <th>{LocalValue === "AM" ? "Պատասխան" : "Answers"}</th>
              </tr>
            </thead>
            <tbody>
              {view?.map((el, index) => {
                for (
                  let i = 1;
                  i <= el.incorrect?.length + el.correct?.length;
                  i++
                ) {
                  el?.correct?.forEach((item, indexx) => {
                    if (+item?.question?.split(".")[0] === i) {
                      rows.push(
                        <tr key={indexx+95}>
                          <td>{el?.lesson}</td>
                          <td>{item?.question}</td>
                          {!item?.not_checked ?  <td>{item?.answer}</td>:<td>{item?.not_checked}</td>}
                        </tr>
                      );
                    }
                  });

                  el?.incorrect?.forEach((item, indexx) => {
                    if (+item?.question?.split(".")[0] === i) {
                      rows.push(
                        <tr key={indexx}>
                          <td>{el.lesson}</td>
                          <td style={{ color: "red" }}>{item?.question}</td>

                          {!item?.not_checked ? <td style={{ color: "red" }}>{item?.answer}</td> : <td>
                            <div  style={{ color:item?.unverified && "red" }} >{item?.not_checked}</div>
                            {!item.unverified && <div className="dffg" >
                               <button id="buttonTextCheck" onClick={()=>{chaveUnverifiedStatus(el, indexx)}} >{LocalValue ==="AM"? "Ստուգել": "Check"}</button>
                            </div>}
                          </td>}
                        </tr>
                      );
                    }
                  });
                }

                return rows;
              })}
            </tbody>
          </table>
        )}
        {!QuizChild.length && <p>{LocalValue === "AM" ? "Դատարկ Է" : "It is empty"}</p>}
        {view ? (
          <button
            onClick={() => {
              setView("");
            }}
          >
            {LocalValue === "AM" ? "Հետ" : "Prev"}
          </button>
        ) : (
          <button
            onClick={() => {
              navigate(-2);
            }}
          >
            {LocalValue === "AM" ? "Հետ" : "Prev"}
          </button>
        )}
      </div>
    );
  }
