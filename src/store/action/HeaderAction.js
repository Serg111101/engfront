import axios from "axios";
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
            const response =await axios.get(`${URL}header/${LocalValue?LocalValue:"am"}`); 
            dispatch(fetchHeader(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorHeader(error));
        }

    }
}