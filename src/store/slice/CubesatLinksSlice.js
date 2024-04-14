import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  CubesatLinks: []
}

export const CubesatLinksSlice = createSlice({
  name: 'CubesatLinks',
  initialState,
  reducers: {
    fetchingCubesatLinks(state) {
      state.loading = true;
    },
    fetchCubesatLinks(state, action) {
      state.loading = false;
      state.CubesatLinks = action.payload;
      state.error = ''
    },
    fetchErrorCubesatLinks(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingCubesatLinks, fetchCubesatLinks, fetchErrorCubesatLinks } = CubesatLinksSlice.actions;
export default CubesatLinksSlice.reducer;
