import { configureStore } from "@reduxjs/toolkit";
import CustomizerReducer from "./customizer/CustomizerSlice";
import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
import { combineReducers } from "redux";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import WidgetReducer from './widgets/WidgetSlice';
import TransactionsReducer from './transactions/TransactionsSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    userpostsReducer: UserProfileReducer,
    widgets: WidgetReducer,
    transactions: TransactionsReducer
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  userpostsReducer: UserProfileReducer,
  widgets: WidgetReducer,
  transactions: TransactionsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
