import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../slice/filterSlice'
import sortReducer from '../slice/sortSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
  },
});
