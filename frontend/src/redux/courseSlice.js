import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null,
  },
  reducers: {
    setCourse: (state, actions) => {
      state.course = actions.payload;
    },
  },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;
