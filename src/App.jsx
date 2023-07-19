import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { Lesson } from "./pages/Lessons";
import Infomation from "./pages/infoBlock/infomation";
import { Quiz } from "./pages/Quiz/quiz";
import { Scrollbars, } from 'react-custom-scrollbars';
import { Satellites } from "./pages/Satellites";
import { QuizSatelite } from "./pages/QuizSatelite";
import {NotFoundPage} from "./pages/NotFoundPage";
import { useEffect } from "react";

function App() {
  const a = sessionStorage
  useEffect(()=>{
    if(!sessionStorage.getItem("count")){
      sessionStorage.setItem("count",1)
    }
  },[a])

  return (
    <Scrollbars style={{ width: '100vw',
     height: '100vh',
     background:'#68abea',
     
    //  background-color:'#68abea'
     }}
     autoHide
     autoHideTimeout={1000}
     autoHideDuration={200}
     >
      <div className="App">
          <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ContactUS" element={<ContactUs />} />
          <Route path="/Lessons" element={<Lesson />} />
          <Route path="/Leqtures" element={<Infomation />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Satellites" element={<Satellites />} />
          <Route path="/SatelliteQuiz" element={<QuizSatelite />} />
          <Route path="*" element={< NotFoundPage/>} />
        </Routes>
          <Footer />
      </div>
    </Scrollbars>
  );
}

export default App;
