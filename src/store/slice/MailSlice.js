import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Mail: []
}

export const MailSlice = createSlice({
  name: 'Mail',
  initialState,
  reducers: {
    fetchingMail(state) {
      state.loading = true;
    },
    fetchMail(state, action) {
      state.loading = false;
      state.Mail = action.payload;
      state.error = '';
    },
    fetchErrorMail(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingMail, fetchMail, fetchErrorMail } = MailSlice.actions;
export default MailSlice.reducer;
