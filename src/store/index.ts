import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer:{
        todos:todosSlice,
        modal:modalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




export default store;