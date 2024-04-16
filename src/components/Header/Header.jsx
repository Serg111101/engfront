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
import { fetchLessonDel } from "../../store/slice/LessonSlice";

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
  const { auth,setAuth } = useAuth();

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
    switch (val.id) {
      case 1:
        navigate("/home");
        setMobile(false);
        break;
      case 2:
        navigate("/about");
        setMobile(false);
        break;
      case 3:
        window.open(val.link,"_blank")
        setMobile(false);
        break;
      case 4:
        navigate("/ContactUS");
        setMobile(false);
        break;
      default:
        navigate("/home");
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
          <a  onClick={() => navigate("/home")}>
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
                  (index === 0 && bb === "/home") ||
                  (index === 1 && bb === "/about") ||
                  (index === 3 && bb === "/ContactUS")
                    ? "item active"
                    : "item"
                }
                onClick={() => navigateTo(el)}
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
                      // navigate(0)
                      setAuth({})
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


