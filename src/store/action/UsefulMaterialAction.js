import axios from "../../hooks/axios/adminAxios";
import {
  fetchingUseMaterial,
  fetchUseMaterial,
  fetchErrorUseMaterial,
} from "../slice/UseMaterialSlice";

const URL = process.env.REACT_APP_BASE_URL;
let LocalValue;
if (localStorage.getItem("language")) {
  let local = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}
export const getFetchUseMaterial = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchingUseMaterial());
      const response = await axios.get(
        `${URL}aeroSpace/lessons/${LocalValue ? LocalValue : "AM"}`
      );

      dispatch(fetchUseMaterial(response?.data));
    } catch (error) {
      console.log(error, "error");
      dispatch(fetchErrorUseMaterial(error));
    }
  };
};

