/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getFetchLogo } from "../../store/action/LogoAction";
import { getFetchHeader } from "../../store/action/HeaderAction";
import ReactFlagsSelect from "react-flags-select";




export function Header() {
  const { Logo } = useSelector((state) => state.Logo);
  const { Header } = useSelector((state) => state.Header);
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState("AM");
  let bb = window.location.pathname;

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

 
 

  return (
    <header className="header">
      <div className="constainerHeader">
        <div className="imageHeader">
          <a href="/" onClick={() => navigate("/")}>
            <img src={Logo?.logo} alt={Logo?.title} />
          </a>
        </div>
        <div className="headericone" id="headericone" onClick={() => setMobile(true)}>
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
                  (index === 0 && bb === "/")|| 
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
  
            <div className="selectDiv">
              {/* <select
                name="sel"
                id="sel"
                value={languages} 
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="AM">&#127462;&#127474;</option>
                <option value="US">&#127482;&#127480;</option>
              </select> */}
              <ReactFlagsSelect id="selBtn"       selectedSize={18}
        optionsSize={14}
      style={{backgroundColor:"none"}}  countries={["US", "AM"]}customLabels={{ "US":" ", "AM":" " }} selected={languages} onSelect={(countryCode)=>{changeLanguage(countryCode)}} 
                      
                      />
             </div>
           </div>
         </div>
       </div>
     </header>
   );
 }