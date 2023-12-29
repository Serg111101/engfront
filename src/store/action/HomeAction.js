import axios from "../../hooks/axios/adminAxios";
import {  fetchingHomeHeader, fetchHomeHeaderr, fetchErrorHomeHeader } from "../slice/HomeHeaderSlice";
import { fetchingHomeNextRout,fetchErrorHomeNextRout,fetchHomeNextRout } from "../slice/HomeNextRoutSlice";
import { fetchHomeAuthor,fetchErrorHomeAuthor,fetchingHomeAuthor } from "../slice/HomeAuthorSlice";
import { fetchingHomeInfo,fetchHomeInfo,fetchErrorHomeInfo } from "../slice/HomeInfoSlice";
import { fetchingContact,fetchContact,fetchErrorContact } from "../slice/ContactSlice";
import { fetchingMail,fetchMail,fetchErrorMail } from "../slice/MailSlice";
import { fetchingSendMail,fetchSendMail,fetchErrorSendMail } from "../slice/SendMailSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue; 
if(localStorage.getItem("language")){
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getfetchHomeHeader = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingHomeHeader());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/text/${LocalValue ? LocalValue:"AM"}`);  
            dispatch(fetchHomeHeaderr(response.data[0]?.information[0]));
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorHomeHeader(error));
        }

    }
}


export const   getfetchHomeNextRout= () => {
   

    return async (dispatch)=>{
        try{
            dispatch(fetchingHomeNextRout());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/lessonBox/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchHomeNextRout(response?.data[0]?.information));
            
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorHomeAuthor(error));
        }

    }
}


export const getfetchHomeAuthor   = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingHomeAuthor());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/Box/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchHomeAuthor(response?.data[0]?.information[0]));
            
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorHomeNextRout(error));
        }

    }
}


export const getfetchHomeInfo = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingHomeInfo());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/downBox/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchHomeInfo(response?.data[0]?.information));
            
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorHomeInfo(error));
        }

    }
}

export const getfetchSendMail = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingSendMail());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/sendMail/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchSendMail(response?.data[0]?.information));
            
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorSendMail(error));
        }

    }
}
export const getfetchContact = () => {
    return async (dispatch)=>{
        try{
            dispatch(fetchingContact());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/contact/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchContact(response?.data[0]?.information));
            
        }
        catch(error){
            console.log(error,'error');
            dispatch(fetchErrorContact(error));
        }

    }
}

export const SendMaill = (obj) => {
    return async (dispatch)=>{
        try{        
        dispatch(fetchingMail())    
        const response = await axios.post(`${URL}aeroSpace/sendMail`,obj);
        dispatch(fetchMail(response?.data));

        }
        catch(error){
            console.log(error,'error');            
            dispatch(fetchErrorMail(error));
        }

    }
}