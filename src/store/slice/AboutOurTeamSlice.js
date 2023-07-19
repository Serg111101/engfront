import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  AboutOurTeam: []
}

export const AboutOurTeamSlice = createSlice({
  name: 'AboutOurTeam',
  initialState,
  reducers: {
    fetchingAboutOurTeam(state) {
      state.loading = true;
    },
    fetchAboutOurTeam(state, action) {
      state.loading = false;
      state.AboutOurTeam = action.payload;
      state.error = '';
    },
    fetchErrorAboutOurTeam(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingAboutOurTeam, fetchAboutOurTeam, fetchErrorAboutOurTeam } = AboutOurTeamSlice.actions;
export default AboutOurTeamSlice.reducer;
