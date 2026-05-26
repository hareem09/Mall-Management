import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shopDetails: JSON.parse(localStorage.getItem('shopData')) || [],
};

const shopSlice = createSlice({
  name: 'shops',
  initialState,

  reducers: {
    addShop: (state, action) => {
      state.shopDetails.push(action.payload);

      localStorage.setItem(
        'shopData',
        JSON.stringify(state.shopDetails)
      );
    },

    updateShop: (state, action) => {
      state.shopDetails = state.shopDetails.map((shop) =>
        shop.id === action.payload.id
          ? action.payload
          : shop
      );

      localStorage.setItem(
        'shopData',
        JSON.stringify(state.shopDetails)
      );
    },

    deleteShop: (state, action) => {
      state.shopDetails = state.shopDetails.filter(
        (shop) => shop.id !== action.payload
      );

      localStorage.setItem(
        'shopData',
        JSON.stringify(state.shopDetails)
      );
    },
  },
});

export const {
  addShop,
  updateShop,
  deleteShop,
} = shopSlice.actions;

export default shopSlice.reducer;