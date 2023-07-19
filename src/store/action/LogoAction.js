import axios from "axios";
import {  fetchingLogo, fetchLogo, fetchErrorLogo } from "../slice/LogoSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchLogo = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingLogo());
            const response =await axios.get(`${URL}homeIcons/logo/${LocalValue ? LocalValue:"am"}`);     
            dispatch(fetchLogo(response?.data[0].information[0]));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorLogo(error));
        }

    }
}
