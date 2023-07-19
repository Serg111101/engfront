import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  HomeNextRout:[],
}

export const HomeNextRoutSlice = createSlice({
  name: 'HomeNextRout',
  initialState,
  reducers: {
    fetchingHomeNextRout(state) {
      state.loading = true;
    },
    fetchHomeNextRout(state, action) {
      state.loading = false;
      state.HomeNextRout = action.payload;
      state.error = ''
    },
    fetchErrorHomeNextRout(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeNextRout, fetchHomeNextRout, fetchErrorHomeNextRout } = HomeNextRoutSlice.actions


export default HomeNextRoutSlice.reducer
