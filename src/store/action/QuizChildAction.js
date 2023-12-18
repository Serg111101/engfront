import axios from "axios";
import {  fetchingQuizChild, fetchQuizChild, fetchErrorQuizChild } from "../slice/QuizChildSlice";
// import {fetchAboutOurTeam,fetchErrorAboutOurTeam,fetchingAboutOurTeam} from "../slice/AboutOurTeamSlice";
const URL = process.env.REACT_APP_BASE_URL1;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const addQuizChild = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingQuizChild());
            const response =await axios.post(`${URL}addTest`,obj); 
        }
        catch(error){
            console.log(error,'error');
        }

    }
}

export const getQuizChild = (obj) => {
    console.log('====================================');
    console.log(obj);
    console.log('====================================');
    return async (dispatch)=>{
        try{
            dispatch(fetchingQuizChild());
            const response =await axios.get(`${URL}/getTest/${obj.teacher_id}/${obj.children_id}`); 
            console.log('====================================');
            console.log(response?.data);
            console.log('====================================');
            dispatch(fetchQuizChild(response?.data))
        }
        catch(error){
            console.log(error,'error');
        }

    }}
