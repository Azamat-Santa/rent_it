import { combineReducers, configureStore } from "@reduxjs/toolkit";
import   authSlice   from "./reducers/user";
import { authUser } from '../core/api/userAuth'
import { useDispatch } from "react-redux";
import { userApi } from '../core/api/userApi';
import { adApi } from "../core/api/ad";
import { category } from '../core/api/categories';
import adSlice from "./reducers/adSlice";
import { reviewApi } from '../core/api/review';
import uiSlice from './reducers/ui';
import { bookingApi } from '../core/api/booking';
import { techSupportApi } from '../core/api/techSupport';
import techSupportSlice from './reducers/techSupport';
import { chatApi } from '../core/api/chat';
import { statistickApi } from "../core/api/statistick";


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
