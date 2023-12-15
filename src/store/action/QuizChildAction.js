import axios from "axios";
import {  fetchingQuizChild, fetchQuizChild, fetchErrorQuizChild } from "../slice/QuizChildSlice";
// import {fetchAboutOurTeam,fetchErrorAboutOurTeam,fetchingAboutOurTeam} from "../slice/AboutOurTeamSlice";
const URL = process.env.REACT_APP_BASE_URL1;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const addQuizChild = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingQuizChild());
            const response =await axios.post(`${URL}/addTest`); 
        }
        catch(error){
            console.log(error,'error');
        }

    }
}


// export const getAboutOutTeam = () => {
//     return async (dispatch)=>{
//         try{
//             dispatch(fetchingAboutOurTeam());
//             const response =await axios.get(`${URL}getOurTeam/${LocalValue ? LocalValue:"AM"}`);  
//             dispatch(fetchAboutOurTeam(response?.data));
//         }
//         catch(error){
//             console.log(error,'error');
//             dispatch(fetchErrorAboutOurTeam(error));
//         }

//     }
// }