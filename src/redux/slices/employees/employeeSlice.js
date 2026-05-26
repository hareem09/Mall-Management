import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empDetails: JSON.parse(localStorage.getItem('empData')) || [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,

  reducers: {
    addEmployee: (state, action) => {
      state.empDetails.push(action.payload);

      localStorage.setItem(
        'empData',
        JSON.stringify(state.empDetails)
      );
    },

    updateEmployee: (state, action) => {
      state.empDetails = state.empDetails.map((emp) =>
        emp.id === action.payload.id
          ? action.payload
          : emp
      );

      localStorage.setItem(
        'empData',
        JSON.stringify(state.empDetails)
      );
    },

    deleteEmployee: (state, action) => {
      state.empDetails = state.empDetails.filter(
        (emp) => emp.id !== action.payload
      );

      localStorage.setItem(
        'empData',
        JSON.stringify(state.empDetails)
      );
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;