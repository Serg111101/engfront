import axios from "axios";
import {  fetchingAbout, fetchAbout, fetchErrorAbout } from "../slice/AboutSlice";
import {fetchAboutOurTeam,fetchErrorAboutOurTeam,fetchingAboutOurTeam} from "../slice/AboutOurTeamSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getFetchAbout = () => {
    return async (dispatch)=>{
   
        try{
            dispatch(fetchingAbout());
            const response =await axios({
                method: 'get',
                url: `${URL}about/${LocalValue? LocalValue:"am"}`,
              });
            dispatch(fetchAbout(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorAbout(error));
        }

    }
}


export const getAboutOutTeam = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingAboutOurTeam());
            const response =await axios.get(`${URL}getOurTeam/${LocalValue ? LocalValue:"am"}`);  
            dispatch(fetchAboutOurTeam(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorAboutOurTeam(error));
        }

    }
}