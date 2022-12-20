import { combineReducers, configureStore } from "@reduxjs/toolkit";
import   authSlice   from "./reducers/user";
import { authUser } from '../api/userAuth'
import { useDispatch } from "react-redux";
import { userApi } from '../api/userApi';
import { adApi } from "../api/ad";
import { category } from './../api/categories';
import adSlice from "./reducers/adSlice";
import { reviewApi } from './../api/review';
import uiSlice from './reducers/ui';
import { bookingApi } from './../api/booking';
import { techSupportApi } from './../api/techSupport';
import techSupportSlice from './reducers/techSupport';
import { chatApi } from './../api/chat';
import { statistickApi } from "../api/statistick";


const rootReducer = combineReducers({
        [authUser.reducerPath]:authUser.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [adApi.reducerPath]:adApi.reducer,
        [category.reducerPath]:category.reducer,
        [reviewApi.reducerPath]:reviewApi.reducer,
        [bookingApi.reducerPath]:bookingApi.reducer,
        [techSupportApi.reducerPath]:techSupportApi.reducer,
        [chatApi.reducerPath]:chatApi.reducer,
        [statistickApi.reducerPath]:statistickApi.reducer,
        user: authSlice,
        ad: adSlice,
        uiSlice:uiSlice,
        techSupportSlice:techSupportSlice
})

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        authUser.middleware,
        userApi.middleware,
        adApi.middleware,
        category.middleware,
        reviewApi.middleware,
        bookingApi.middleware,
        techSupportApi.middleware,
        chatApi.middleware,
        statistickApi.middleware
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
