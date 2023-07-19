import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Contact: []
}

export const ContactSlice = createSlice({
  name: 'Contact',
  initialState,
  reducers: {
    fetchingContact(state) {
      state.loading = true;
    },
    fetchContact(state, action) {
      state.loading = false;
      state.Contact = action.payload;
      state.error = '';
    },
    fetchErrorContact(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingContact, fetchContact, fetchErrorContact } = ContactSlice.actions;
export default ContactSlice.reducer;
