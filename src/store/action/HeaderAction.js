import axios from "../../hooks/axios/adminAxios";
import { fetchingHeader,fetchHeader,fetchErrorHeader } from "../slice/HeaderSlice";
const URL = process.env.REACT_APP_BASE_URL;

let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchHeader = () => {
    return async (dispatch)=>{
        
        try{
            dispatch(fetchingHeader());
            const response =await axios.get(`${URL}aeroSpace/header/${LocalValue?LocalValue:"AM"}`); 
            dispatch(fetchHeader(response?.data));
        }
        catch(error){
            console.error(error,'error');
            dispatch(fetchErrorHeader(error));
        }

    }
}