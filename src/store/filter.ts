import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../components/filter/filterSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
  },
});
