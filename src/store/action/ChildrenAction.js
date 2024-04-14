/*eslint-disable*/
import axios from "../../hooks/axios/adminAxios";
// import {  fetchingLogo, fetchLogo, fetchErrorLogo } from "../slice/LogoSlice";
import { fetchingChildren,fetchChildren,fetchErrorChildren } from "../slice/ChildrenSlice";
import { fetchCubesatLinks, fetchErrorCubesatLinks, fetchingCubesatLinks } from "../slice/CubesatLinksSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchChildren = (obj) => {

    return async (dispatch)=>{
        try{
            dispatch(fetchingChildren());
            const response =await axios.get(`${URL}v2/getChildren/${obj?.id}/${obj?.name}`);           
            await dispatch(fetchChildren(response?.data));
        }
        catch(error){
            console.error(error,'error');
            dispatch(fetchErrorChildren(error));
        }

    }
}

export const addChildren = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingChildren());
            const response =await axios.post(`${URL}v2/addCHildren`,obj); 

        }
        catch(error){
            console.error(error,'error');
        }

    }
}
export const editChildren = (obj,setSuccess) => {
    return async ()=>{
     
         try{
          
            await axios.put(`${URL}v2/editChildren/${obj.id}`,obj); 
           
            setSuccess("ok")

        }
        catch(error){
            setSuccess(error)
            console.error(error,'error');
        }

    }
}


export const editTeacher = (edite,setSuccess) => {
    return async ()=>{
     
         try{
            await axios.put(
                `${URL}v2/putTeacher/${edite.id}`,
                edite
              );
              setSuccess("ok")
        }
        catch(error){
            setSuccess(error)

            console.error(error,'error');
        }

    }
}



export const deleteChildren = (id) => {
    return async (dispatch)=>{
       
         try{
            dispatch(fetchingChildren());
            const response =await axios.delete(`${URL}v2/deleteChildren/${id}`); 

        }
        catch(error){

            console.error(error,'error');
        }

    }
}

export const getFetchCubesatLinls = (id) => {

    return async (dispatch)=>{
        try{
            dispatch(fetchingCubesatLinks());
            const response =await axios.get(`${URL}v2/getCubesatLinks/${id}`);
            dispatch(fetchCubesatLinks(response?.data[0]?.links))
        }
        catch(error){
            console.error(error,'error');
            dispatch(fetchErrorCubesatLinks(error))
        }

    }
}