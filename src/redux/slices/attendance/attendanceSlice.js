import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attendanceDetails:
    JSON.parse(localStorage.getItem('attendData')) || [],
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,

  reducers: {
    addAttendance: (state, action) => {
      state.attendanceDetails.push(action.payload);

      localStorage.setItem(
        'attendData',
        JSON.stringify(state.attendanceDetails)
      );
    },

    updateAttendance: (state, action) => {
      state.attendanceDetails =
        state.attendanceDetails.map((attend) =>
          attend.id === action.payload.id
            ? action.payload
            : attend
        );

      localStorage.setItem(
        'attendData',
        JSON.stringify(state.attendanceDetails)
      );
    },

    deleteAttendance: (state, action) => {
      state.attendanceDetails =
        state.attendanceDetails.filter(
          (attend) => attend.id !== action.payload
        );

      localStorage.setItem(
        'attendData',
        JSON.stringify(state.attendanceDetails)
      );
    },
  },
});

export const {
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;