import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Class: []
}

export const ClassSlice = createSlice({
  name: 'Class',
  initialState,
  reducers: {
    fetchingClass(state) {
      state.loading = true;
    },
    fetchClass(state, action) {
      state.loading = false;
      state.Class = action.payload;
      state.error = '';
    },
    fetchErrorClass(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingClass, fetchClass, fetchErrorClass } = ClassSlice.actions;
export default ClassSlice.reducer;
