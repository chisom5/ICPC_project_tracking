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
import projectSelectionReducer from "./projectSelection/projectSelectionSlice";
import projectsReducer from "./projects/projectsSlice";
import userReducer from "./users/usersSlice";
import themeReducer from "../theme/themeSlice";
import metaDataReducer from './metaData/metaDataSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  metaData: metaDataReducer,
  forgetP: forgotPasswordReducer,
  global: globalReducer,
  budget: budgetRedcer,
  contract: contractsReducer,
  projectSelection: projectSelectionReducer,
  projects: projectsReducer,
  users: userReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
  whitelist: ["global", "forgetP"], //whitelist means only auth and forgetP will be persisted.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk],
});

export const persistor = persistStore(store);
