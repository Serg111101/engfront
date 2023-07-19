/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getFetchLogo } from "../../store/action/LogoAction";
import { getFetchHeader } from "../../store/action/HeaderAction";

export function Header() {
  const { Logo } = useSelector((state) => state.Logo);
  const { Header } = useSelector((state) => state.Header);
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState("am"); // Use useState hook

  let aa = window.location.href;
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
      localStorage.setItem("language", JSON.stringify(languages || "am"));
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
      case "Գլխավոր էջ":
        navigate("/");
        break;
      case "Մեր մասին":
      case "About us":
        navigate("/about");
        break;
      case "Գործընկերներ":
        navigate("/");
        break;
      case "Կապ մեզ հետ":
      case "Contact us":
        navigate("/ContactUS");
        break;
      default:
        navigate("/");
        break;
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
            {Header?.map((el, index) => (
              <div
                className={
                  (index === 0 && bb === "/") ||
                  (index === 1 && bb === "/about") ||
                  (index === 3 && bb === "/ContactUS")
                    ? "item active"
                    : "item"
                }
                onClick={() => navigateTo(el?.title)}
                key={index}
              >
                {el?.title}
              </div>
            ))}
            {mobile && (
              <div className="closeHeader" id="closeHeader">
                <CloseOutlined onClick={() => setMobile(!mobile)} />
              </div>
            )}
            <div className="selectDiv">
              <select
                name="sel"
                id="sel"
                value={languages} 
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="am">&#127462;&#127474;</option>
                <option value="en">&#127482;&#127480;</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
