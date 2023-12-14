import axios from "axios";
import { fetchClass,fetchingClass,fetchErrorClass } from "../slice/ClassSlice";

const URL = process.env.REACT_APP_BASE_URL1

export const addclass = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            console.log(obj);
            const response =await axios.post(`${URL}addclass/2`,obj); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}

export const getClass = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            console.log(obj);
            const response =await axios.get(`${URL}getclass/2`,obj); 
             dispatch(fetchClass(response.data))
        }
        catch(error){
            console.log(error,'error');
        }

    }
}

export const editeClass = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            console.log(obj);
            const response =await axios.put(`${URL}putclass/2`,obj); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}

export const deleteClass = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            console.log(obj);
            const response =await axios.delete(`${URL}deleteclass/2`,obj); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}