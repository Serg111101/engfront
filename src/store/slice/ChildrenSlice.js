import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Children: []
}

export const ChildrenSlice = createSlice({
  name: 'Children',
  initialState,
  reducers: {
    fetchingChildren(state) {
      state.loading = true;
    },
    fetchChildren(state, action) {
      state.loading = false;
      state.Children = action.payload;
      state.error = '';
    },
    fetchErrorChildren(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingChildren, fetchChildren, fetchErrorChildren } = ChildrenSlice.actions;
export default ChildrenSlice.reducer;
