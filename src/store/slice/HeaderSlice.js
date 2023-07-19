import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Header: []
}

export const HeaderSlice = createSlice({
  name: 'Header',
  initialState,
  reducers: {
    fetchingHeader(state) {
      state.loading = true;
    },
    fetchHeader(state, action) {
      state.loading = false;
      state.Header = action.payload;
      state.error = '';
    },
    fetchErrorHeader(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingHeader, fetchHeader, fetchErrorHeader } = HeaderSlice.actions;
export default HeaderSlice.reducer;
