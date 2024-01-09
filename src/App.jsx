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
import { useEffect, useState } from "react";
import { ClassPage } from "./pages/ClassPage/ClassPage";
import { ClassItem } from "./pages/ClassItem/ClassItem";
import { PupilExperince } from "./components/PupilExperince/PupilExperince";
import { Login } from "./pages/Login";
import useAuth from "./hooks/AdminHooks/useAuth";
import Profile from "./components/Profile/Profile";
import { UsefulMaterials } from "./pages/UsefulMaterials/UsefulMaterials";
import { UsefulMaterialsInfo } from "./pages/UsefulMaterialsInfo";
function App() {
  const {auth} = useAuth();

  const a = sessionStorage;
  const navigate = useNavigate()
  useEffect(() => {
    if (!sessionStorage.getItem("count")) {
      sessionStorage.setItem("count", 1);
    }
  }, [a]);

  useEffect(()=>{
    if(!auth?.accessToken && !localStorage.getItem("auth")){
      navigate('/login')
   }
  },[auth,window.location.pathname])


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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ContactUS" element={<ContactUs />} />
          <Route path="/Lessons" element={<Lesson />} />
          <Route path="/Leqtures" element={<Infomation />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Satellites" element={<Satellites />} />
          <Route path="/SatelliteQuiz" element={<QuizSatelite />} />
          <Route path="/Class" element={<ClassPage />} />
          <Route path="/Class/:name" element={<ClassItem />} />
          <Route path="/PupilExperince/:name" element={<PupilExperince />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/Profile" element={<Profile/>}/>
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
