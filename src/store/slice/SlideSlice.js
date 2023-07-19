import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Slide: []
}

export const SlideSlice = createSlice({
  name: 'Slide',
  initialState,
  reducers: {
    fetchingSlide(state) {
      state.loading = true;
    },
    fetchSlide(state, action) {
      state.loading = false;
      state.Slide = action.payload;
      state.error = ''
    },
    fetchErrorSlide(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingSlide, fetchSlide, fetchErrorSlide } = SlideSlice.actions;
export default SlideSlice.reducer;
