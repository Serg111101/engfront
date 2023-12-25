import axios from 'axios';
import useAuth from '../AdminHooks/useAuth';
const URL = process.env.REACT_APP_BASE_URL

const local=localStorage.getItem('auth')
const localAuth=JSON.parse(local)
const token=localAuth?.accessToken
const refresh=localAuth?.refreshToken



const refreshAccessToken = async () => {

  try {
    // Make a request to your token refresh endpoint
    const response = await axios.post(`${URL}auth/refresh`, {
      refreshToken: refresh,
    });

  
    const newAccessToken = response.data.access_token;

    // Update the Axios instance with the new access token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

    // Return the new access token
    return response.data;
  } catch (error) {
     if(error?.response?.data?.status === 401 && error?.response?.data?.message === 333){
        await localStorage.removeItem("auth");
        await window?.location.reload()
    }
    // Handle the error, e.g., redirect to login page or log out the user
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL:URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
console.log('====================================');
console.log(error?.response?.data?.message);
console.log('====================================');
if (error.response.status === 401 && !originalRequest._retry ) {
    originalRequest._retry = true;
    
    try {
        const newAccessToken = await refreshAccessToken();
      
        localStorage.setItem("auth",JSON.stringify(newAccessToken));
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken?.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
}

    return Promise.reject(error);
  }
);

// // Example usage of the axiosInstance for making requests
// axiosInstance.get('/some-protected-endpoint')
//   .then((response) => {
//     // Handle successful response
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // Handle error (e.g., unauthorized or network error)
//     console.error(error);
//   });
export default axiosInstance