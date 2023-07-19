import axios from "axios";
// import {  fetchingLogo, fetchLogo, fetchErrorLogo } from "../slice/LogoSlice";
import { fetchingQuizSatelite,fetchQuizSatelite,fetchErrorQuizSatelite } from "../slice/QuizSateliteSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchQuizSatelite = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingQuizSatelite());
            const response =await axios.get(`${URL}satelliteQuestions/${LocalValue ? LocalValue:"am"}`);  
            
            if(!localStorage.getItem("quizzsat")){
                localStorage.setItem('quizzsat',JSON.stringify(response?.data));   
            }
            else{
            localStorage.setItem('quizzsat',JSON.stringify(response?.data));   
        }
            await dispatch(fetchQuizSatelite(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorQuizSatelite(error));
        }

    }
}
