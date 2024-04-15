import axios from "../../hooks/axios/adminAxios";
import {  fetchingQuizChild, fetchQuizChild } from "../slice/QuizChildSlice";
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
        await axios.post(`${URL}v2/addTest`,obj); 
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
            const response =await axios.get(`${URL}v2/getTest/${obj.teacher_id}/${obj.children_id}`,); 
           
            dispatch(fetchQuizChild(response?.data))
        }
        catch(error){
            console.log(error,'error');
        }

    }}
    export const putQuizChildStatus = (obj) => {
        const ll = JSON.stringify(obj);
        const kk = JSON.parse(ll)
        return async ()=>{
            try{
                
                await axios.put(`${URL}v2/putTest/${kk.teacher_id}/${kk.children_id}/${kk.id}`,kk); 
               
                
            }
            catch(error){
                console.log(error,'error');
            }
    
        }}



    export const addFetchQuiz = (value,setError,setLoading) => {
        return async (dispatch)=>{
            try{
                setLoading(true);
                await axios.post(`${URL}aeroSpace/addNewQuestion/${LocalValue ? LocalValue:"AM"}`,value);  
                setLoading(false);
                setError("ok");
            }
            catch(error){
                setError(error);
            }
    
        }
    }
