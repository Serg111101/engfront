import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  HomeHeader: []
}

export const HomeHeaderSlice = createSlice({
  name: 'HomeHeader',
  initialState,
  reducers: {
    fetchingHomeHeader(state) {
      state.loading = true;
    },
    fetchHomeHeaderr(state, action) {
      state.loading = false;
      state.HomeHeaderr = action.payload;
      state.error = ''
    },
    fetchErrorHomeHeader(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeHeader, fetchHomeHeaderr, fetchErrorHomeHeader } = HomeHeaderSlice.actions


export default HomeHeaderSlice.reducer
