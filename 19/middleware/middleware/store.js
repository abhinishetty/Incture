import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk";

import userReducer from "./useReducer";
export const store=createStore(userReducer,applyMiddleware(thunk));