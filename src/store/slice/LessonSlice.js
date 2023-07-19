import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Lesson: []
}

export const LessonSlice = createSlice({
  name: 'Lesson',
  initialState,
  reducers: {
    fetchingLesson(state) {
      state.loading = true;
    },
    fetchLesson(state, action) {
      state.loading = false;
      state.Lesson = action.payload;
      state.error = ''
    },
    fetchErrorLesson(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingLesson, fetchLesson, fetchErrorLesson } = LessonSlice.actions;
export default LessonSlice.reducer;
