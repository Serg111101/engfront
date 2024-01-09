import axios from "../../hooks/axios/adminAxios";
// import { fetchingHeader,fetchHeader,fetchErrorHeader } from "../slice/HeaderSlice";
import  {fetchingFooter,fetchFooter,fetchErrorFooter} from '../slice/FooterSlicee'
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchFooter = () => {
    return async (dispatch)=>{
    
        try{
            dispatch(fetchingFooter());
            const response =await axios.get(`${URL}aeroSpace/footer/${LocalValue?LocalValue:"AM"}`); 
            dispatch(fetchFooter(response?.data));
        }
        catch(error){
            console.error(error,'error');
            dispatch(fetchErrorFooter(error));
        }

    }
}