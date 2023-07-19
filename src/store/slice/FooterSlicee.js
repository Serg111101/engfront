import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Footer: []
}

export const FooterSlice = createSlice({
  name: 'Footer',
  initialState,
  reducers: {
    fetchingFooter(state) {
      state.loading = true;
    },
    fetchFooter(state, action) {
      state.loading = false;
      state.Footer = action.payload;
      state.error = '';
    },
    fetchErrorFooter(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingFooter, fetchFooter, fetchErrorFooter } = FooterSlice.actions;
export default FooterSlice.reducer;
