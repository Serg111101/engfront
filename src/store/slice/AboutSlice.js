import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  About: []
}

export const AboutSlice = createSlice({
  name: 'About',
  initialState,
  reducers: {
    fetchingAbout(state) {
      state.loading = true;
    },
    fetchAbout(state, action) {
      state.loading = false;
      state.About = action.payload;
      state.error = '';
    },
    fetchErrorAbout(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingAbout, fetchAbout, fetchErrorAbout } = AboutSlice.actions;
export default AboutSlice.reducer;
