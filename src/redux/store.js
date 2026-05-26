import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employees/employeeSlice';
import brandReducer from './slices/brand/brandSlice'
import shopReducer from './slices/shops/shopSlice'
import attendanceReducer from './slices/attendance/attendanceSlice'
import taskReducer from './slices/task/taskSlice'
export const store = configureStore({
  reducer: {
     employees: employeeReducer,
     brands: brandReducer,
     shops: shopReducer,
     attendance: attendanceReducer,
     tasks:taskReducer,
  },
});