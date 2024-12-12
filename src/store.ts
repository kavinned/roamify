import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";
import { searchReducer } from "./reducers/searchSlice";
import { itineryReducer } from "./reducers/itinerySlice";
import { hotelReducer } from "./reducers/hotelSlice";
import { cityReducer } from "./reducers/citySlice";
import { poiReducer } from "./reducers/poiSlice";

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
