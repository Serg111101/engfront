import React, { useEffect, useState } from "react";
import "./Profile.scss";
import useAuth from "../../hooks/AdminHooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { editChildren, editTeacher } from "../../store/action/ChildrenAction";
import Swal from "sweetalert2";

const Profile = () => {
  // const URL = process.env.REACT_APP_BASE_URL1;
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [oldUsername, setOldUserName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [edite, setEdite] = useState();
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [seePas, setSeePas] = useState(false);
  const [seePas1, setSeePas1] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setEdite(auth);
  }, [auth]);

  console.log("====================================");
  console.log(edite);
  console.log("====================================");
  useEffect(() => {
    if (oldUsername.length > 0) {
      setError(true);
    }
    if (oldUsername === auth?.login) {
      setError(false);
    }
  }, [oldUsername]);
  useEffect(() => {
    if (repeatPassword.length > 0) {
      setError1(true);
    }

    if (edite?.password?.length > 0 && repeatPassword === edite.password) {
      setError1(false);
    }
  }, [repeatPassword]);
  async function editInfo(e) {
    e.preventDefault();

    if (!error && !error1 && auth?.role === "admin") {
      if (!repeatPassword && !oldUsername) {
        setError2(true);
      } else {
        console.log(edite);
        localStorage.setItem("auth", JSON.stringify(edite));
        await delete edite.accessToken;
        await delete edite.refreshToken;
        if (edite.login === "") {
          delete edite.login;
        }
        if (edite.password === "") {
          delete edite.password;
        }
        try {
          
          dispatch(editTeacher(edite));
          Swal.fire({
            position: "center",
            icon: "success",
            title:LocalValue === "AM"
            ? "Փոփոխությունը հաստատված է"
            : "The change is approved",
            showConfirmButton: false,
            timer: 2500
        }).then(()=>{
           setOldUserName("");
           setRepeatPassword("");
           setEdite();
           navigate("/")
        })
        } catch (error) {
          console.log(error, "error");
        }
      }
    }
    if (!error && !error1 && auth?.role === "children") {
      if (!repeatPassword && !oldUsername) {
        setError2(true);
      } else {
        localStorage.setItem("auth", JSON.stringify(edite));

        delete edite.accessToken;
        delete edite.refreshToken;
        try {
          dispatch(editChildren(edite));
          Swal.fire({
            position: "center",
            icon: "success",
            title: LocalValue === "AM"
            ? "Փոփոխությունը հաստատված է"
            : "The change is approved",
            showConfirmButton: false,
            timer: 2500
        }).then(()=>{
          setOldUserName("");
          setRepeatPassword("");
          setEdite();
          navigate("/")
       })
        } catch (error) {
          console.log(error, "error");
        }
      }
    }
  }

  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  return (
    <div
      className="profileContainer"
      style={{ background: `url(./image/loginbg.jpg) no-repeat` }}
    >
      <form
        className="profile"
        style={{
          border: error2
            ? "1px solid red"
            : "1px solid rgb(255, 255, 255, 0.2)",
        }}
        autoComplete="off"
      >
        <h2>
          {LocalValue === "AM"
            ? "Փոփոխել մուտքանուն կամ գաղտնաբառ"
            : "Change username or password"}
        </h2>
        <label htmlFor="">
          {LocalValue === "AM" ? "Հին մուտքանուն" : "Old username"}
        </label>

        <input
          type="text"
          placeholder={LocalValue === "AM" ? "Հին մուտքանուն" : "Old username"}
          onChange={(e) => {
            setOldUserName(e.target.value);
            setError2(false);
          }}
        />
        {error && (
          <span style={{ color: "red" }}>
            {LocalValue === "AM" ? "Սխալ մուտքանուն" : "wrong username"}
          </span>
        )}
        <label htmlFor="">
          {LocalValue === "AM" ? "Նոր մուտքանուն" : "New username"}
        </label>

        <input
          type="text"
          name="login"
          placeholder={LocalValue === "AM" ? "Նոր մուտքանուն" : "New username"}
          style={{
            border: error2
              ? "1px solid red"
              : "1px solid rgb(255, 255, 255, 0.2)",
          }}
          onChange={(e) => {
            setEdite({ ...edite, [e.target.name]: e.target.value });
            setError2(false);
          }}
        />
        <label htmlFor="">
          {LocalValue === "AM" ? "Նոր գաղտնաբառ " : "New password"}
        </label>
        <div className="password_box">
          <input
            style={{
              border: error2
                ? "1px solid red"
                : "1px solid rgb(255, 255, 255, 0.2)",
            }}
            type={seePas ? "text" : "password"}
            name="password"
            placeholder={
              LocalValue === "AM" ? "Նոր գաղտնաբառ " : "New password"
            }
            onChange={(e) => {
              setEdite({ ...edite, [e.target.name]: e.target.value });
              setError2(false);
            }}
          />
          <EyeInvisibleOutlined
            className="see"
            onClick={() => {
              setSeePas(!seePas);
            }}
          />
        </div>
        <label htmlFor="">
          {LocalValue === "AM"
            ? "Կրկնել նոր գաղտնաբառը "
            : "Repeat  new password"}
        </label>
        <div className="password_box">
          <input
            style={{
              border: error2
                ? "1px solid red"
                : "1px solid rgb(255, 255, 255, 0.2)",
            }}
            type={seePas1 ? "text" : "password"}
            placeholder={
              LocalValue === "AM"
                ? "Կրկնել նոր գաղտնաբառը "
                : "Repeat  new password"
            }
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setError2(false);
            }}
          />
          <EyeInvisibleOutlined
            className="see"
            onClick={() => {
              setSeePas1(!seePas1);
            }}
          />
        </div>
        {error1 && (
          <span style={{ color: "red" }}>
            {LocalValue === "AM" ? "Համընկում չկա" : "no match"}
          </span>
        )}
        <button className="btn" onClick={(e) => editInfo(e)}>
          {LocalValue === "AM" ? "Փոփոխել" : "Change"}
        </button>
        <button className="btn" onClick={(e) => navigate("/")}>
          {LocalValue === "AM" ? "Փակել" : "Close"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
