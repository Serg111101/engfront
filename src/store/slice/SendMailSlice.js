import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  SendMail: []
}

export const SendMailSlice = createSlice({
  name: 'SendMail',
  initialState,
  reducers: {
    fetchingSendMail(state) {
      state.loading = true;
    },
    fetchSendMail(state, action) {
      state.loading = false;
      state.SendMail = action.payload;
      state.error = '';
    },
    fetchErrorSendMail(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingSendMail, fetchSendMail, fetchErrorSendMail } = SendMailSlice.actions;
export default SendMailSlice.reducer;
