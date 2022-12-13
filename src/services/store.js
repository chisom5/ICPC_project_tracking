import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

// reducers
import forgotPasswordReducer from "./forgetPassword/forgotPasswordSlice";
// import globalReducer from './globalReduxFunction/globalSlice';
import themeReducer from "../theme/themeSlice";
// import homeReducer from "../containers/Landing/reduxFunction/LandingSlice";
// import introLetterReducer from "../containers/IntroductionLetter/reduxFunction/introLetterSlice";
// import RequestReferenceReducer from "../containers/RequestReference/reduxFunction/requestReferenceSlice";
// import TrackRequestReducerReducer from '../containers/TrackRequest/reduxFunction/trackRequestSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  forgetP: forgotPasswordReducer,
//   global: globalReducer,
//   "auth": authReducer,
//   home: homeReducer,
//   introLetter: introLetterReducer,
//   reference: RequestReferenceReducer,
//   track: TrackRequestReducerReducer
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
