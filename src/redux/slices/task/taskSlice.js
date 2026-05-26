import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskDetails: JSON.parse(localStorage.getItem('taskData')) || [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {
    addTask: (state, action) => {
      state.taskDetails.push(action.payload);

      localStorage.setItem(
        'taskData',
        JSON.stringify(state.taskDetails)
      );
    },

    updateTask: (state, action) => {
      state.taskDetails = state.taskDetails.map((task) =>
        task.id === action.payload.id
          ? action.payload
          : task
      );

      localStorage.setItem(
        'taskData',
        JSON.stringify(state.taskDetails)
      );
    },

    deleteTask: (state, action) => {
      state.taskDetails = state.taskDetails.filter(
        (task) => task.id !== action.payload
      );

      localStorage.setItem(
        'taskData',
        JSON.stringify(state.taskDetails)
      );
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;