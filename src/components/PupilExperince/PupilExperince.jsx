import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizChild, putQuizChild, putQuizChildStatus } from "../../store/action/QuizChildAction";
import useAuth from "../../hooks/AdminHooks/useAuth";
import { CheckOutlined, CloseOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
// import 'antd/dist/antd.css'
import "./PupilExperince.scss";

export function PupilExperince() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { QuizChild } = useSelector((state) => state.QuizChild);
  console.log(QuizChild, "lllllllllllllllllllllllllll");
  const [checkboxStates, setCheckboxStates] = useState([]);

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




  // const chaveUnverifiedStatus = async (checked) => {
  //   console.log(checked,"ccccccccccccccccc");
  //   setCheckboxStates({...checked,unverified: !checked.unverified});
  //   console.log(checkboxStates, "bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  //   // dispatch(putQuizChildStatus(checkboxStates))
  //   // dispatch(getQuizChild({ teacher_id: auth?.id, children_id: name }));
  // };



  const chaveUnverifiedStatus = async (checked) => {
    setCheckboxStates({
      ...checked,
      unverified: !checked.unverified
    });

  };

  useEffect(() => {
    console.log(checkboxStates, "dddddddddddd");
    if (checkboxStates) {
      console.log(11111111111111111);
      dispatch(putQuizChildStatus(checkboxStates))
      dispatch(getQuizChild({ teacher_id: auth?.id, children_id: name }));
    }


  }, [checkboxStates]);


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
                  ? "Ճիշտ պատասխաններ քանակ"
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
      {view.length > 0 && view && (
        <table>
          <thead>
            <tr>
              <th>{LocalValue === "AM" ? "Դաս" : "Lesson"}</th>
              <th>{LocalValue === "AM" ? "Հարց" : "Questions"}</th>
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
                  if (item?.question?.split(".")[0] === i) {
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
                        <td style={{ color: "red" }}>{item?.question}</td>

                        {!item?.not_checked ? <td style={{ color: "red" }}>{item?.answer}</td> : <td>
                          <div>{item?.not_checked}</div>
                          <div>
                          <Space direction="vertical">
                            <Switch defaultChecked={el.unverified} checkedChildren="1" unCheckedChildren="0" onClick={()=>{chaveUnverifiedStatus(el)}} />
                          </Space>
                          </div>
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
      {!QuizChild.length && <p>{LocalValue === "AM" ? "Դատարկ Է" : "Empty"}</p>}
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
