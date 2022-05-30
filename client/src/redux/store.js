import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  anuncioReducer,
  cursoReducer,
  materiaReducer,
  profesorReducer,
  claseReducer,
  provincesReducer,
  citiesReducer,
} from "./reducers";
import auth from "./auth";
import message from "./message";

export default createStore(
  combineReducers({
    anuncioReducer,
    cursoReducer,
    materiaReducer,
    profesorReducer,
    claseReducer,
    auth,
    message,
    provincesReducer,
    citiesReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
