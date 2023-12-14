import React, { useEffect, useState,useRef } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { fetchLoginReq } from "../../store/action/LoginAction";
import useAuth from '../../hooks/AdminHooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../hooks/AdminHooks/useInput';
import useToggle from '../../hooks/AdminHooks/useToggle';
import Swal from "sweetalert2";
import axios from "axios";
const Login = () => {
  // background: url("") no-repeat;
 const URL = process.env.REACT_APP_BASE_URL_LOGIN
  const [loading, setLoading] = useState(false);
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
  const from = location.state?.from?.pathname || "/";
  const [login, resetUser, userAttribs] = useInput('admin', '')

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [login, password])



//   const loginReq = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(fetchLoginReq(loginVal, setLoading, setError));
//       navigate("/");
//       setLoading({
//         login: "",
//         password: "",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
console.log({login,password})
  const loginReq = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${URL}auth/login`,
           {login,password},
         
        );
        const res = JSON.stringify(response.data)
        localStorage.setItem('auth', res);
        resetUser();
        setpassword('');
        const resp= localStorage.getItem('auth')
        navigate(from, { replace: true });
        const respons = JSON.parse(resp)
        setAuth(respons);
        
        
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No response from server');
        } else if (err.response?.status === 400) {
            setErrMsg('Incorrect username or password');
        } else if (err.response?.status === 401) {
            setErrMsg('Incorrect username or password');
        } else {
            setErrMsg('Login failed');
        }
        errRef.current.focus();
    }
}


  useEffect(() => {
    if (error === 'ok') {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Տվըալները հաջողությամբ հաստատվել են",
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
            title: "Որևէ սխալ կա փորցեք կրկին",
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
        <form>

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
             type="password"
             id="password"
             placeholder='Password'
             onChange={(e) => setpassword(e.target.value)}
             value={password}
             required
         />
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
