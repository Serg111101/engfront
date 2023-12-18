import { configureStore } from '@reduxjs/toolkit';
import HomeHeaderReducer from './slice/HomeHeaderSlice';
import AboutReducer from './slice/AboutSlice';
import AboutOurTeamReducer from './slice/AboutOurTeamSlice';
import LogoReducer from './slice/LogoSlice';
import HomeNextRoutReducer from './slice/HomeNextRoutSlice'; 
import HomeAuthorReducer from './slice/HomeAuthorSlice';
import HomeInfoReducer from './slice/HomeInfoSlice';
import ContactReducer from './slice/ContactSlice';
import MailReducer from './slice/MailSlice';
import ContactUsReducer from './slice/ContactUsSlice';
import LessonReducer from './slice/LessonSlice';
import QuizReducer from './slice/QuizSlice';
import LecturesReducer from './slice/LecturesSlice';
import SlideReducer from './slice/SlideSlice';
import HeaderReducer from './slice/HeaderSlice';
import FooterReducer from './slice/FooterSlicee';
import SendMailReducer from './slice/SendMailSlice';
import SatellitesSliceReducer from './slice/SatellitesSlice';
import QuizSateliteReducer from './slice/QuizSateliteSlice';
import ChildrenReducer from './slice/ChildrenSlice';
import ClassReducer from './slice/ClassSlice';
import QuizChildReducer from './slice/QuizChildSlice'
const store = configureStore({
  reducer: {
    HomeHeaderr:HomeHeaderReducer,
    About:AboutReducer,
    AboutOurTeam:AboutOurTeamReducer,
    Logo:LogoReducer,
    HomeNextRout:HomeNextRoutReducer,
    HomeAuthor:HomeAuthorReducer,
    HomeInfo:HomeInfoReducer,
    Contact:ContactReducer,
    Mail:MailReducer,
    ContactUs:ContactUsReducer,
    Lesson:LessonReducer,
    Quiz:QuizReducer,
    Lectures:LecturesReducer,
    Slide:SlideReducer,
    Header:HeaderReducer,
    Footer:FooterReducer,
    SendMail:SendMailReducer,
    Satellites:SatellitesSliceReducer,
    QuizSatelite:QuizSateliteReducer,
    Children:ChildrenReducer,
    Class:ClassReducer,
    QuizChild:QuizChildReducer,
  }
})

export {store};



