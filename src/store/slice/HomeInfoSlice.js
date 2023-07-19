import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  HomeInfo: []
}

export const HomeInfoSlice = createSlice({
  name: 'HomeInfo',
  initialState,
  reducers: {
    fetchingHomeInfo(state) {
      state.loading = true;
    },
    fetchHomeInfo(state, action) {
      state.loading = false;
      state.HomeInfo = action.payload;
      state.error = ''
    },
    fetchErrorHomeInfo(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeInfo, fetchHomeInfo, fetchErrorHomeInfo } = HomeInfoSlice.actions;
export default HomeInfoSlice.reducer;
