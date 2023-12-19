/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState, useRef } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getFetchLogo } from "../../store/action/LogoAction";
import { getFetchHeader } from "../../store/action/HeaderAction";
import ReactFlagsSelect from "react-flags-select";
import useAuth from "../../hooks/AdminHooks/useAuth";

export function Header() {
  const { Logo } = useSelector((state) => state.Logo);
  const { Header } = useSelector((state) => state.Header);
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState("AM");
  let bb = window.location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { auth } = useAuth();

  useEffect(() => {
    dispatch(getFetchLogo());
    dispatch(getFetchHeader());
  }, [dispatch]);

  useEffect(() => {
    handleLanguageChange();
  }, [languages, bb]);

  function handleLanguageChange() {
    let language = localStorage.getItem("language");
    if (language === null) {
      localStorage.setItem("language", JSON.stringify(languages || "AM"));
      setLanguages(languages);
      window.location.hash = languages;
    } else {
      setLanguages(JSON.parse(language));
      window.location.hash = JSON.parse(language);
    }
  }

  function changeLanguage(e) {
    localStorage.setItem("language", JSON.stringify(e));
    setLanguages(e);
    navigate("/");
    window.location.reload();
  }
  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);

  function navigateTo(val) {
    switch (val) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/about");
        break;
      case 3:
        navigate("/");
        break;
      case 4:
        navigate("/ContactUS");
        break;
      default:
        navigate("/");
    }
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="header">
      <div className="constainerHeader">
        <div className="imageHeader">
          <a href="/" onClick={() => navigate("/")}>
            <img src={Logo?.logo} alt={Logo?.title} />
          </a>
        </div>
        <div
          className="headericone"
          id="headericone"
          onClick={() => setMobile(true)}
        >
          {!mobile && (
            <div onClick={() => setMobile(true)}>
              <MenuOutlined />
            </div>
          )}
        </div>

        <div className={!mobile ? "items" : "items-mobile"}>
          <div className="itemsContainer" id="itemsContainer">
            {mobile && (
              <div className="closeHeader" id="closeHeader">
                <CloseOutlined onClick={() => setMobile(!mobile)} />
              </div>
            )}
            {Header?.map((el, index) => (
              <div
                className={
                  (index === 0 && bb === "/") ||
                  (index === 1 && bb === "/about") ||
                  (index === 3 && bb === "/ContactUS")
                    ? "item active"
                    : "item"
                }
                onClick={() => navigateTo(el?.id)}
                key={index}
              >
                {el?.title}
              </div>
            ))}
            {auth?.role === "admin" && (
              <div
                className={" item"}
                onClick={() => {
                  navigate("/Class");
                }}
              >
                {LocalValue == "AM" ? "Դասարաններ" : "Classes"}
              </div>
            )}

            <div className="selectDiv">
              <ReactFlagsSelect
                id="selBtn"
                selectedSize={18}
                optionsSize={14}
                style={{ backgroundColor: "none" }}
                countries={["US", "AM"]}
                customLabels={{ US: " ", AM: " " }}
                selected={languages}
                onSelect={(countryCode) => {
                  changeLanguage(countryCode);
                }}
              />
            </div>

            <div className="admin-dropdown" ref={dropdownRef}>
              <div className="admin-info" onClick={toggleDropdown}>
                {auth?.picture ? (
                  <img src={auth?.picture} />
                ) : (
                  <img src="/image/flex.jpg" alt="flex" />
                )}
              </div>
              {isOpen && (
                <div className="dropdown-content">
                  <p>{auth?.fullName}</p>
                  <p
                    onClick={() => {
                      navigate("/Profile");
                    }}
                  >
                    {LocalValue == "AM" ? "Իմ էջ" : "My profile"}
                  </p>
                  <p
                    onClick={() => {
                      localStorage?.removeItem("auth");
                      navigate(0);
                    }}
                  >
                    {LocalValue == "AM" ? "Դուրս գալ" : " Log Out"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// /*eslint-disable */
// import "./Header.scss";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   CloseOutlined,
//   MenuOutlined,

// } from "@ant-design/icons";
// import {  getFetchHeader } from "../../store/action/HeaderAction";
// import { getFetchLogo, uploadImage } from "../../store/action/LogoAction";
// import ReactFlagsSelect from "react-flags-select";
// import { useDispatch, useSelector } from "react-redux";
// const URL = process.env.REACT_APP_BASE_URL;

// export function Header() {
//   // const { Logo, Header } = useAppSelector((state) => ({
//   //   Logo: state.Logo.Logo,
//   //   Header: state.Header.Header,
//   // }));
//   const { Header } = useSelector((state) => state.Header);
//   const { Logo } = useSelector((state) => state.Logo);

//   const url = window.location.href;
//   const [done, setDone] = useState(false);
//   const navigate = useNavigate();
//   const [mobile, setMobile] = useState(false);
//   const [editShow, setEditShow] = useState(0);
//   const [edit, setEdit] = useState("");
//   const [image,setImage] = useState(Logo?.logo||"") ;
//   const [languages, setLanguages] = useState("AM");
//   const [auth,setAuth]= useState('');

//   let bb = window.location.pathname;
//   let LocalValue;
//   if (localStorage.getItem("language")) {
//       let local = localStorage.getItem("language");
//       LocalValue = JSON.parse(local);
//   }
//   useEffect(() => {
//     if (window.location.pathname === "/Setting") {
//       sessionStorage.setItem("done", "true");
//     } else {
//       sessionStorage.removeItem("done");
//     }
//     setDone(sessionStorage.getItem("header") === "true");

//   }, [url,bb]);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getFetchLogo());
//     dispatch(getFetchHeader());
//   }, [dispatch]);
//   useEffect(() => {
//     handleLanguageChange();
//   }, [languages, bb]);

//   const role= localStorage.getItem('auth')
//   const roles = JSON.parse(role)
//   useEffect(()=>{
//     if(roles){
//    setAuth(roles?.accessToken)

//   }else{
//     setAuth('')
//    }
//   },[localStorage.getItem('auth')])
//   function handleLanguageChange() {
//     let language = localStorage.getItem("language");
//     if (language === null) {
//       localStorage.setItem("language", JSON.stringify(languages || "AM"));
//       setLanguages(languages);
//       window.location.hash = languages;
//     } else {
//       setLanguages(JSON.parse(language));
//       window.location.hash = JSON.parse(language);
//     }
//   }

//   function changeLanguage(e) {
//     localStorage.setItem("language", JSON.stringify(e));
//     setLanguages(e);
//     navigate("/");
//     window.location.reload();
//   }

//   function navigateTo(val) {
//     switch (val) {
//       case 1:
//         navigate("/");
//         break;
//       case 2:
//         navigate("/about");
//         break;
//       case 3:
//         navigate("/");
//         break;
//       case 4:
//         navigate("/ContactUS");
//         break;
//       default:
//         navigate("/");
//     }
//   }

//   return (
//     <header className="header">
//       <div className="constainerHeader">
//         <div className="imageHeader">
//           <a
//             href="/"
//             onClick={(e) => {
//               e.preventDefault();
//               navigate("/");
//             }}
//           >
//             <img src={Logo?.logo?Logo?.logo:image} alt={"Web Page Logo is not difind"} />
//           </a>

//                  </div>

//         <div
//           className="headericone"
//           id="headericone"
//           onClick={() => setMobile(true)}
//         >
//           {!mobile && (
//             <div onClick={() => setMobile(true)}>
//               <MenuOutlined  />
//             </div>
//           )}
//         </div>
//         <div className={!mobile ? "items" : "items-mobile"}>
//           <div className="itemsContainer" id="itemsContainer">
//           {mobile && (
//                 <div className="closeHeader" id="closeHeader">
//                   <CloseOutlined className="iconantdd" onClick={() => setMobile(false)}  />
//                 </div>
//               )}
//             {  Header?.map((el, index) => (
//               <div
//                 className={
//                   (index === 0 && bb === "/")||
//                   (index === 1 && bb === "/about") ||
//                   (index === 3 && bb === "/ContactUS")
//                     ? "item active"
//                     : "item"
//                 }

//                 key={index}
//               >
//                 <p onClick={() => navigateTo(el?.id)} >{el?.title}</p>

//               </div>
//             ))}
//             {auth && <div
//               className={url === `${URL}aeroSpace/Settings` ? "item active" : "item"}
//               onClick={() => navigate("/Setting")}
//               >
//              {LocalValue === "AM"?"Կարգավորումներ":" Settings"}
//             </div>}
//            {auth ? <div
//               className={url === `${URL}aeroSpace/Login` ? "item active" : "item"}
//               onClick={() => {localStorage.removeItem('auth');setAuth('');navigate("/Login")}}
//               >
//              {LocalValue === "AM"?"Դուրս գալ":" Log out"}

//             </div> : <div
//               className={url === `${URL}aeroSpace/Login` ? "item active" : "item"}
//               onClick={() => navigate("/Login")}
//             >
//               {LocalValue === "AM"?"Մուտք":" Log in"}
//             </div>}

//             <div className="selectDiv">

//               <ReactFlagsSelect
//                 id="selBtn"
//                 selectedSize={18}
//                 optionsSize={14}
//                 countries={["US", "AM"]}
//                 customLabels={{ "US": " ", "AM": " " }}
//                 selected={languages}
//                 onSelect={(countryCode) => {
//                   changeLanguage(countryCode);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//     </header>
//   );
// }
