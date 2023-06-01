import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../components/filter/filterSlice'
import sortReducer from '../components/modal/sortSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
  },
});
