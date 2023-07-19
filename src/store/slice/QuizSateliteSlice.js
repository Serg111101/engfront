import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  QuizSatelite: []
}

export const QuizSateliteSlice = createSlice({
  name: 'QuizSatelite',
  initialState,
  reducers: {
    fetchingQuizSatelite(state) {
      state.loading = true;
    },
    fetchQuizSatelite(state, action) {
      state.loading = false;
      state.QuizSatelite = action.payload;
      state.error = ''
    },
    fetchErrorQuizSatelite(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingQuizSatelite, fetchQuizSatelite, fetchErrorQuizSatelite } = QuizSateliteSlice.actions;
export default QuizSateliteSlice.reducer;
