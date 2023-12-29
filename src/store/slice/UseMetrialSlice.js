import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  loading: false,
  error: "",
  UseMaterial: []
}

export const UseMaterialSlice = createSlice({
  name: 'UseMaterial',
  initialState,
  reducers: {
    fetchingUseMaterial(state) {
      state.loading = true;
    },
    fetchUseMaterial(state, action) {
      state.loading = false;
      state.Lectures = action.payload;
      state.error = ''
    },
    fetchErrorUseMaterial(state, action ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingUseMaterial, fetchUseMaterial, fetchErrorUseMaterial } = UseMaterialSlice.actions;
export default UseMaterialSlice.reducer;
