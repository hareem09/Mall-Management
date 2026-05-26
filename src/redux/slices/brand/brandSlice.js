import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brandDetails: JSON.parse(localStorage.getItem('brandData')) || [],
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,

  reducers: {
    addBrand: (state, action) => {
      state.brandDetails.push(action.payload);

      localStorage.setItem(
        'brandData',
        JSON.stringify(state.brandDetails)
      );
    },

    updateBrand: (state, action) => {
      state.brandDetails = state.brandDetails.map((brand) =>
        brand.id === action.payload.id
          ? action.payload
          : brand
      );

      localStorage.setItem(
        'brandData',
        JSON.stringify(state.brandDetails)
      );
    },

    deleteBrand: (state, action) => {
      state.brandDetails = state.brandDetails.filter(
        (brand) => brand.id !== action.payload
      );

      localStorage.setItem(
        'brandData',
        JSON.stringify(state.brandDetails)
      );
    },
  },
});

export const {
  addBrand,
  updateBrand,
  deleteBrand,
} = brandSlice.actions;

export default brandSlice.reducer;