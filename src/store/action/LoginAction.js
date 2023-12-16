import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL_LOGIN;


export const fetchLoginReq = (obj,setLoading,setError) => {
    return async ()=>{
   
        try{
            
            setLoading(true)
            await axios.post(`${URL}auth/login`,obj);
              setLoading(false)
              setError("ok")
        }
        catch(error){
            setError(error)
            console.log(error,'error');
        }

    }
}

