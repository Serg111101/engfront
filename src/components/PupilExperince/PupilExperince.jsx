import React, { useEffect, useState } from 'react';
import './PupilExperince.scss';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { getQuizChild } from '../../store/action/QuizChildAction';
import useAuth from '../../hooks/AdminHooks/useAuth';

export function PupilExperince() {

  const dispatch = useDispatch();
  const { name } = useParams(); 
  const { auth } = useAuth();
const navigate = useNavigate()
  const { QuizChild, loading } = useSelector(state => state.QuizChild)

  useEffect(() => {
    dispatch(getQuizChild({ teacher_id: auth?.id, children_id: name }));
  }, [dispatch, auth, name]);
const [view,setView] = useState(false)
console.log(view)
  return (
    <div className="PupilExperience">
        <table>
      <thead>
          <tr>
            <th>Lesson</th>
            <th>Question count</th>
            <th>Corect Answer count</th>
            <th>view</th>
          </tr>
        </thead>
      
        
        <tbody>
      {QuizChild.length>0 &&QuizChild.map(el=> 
        <tr >
                      <td>{el?.lesson}</td>
                      <td>{el.incorrect?.length + el.correct?.length}</td>
                      <td>{el.correct?.length}</td>
                      <td onClick={()=>setView([el])}>View</td>
                    </tr>
       )}
 </tbody>
         </table>
      {QuizChild.length>0  && view && 
      <table>
        <thead>
          <tr>
            <th>Lesson</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
         { view?.map((el, index) => {
            const rows = [];
            for (let i = 1; i <= (el.incorrect?.length + el.correct?.length); i++) {
              el?.correct?.forEach((item, indexx) => {
                if (item?.question?.split(".")[0] == i) {
                  rows.push(
                    <tr key={indexx}>
                      <td>{el?.lesson}</td>
                      <td>{item?.question}</td>
                      <td>{item?.answer}</td>
                    </tr>
                  );
                }
              });

              el?.incorrect?.forEach((item, indexx) => {
                if (+item?.question?.split(".")[0] === i) {
                  rows.push(
                    <tr key={indexx}>
                      <td>{el.lesson}</td>
                      <td style={{color:"red"}} >{item?.question}</td>
                      <td style={{color:"red"}} >{item?.answer}</td>
                    </tr>
                  );
                }
              });
            }


            return rows;
          })}
        </tbody>
      </table>}
 {!QuizChild.length && <p>Datark e</p> }
      <button onClick={() => { navigate(-2) }}>
        Հետ
      </button>
    </div>
  );
}
