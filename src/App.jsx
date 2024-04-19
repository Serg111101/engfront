/*eslint-disable*/
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { Lesson } from "./pages/Lessons";
import Infomation from "./pages/infoBlock/infomation";
import { Quiz } from "./pages/Quiz/quiz";
import { Scrollbars } from "react-custom-scrollbars";
import { Satellites } from "./pages/Satellites";
import { QuizSatelite } from "./pages/QuizSatelite";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useEffect } from "react";
import { ClassPage } from "./pages/ClassPage/ClassPage";
import { ClassItem } from "./pages/ClassItem/ClassItem";
import { PupilExperince } from "./components/PupilExperince/PupilExperince";
import { Login } from "./pages/Login";
import useAuth from "./hooks/AdminHooks/useAuth";
import Profile from "./components/Profile/Profile";
import UserSatelite from "./pages/UserSatelite/UserSatelite";
import { AboutPerson } from "./pages/AboutPerson";
import { useDispatch } from "react-redux";

// import { UsefulMaterials } from "./pages/UsefulMaterials/UsefulMaterials";
// import { UsefulMaterialsInfo } from "./pages/UsefulMaterialsInfo";
function App() {
  
  const {auth} = useAuth();
  const a = sessionStorage;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (!sessionStorage.getItem("count")) {
      sessionStorage.setItem("count", 1);
    }
  }, [a]);
  const url = window.location.href;
  const path = window.location.pathname;
  useEffect(() => {
     let path = window.location.pathname.slice(window.location.pathname.length - 2, window.location.pathname.length);
    if(path !== "/"){
     
      localStorage.setItem("language",JSON.stringify(path))
    }else{
      localStorage.setItem("language",JSON.stringify("AM"))

    }

      
      if (path !== `/Leqtures/${LocalValue}` && localStorage.getItem("elem")) {
        localStorage.removeItem("elem");
      } 
   
  }, [url, path]);
  useEffect(()=>{
    if(!auth?.accessToken && !localStorage.getItem("auth")){
      navigate('/');
   }

  },[auth,window.location.pathname])

  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  useEffect(() => {


    return () => {
      window.location.reload();
    };
  }, [LocalValue]);

  return (
    <Scrollbars
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",

        //  background-color:'#68abea'
      }}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      <div className="App">
       {auth?.accessToken &&<Header />}
        <Routes>
          <Route path={`/home/${LocalValue}`} element={<Home/>} />
          <Route path={`/about/${LocalValue}`} element={<About />} />
          <Route path={`/aboutPersons/${LocalValue}`} element={<AboutPerson/>}/>
          <Route path={`/ContactUS/${LocalValue}`} element={<ContactUs />} />
          <Route path={`/Lessons/${LocalValue}`} element={<Lesson />} />
          <Route path={`/Leqtures/${LocalValue}`} element={<Infomation />} />
          <Route path={`/Quiz/${LocalValue}`} element={<Quiz />} />
          <Route path={`/Satellites/${LocalValue}`} element={<Satellites />} />
          <Route path={`/SatelliteQuiz/${LocalValue}`} element={<QuizSatelite />} />
          <Route path={`/Class/${LocalValue}`} element={<ClassPage />} />
          <Route path={`/Class/:name/${LocalValue}`} element={<ClassItem />} />
          <Route path={`/PupilExperince/:name/${LocalValue}`} element={<PupilExperince />} />
          <Route path="/"  element={<Login/>}/>
          <Route path={`/Profile/${LocalValue}`} element={<Profile/>}/>
          <Route path={`/UserSatelite/${LocalValue}`} element={<UserSatelite/>}/>
          {/* <Route path="/UsefulMaterials" element={<UsefulMaterials/>}/> */}
          {/* <Route path="/UsefulMaterialsInfo/:index" element={<UsefulMaterialsInfo/>}/> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {auth?.accessToken&&<Footer />}
      </div>
    </Scrollbars>
  );
}

export default App;
