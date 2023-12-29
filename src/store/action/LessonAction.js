import axios from "../../hooks/axios/adminAxios";
import {
  fetchingLesson,
  fetchLesson,
  fetchErrorLesson,
} from "../slice/LessonSlice";
import { fetchingQuiz, fetchQuiz, fetchErrorQuiz } from "../slice/QuizSlice";
import {
  fetchingLectures,
  fetchLectures,
  fetchErrorLectures,
} from "../slice/LecturesSlice";
import {
  fetchingSlide,
  fetchSlide,
  fetchErrorSlide,
} from "../slice/SlideSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue;
if (localStorage.getItem("language")) {
  let local = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}
export const getFetchLesson = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchingLesson());
      const response = await axios.get(
        `${URL}aeroSpace/lessons/${LocalValue ? LocalValue : "AM"}`
      );

      dispatch(fetchLesson(response?.data));
    } catch (error) {
      console.log(error, "error");
      dispatch(fetchErrorLesson(error));
    }
  };
};

export const getFetchQuiz = (titlee) => {
  return async (dispatch) => {
    try {
      dispatch(fetchingQuiz());
      const response = await axios.get(
        `${URL}aeroSpace/getQuiz/${titlee}/${LocalValue ? LocalValue : "AM"}`
      );

      await dispatch(fetchQuiz(response?.data));
    } catch (error) {
      console.log(error, "error");
      dispatch(fetchErrorQuiz(error));
    }
  };
};

export const getFetchLectures = (titlee) => {
  return async (dispatch) => {

    try {
      dispatch(fetchingLectures());
      const response = await axios.get(
        `${URL}aeroSpace/getLectures/${titlee}/${LocalValue ? LocalValue : "AM"}`
      );
      dispatch(fetchLectures(response?.data));
    } catch (error) {
      console.log(error, "error");
      dispatch(fetchErrorLectures(error));
    }
  };
};

export const getFetchSlides = (titlee) => {
  
  return async (dispatch) => {
    try {
      dispatch(fetchingSlide());
      const response = await axios.get(
        `${URL}aeroSpace/topics/${titlee}/${LocalValue ? LocalValue : "AM"}`
      );

      dispatch(fetchSlide(response?.data));
    } catch (error) {
      console.log(error, "error");
      dispatch(fetchErrorSlide(error));
    }
  };
};
