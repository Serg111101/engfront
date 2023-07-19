import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Quiz: []
}

export const QuizSlice = createSlice({
  name: 'Quiz',
  initialState,
  reducers: {
    fetchingQuiz(state) {
      state.loading = true;
    },
    fetchQuiz(state, action) {
      state.loading = false;
      state.Quiz = action.payload;
      state.error = ''
    },
    fetchErrorQuiz(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingQuiz, fetchQuiz, fetchErrorQuiz } = QuizSlice.actions;
export default QuizSlice.reducer;
