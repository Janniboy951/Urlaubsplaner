import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import todoListReducer from "@/redux/reducers/TodoListReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ todoListReducer });

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootReducerState, any>(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);

export type RootReducerState = ReturnType<typeof rootReducer>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
