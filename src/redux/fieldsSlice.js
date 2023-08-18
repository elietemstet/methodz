import { createSlice } from "@reduxjs/toolkit";

const fieldsSlice = createSlice({
  name: "fields",
  initialState: [],
  reducers: {
    addField: (state, action) => {
      state.push({
        id: state.length + 1,
        fieldName: action.payload.fieldName,
        fieldType: action.payload.fieldType,
        offsetFrom: action.payload.offsetFrom,
        offsetTo: action.payload.offsetTo,
        description: action.payload.description,
        arraySize: action.payload.arraySize, 
      });
    },
    setFields: (state, action) => {
      return action.payload;
    },
  },
});

export const { addField, setFields } = fieldsSlice.actions;
export default fieldsSlice.reducer;
