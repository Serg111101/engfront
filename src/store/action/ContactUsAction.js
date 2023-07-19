import axios from "axios";
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
            const response =await axios.get(`${URL}homeIcons/contactUs/${LocalValue?LocalValue:"am"}`); 
            dispatch(fetchContactUs(response?.data[0].information));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorContactUs(error));
        }

    }
}