import axios from "../../hooks/axios/adminAxios";
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
                url: `${URL}aeroSpace/about/${LocalValue? LocalValue:"AM"}`,
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
            const response =await axios.get(`${URL}aeroSpace/getOurTeam/${LocalValue ? LocalValue:"AM"}`);  
            dispatch(fetchAboutOurTeam(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorAboutOurTeam(error));
        }

    }
}