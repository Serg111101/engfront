import axios from "../../hooks/axios/adminAxios";
import {  fetchingQuizChild, fetchQuizChild, fetchErrorQuizChild } from "../slice/QuizChildSlice";
// import {fetchAboutOurTeam,fetchErrorAboutOurTeam,fetchingAboutOurTeam} from "../slice/AboutOurTeamSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const addQuizChild = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingQuizChild());
            const response =await axios.post(`${URL}v2/addTest`,obj); 
        }
        catch(error){
            console.log(error,'error');
        }

    }
}

export const getQuizChild = (obj) => {
    
    return async (dispatch)=>{
        try{
            dispatch(fetchingQuizChild());
            const response =await axios.get(`${URL}v2/getTest/${obj.teacher_id}/${obj.children_id}`); 
           
            dispatch(fetchQuizChild(response?.data))
        }
        catch(error){
            console.log(error,'error');
        }

    }}
