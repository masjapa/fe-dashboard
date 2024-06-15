import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  originalData: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      return {
        ...state,
        data: action.payload,
        originalData: action.payload,
      };
    },
    addData: (state, action) => {
      const newData = [...state.data, action.payload];
      return {
        ...state,
        data: newData,
        originalData: newData, 
      };
    },
    removeData: (state, action) => {
      const newData = state.data.filter(item => !action.payload.includes(item.id));
      return {
        ...state,
        data: newData,
        originalData: newData,
      };
    },
    searchByName: (state, action) => {
      const searchTerm = action.payload.trim().toLowerCase();
      if (searchTerm === '') {
        return {
          ...state,
          data: state.originalData,
        };
      } else {
        return {
          ...state,
          data: state.originalData.filter(item => item.name.toLowerCase().includes(searchTerm)),
        };
      }
    },
  },
});

export const { setData, addData, removeData, searchByName } = dataSlice.actions;
export default dataSlice.reducer;
