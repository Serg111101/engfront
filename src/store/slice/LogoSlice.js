import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Logo: []
}

export const LogoSlice = createSlice({
  name: 'Logo',
  initialState,
  reducers: {
    fetchingLogo(state) {
      state.loading = true;
    },
    fetchLogo(state, action) {
      state.loading = false;
      state.Logo = action.payload;
      state.error = ''
    },
    fetchErrorLogo(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingLogo, fetchLogo, fetchErrorLogo } = LogoSlice.actions;
export default LogoSlice.reducer;
