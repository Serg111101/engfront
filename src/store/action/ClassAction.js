import axios from "../../hooks/axios/adminAxios";
import { fetchClass,fetchingClass,fetchErrorClass } from "../slice/ClassSlice";

const URL = process.env.REACT_APP_BASE_URL

export const addclass = (obj,id,setSuccess) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            const response =await axios.post(`${URL}v2/addclass/${id}`,obj); 
             setSuccess('ok')
        }
        catch(error){
            setSuccess(error)
            console.log(error,'error');
        }

    }
}

export const getClass = (id) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            const response =await axios.get(`${URL}v2/getclass/${id}`); 
             dispatch(fetchClass(response.data))
        }
        catch(error){
            console.log(error,'error');
        }

    }
}

export const editeClass = (obj,setSuccess) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            await axios.put(`${URL}v2/putclass`,obj); 
            setSuccess('ok')
        }
        catch(error){
            setSuccess(error)

            console.log(error,'error');
        }

    }
}

export const deleteClass = (id,obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingClass());
            const response =await axios.delete(`${URL}v2/deleteclass/${id}/${obj.name}`); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}