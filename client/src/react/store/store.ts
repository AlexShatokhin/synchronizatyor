import { configureStore } from "@reduxjs/toolkit";
import NavigationMenu from "../modules/NavigationMenu/slice/NavigationMenuSlice"
import userData from "../slice/userSlice"
import logSlice from "../modules/Logs/slice/logSlice"
import synchronizationSlice from "../modules/Synchronization/slice/synchronizationSlice"

const store = configureStore({
    reducer: {
      NavigationMenu,
      userData,
      logSlice,
      synchronizationSlice
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;