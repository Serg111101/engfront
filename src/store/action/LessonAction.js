import axios from "axios";
import { fetchingLesson,fetchLesson,fetchErrorLesson } from "../slice/LessonSlice";
import { fetchingQuiz,fetchQuiz,fetchErrorQuiz } from "../slice/QuizSlice";
import { fetchingLectures,fetchLectures,fetchErrorLectures } from "../slice/LecturesSlice";
import { fetchingSlide,fetchSlide,fetchErrorSlide } from "../slice/SlideSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchLesson = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingLesson());
            const response =await axios.get(`${URL}lessons/${LocalValue ? LocalValue:"am"}`);
            
            dispatch(fetchLesson(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorLesson(error));
        }
    }
}

export const getFetchQuiz = (titlee) => {
    const arr = titlee.split(".");
    
    return async (dispatch)=>{
        try{
            dispatch(fetchingQuiz());
            const response =await axios.get(`${URL}getQuiz/${arr[0]}/${LocalValue ? LocalValue:"am"}`);
            if(!localStorage.getItem("quizz")){
                localStorage.setItem('quizz',JSON.stringify(response?.data));   
            }
            else{
            localStorage.setItem('quizz',JSON.stringify(response?.data));   
        }
        await  dispatch(fetchQuiz(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorQuiz(error));
        }
    }
}

export const getFetchLectures =  (titlee) => {
    
    return async (dispatch)=>{
        try{
            dispatch(fetchingLectures());
            const response =await axios.get(`${URL}getLectures/${titlee}/${LocalValue ? LocalValue:"am"}`);




            if(!localStorage.getItem('Lectures')){

                localStorage.setItem("Lectures",JSON.stringify(response?.data[0]?.lectures));
            }
            else{
                localStorage.setItem("Lectures",JSON.stringify(response?.data[0]?.lectures));

            }
            
            dispatch(fetchLectures(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorLectures(error));
        }

    }
}

export const getFetchSlides =  (titlee) => {
    const arr = titlee.split(".");
    return async (dispatch)=>{
        try{
            dispatch(fetchingSlide());
            const response =await axios.get(`${URL}topics/${arr[0]}/${LocalValue ? LocalValue:"am"}`);

   
  
            dispatch(fetchSlide(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorSlide(error));
        }

    }
}