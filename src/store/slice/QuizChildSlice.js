import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  QuizChild: []
}

export const QuizChildSlice = createSlice({
  name: 'QuizChild',
  initialState,
  reducers: {
    fetchingQuizChild(state) {
      state.loading = true;
    },
    fetchQuizChild(state, action) {
      state.loading = false;
      state.QuizChild = action.payload;
      state.error = '';
    },
    fetchErrorQuizChild(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingQuizChild, fetchQuizChild, fetchErrorQuizChild } = QuizChildSlice.actions;
export default QuizChildSlice.reducer;
