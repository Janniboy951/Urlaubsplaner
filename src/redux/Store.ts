import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import todoListReducer from "@/redux/Reducers";

const rootReducer = combineReducers({ todoListReducer });

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

export const Store = createStore(persistedReducer);

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof rootReducer>;
