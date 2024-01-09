import axios from "../../hooks/axios/adminAxios";
import { fetchingContactUs,fetchContactUs,fetchErrorContactUs } from "../slice/ContactUsSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchContactUs = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingContactUs());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/contactUs/${LocalValue?LocalValue:"AM"}`); 
            dispatch(fetchContactUs(response?.data[0].information));
        }
        catch(error){
            console.error(error,'error');
            dispatch(fetchErrorContactUs(error));
        }

    }
}