import { configureStore } from "@reduxjs/toolkit";
import {routesReducer} from './slices/route'
import {authReducer} from './slices/auth'
import {reviewReducer} from './slices/review'
const store = configureStore({
    reducer: {
        routes: routesReducer,
        auth: authReducer,
        reviews: reviewReducer,
    }
})
export default store