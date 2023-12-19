import axios from "axios";
// import {  fetchingLogo, fetchLogo, fetchErrorLogo } from "../slice/LogoSlice";
import { fetchingChildren,fetchChildren,fetchErrorChildren } from "../slice/ChildrenSlice";
const URL = process.env.REACT_APP_BASE_URL1
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchChildren = (obj) => {

    return async (dispatch)=>{
        try{
            dispatch(fetchingChildren());
            const response =await axios.get(`${URL}getChildren/${obj?.id}/${obj?.name}`);           
            await dispatch(fetchChildren(response?.data));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorChildren(error));
        }

    }
}

export const addChildren = (obj) => {
    return async (dispatch)=>{
         try{
            dispatch(fetchingChildren());
            const response =await axios.post(`${URL}addCHildren`,obj); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}
export const editChildren = (obj) => {
    return async (dispatch)=>{
     
         try{
            dispatch(fetchingChildren());
            const response =await axios.put(`${URL}editChildren/${obj.id}`,obj); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}


export const editTeacher = (obj) => {
    return async ()=>{
     
         try{
            await axios.put(
                `${URL}putTeacher/${edite.id}`,
                edite
              );

        }
        catch(error){
            console.log(error,'error');
        }

    }
}



export const deleteChildren = (id) => {
    return async (dispatch)=>{
       
         try{
            dispatch(fetchingChildren());
            const response =await axios.delete(`${URL}deleteChildren/${id}`); 

        }
        catch(error){
            console.log(error,'error');
        }

    }
}