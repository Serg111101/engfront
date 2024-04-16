import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  loading: false,
  error: "",
  Lectures: []
}

export const LecturesSlice = createSlice({
  name: 'Lectures',
  initialState,
  reducers: {
    fetchingLectures(state) {
      state.loading = true;
    },
    fetchLectures(state, action) {
      state.loading = false;
      state.Lectures = action.payload;
      state.error = ''
    },
    fetchErrorLectures(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    fetchLecturesDel(state) {
      state.Lectures = [];
    },
    
  }
})

export const { fetchingLectures, fetchLectures, fetchErrorLectures,fetchLecturesDel } = LecturesSlice.actions;
export default LecturesSlice.reducer;
