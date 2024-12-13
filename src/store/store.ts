import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { searchReducer } from "./features/searchSlice";
import { itineryReducer } from "./features/itinerySlice";
import { hotelReducer } from "./features/hotelSlice";
import { cityReducer } from "./features/citySlice";
import { poiReducer } from "./features/poiSlice";
import { useDispatch, useSelector, useStore } from "react-redux";

type AppDispatch = typeof store.dispatch;
type AppStore = typeof store;

const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        itinery: itineryReducer,
        hotel: hotelReducer,
        city: cityReducer,
        poi: poiReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
