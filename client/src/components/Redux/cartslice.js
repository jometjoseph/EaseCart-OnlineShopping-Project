import { createSlice } from '@reduxjs/toolkit';

export const cartslice = createSlice({
  name: 'cart',
  initialState: {
    searchKey: "",
  },
  reducers: {
    setSearchKey: (state, action) => {
      state.search = action.payload;
      console.log("search term",action.payload);
    }
  }
});

// this is for dispatch
export const { setSearchKey } = cartslice.actions;

// this is for configureStore
export default cartslice.reducer;