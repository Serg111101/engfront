/*eslint-disable*/
import React, { useEffect, useState,useRef } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { fetchLoginReq } from "../../store/action/LoginAction";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../hooks/AdminHooks/useInput';
import useToggle from '../../hooks/AdminHooks/useToggle';
import useAuth from '../../hooks/AdminHooks/useAuth'
import axioss from "../../hooks/axios/adminAxios";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const Login = () => {
  // background: url("") no-repeat;
 const URL = process.env.REACT_APP_BASE_URL
  const [loading, setLoading] = useState(false);
  const [seePas, setSeePas] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { setAuth } = useAuth();
  const location = useLocation();
  const userRef = useRef();
  const errRef = useRef();
  const [password, setpassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = useToggle('persist', true);
  const from = location.state?.from?.pathname || "/home";
  const [login, resetUser, userAttribs] = useInput('admin', '')

  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  const {auth} = useAuth()
  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [login, password])


  const loginReq = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${URL}auth/login`,
           {login:login.trim(),password:password.trim()},
         
        );
    
        const res = JSON.stringify(response.data)
        localStorage.setItem('auth', res);
      await  resetUser();
        setpassword('');
        const resp= localStorage.getItem('auth')
        const respons = await JSON.parse(resp)
        await setAuth(respons);
        await navigate(from, { replace: true });
        axioss.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return config;
  });
        
        
    } catch (err) {
        if (!err?.response) {
            setErrMsg(LocalValue ==="AM"?"Փորձեք կրկին":'Try again');
        } else if (err.response?.status === 400) {
            setErrMsg(LocalValue ==="AM"?"Սխալ մուտքանուն կամ գաղտնաբառ":'Incorrect username or password');
        } else if (err.response?.status === 401) {
            setErrMsg(LocalValue ==="AM"?"Սխալ մուտքանուն կամ գաղտնաբառ":'Incorrect username or password');
        } else {
            setErrMsg(LocalValue ==="AM"?"Չհաջողվեց մուտք գործել":'Login failed');
        }
        errRef.current.focus();
    }
}


  useEffect(() => {
    if (error === 'ok') {
        Swal.fire({
            position: "center",
            icon: "success",
            title: LocalValue ==="AM"? "Տվյալները հաջողությամբ հաստատվել են": "Data has been successfully verified",
            showConfirmButton: false,
            timer: 2500
        }).then(()=>{
            setError("")
        });
    }
    if (error?.response?.status < 200 || error?.response?.status >= 400) {
        Swal.fire({
            position: "center",
            icon: "error",
            title:  LocalValue ==="AM"?"Որևէ սխալ կա փորցեք կրկին":"If there is an error, please try again",
            showConfirmButton: false,
            timer: 2500
        }).then(()=>{
            setError("")
        });
    }

}, [error])
  return (
    <div
      className="Login"
      style={{ background: `url(./image/loginbg.jpg) no-repeat` }}
    >
      <div className="container">
        <form autoComplete='off' >

        <p ref={errRef} className={errMsg ? " mt-2 text-[16px] text-[#c0d2e3]" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Login</h1>

          <div className="input-box">
          <input
                            type="text"
                            id="login"
                            ref={userRef}
                            placeholder='username'
                            autoComplete="off"
                            {...userAttribs}
                            required
                        />

                     
          </div>
          <div className="input-box">
            
             <input
              type={seePas ? "text" : "password"}
             id="password"
             placeholder='Password'
             onChange={(e) => setpassword(e.target.value)}
             value={password}
             required
         />
      { seePas ?  <EyeInvisibleOutlined
            className="see"
            onClick={() => {
              setSeePas(!seePas);
            }}
          />:
          < EyeTwoTone
            className="see"
            onClick={() => {
              setSeePas(!seePas);
            }}
          />}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button type="submit" className="btn" onClick={loginReq}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
