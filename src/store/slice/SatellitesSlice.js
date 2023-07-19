import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  loading: false,
  error: "",
  Satellites: []
}


export const SatellitesSlice = createSlice({
  name: 'Satellites',
  initialState,
  reducers: {
    fetchingSatellites(state) {
      state.loading = true;
    },
    fetchSatellites(state, action) {
      state.loading = false;
      state.Satellites = action.payload;
      state.error = '';
    },
    fetchErrorSatellites(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingSatellites, fetchSatellites, fetchErrorSatellites } = SatellitesSlice.actions;
export default SatellitesSlice.reducer;
