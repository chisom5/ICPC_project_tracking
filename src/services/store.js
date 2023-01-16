import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

// reducers
import forgotPasswordReducer from "./forgetPassword/forgotPasswordSlice";
import globalReducer from "./global/globalSlice";
import budgetRedcer from "./budgetPage/budgetSlice";
import contractsReducer from "./contracts/contractsSlice";
import projectSelectionReducer from './projectSelection/projectSelectionSlice';
import projectsReducer from './projects/projectsSlice'
import themeReducer from "../theme/themeSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  forgetP: forgotPasswordReducer,
  global: globalReducer,
  budget: budgetRedcer,
  contract: contractsReducer,
  projectSelection: projectSelectionReducer,
  projects: projectsReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
  whitelist: ["auth"], //whitelist means only auth will be persisted.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk],
});

export const persistor = persistStore(store);
