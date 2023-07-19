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
    fetchHomeHeader(state, action) {
      state.loading = false;
      state.HomeHeader = action.payload;
      state.error = ''
    },
    fetchErrorHomeHeader(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeHeader, fetchHomeHeader, fetchErrorHomeHeader } = HomeHeaderSlice.actions


export default HomeHeaderSlice.reducer
