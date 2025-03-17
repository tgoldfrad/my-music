import { combineSlices, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import filesSlice from "./filesSlice";
import conversionsSlice from "./conversionSlice";
import userSlice from "./userSlice";



const store = configureStore({
    reducer: combineSlices(usersSlice,filesSlice,conversionsSlice,userSlice),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;