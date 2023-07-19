import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  ContactUs: []
}

export const ContactUsSlice = createSlice({
  name: 'ContactUs',
  initialState,
  reducers: {
    fetchingContactUs(state) {
      state.loading = true;
    },
    fetchContactUs(state, action) {
      state.loading = false;
      state.ContactUs = action.payload;
      state.error = '';
    },
    fetchErrorContactUs(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingContactUs, fetchContactUs, fetchErrorContactUs } = ContactUsSlice.actions;
export default ContactUsSlice.reducer;
