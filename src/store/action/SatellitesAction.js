import axios from "../../hooks/axios/adminAxios";
import {fetchingSatellites,fetchSatellites,fetchErrorSatellites} from '../slice/SatellitesSlice'
const URL = process.env.REACT_APP_BASE_URL
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchSatellites = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingSatellites());
            const response =await axios.get(`${URL}aeroSpace/satellite/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchSatellites(response?.data[0]));
        }
        catch(error){
            dispatch(fetchErrorSatellites(error));
        }

    }
}
