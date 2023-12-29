import axios from "../../hooks/axios/adminAxios";
const URL = process.env.REACT_APP_BASE_URL;

export  function uploadImageHandleradd(e,setImg) {
  return async ()=>{
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    if (formData.has("image")) {
      try {
        const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImg(response?.data?.dirname);
        
            
      } catch (error) {
        return "Server request is failed";
      }
    }
  }
}