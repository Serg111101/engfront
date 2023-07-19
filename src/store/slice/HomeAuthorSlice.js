import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  HomeAuthor:[]
}

export const HomeAuthorSlice = createSlice({
  name: 'HomeAuthor',
  initialState,
  reducers: {
    fetchingHomeAuthor(state) {
      state.loading = true;
    },
    fetchHomeAuthor(state, action) {
      state.loading = false;
      state.HomeAuthor = action.payload;
      state.error = ''
    },
    fetchErrorHomeAuthor(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeAuthor, fetchHomeAuthor, fetchErrorHomeAuthor } = HomeAuthorSlice.actions


export default HomeAuthorSlice.reducer
