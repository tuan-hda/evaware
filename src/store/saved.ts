import { configureStore } from "@reduxjs/toolkit";
import savedItemReducer from '../slice/saveItemSlice'


export default configureStore({
  reducer: {
    savedItem: savedItemReducer
  },
});
