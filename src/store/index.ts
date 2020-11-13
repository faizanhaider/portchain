import { combineReducers } from "redux";
import { spawn } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import VesselSaga from "./vessel/saga";
import { VesselReducer } from "./vessel/reducer";
import { VesselState } from "./vessel/types";

export interface ApplicationState {
  vessels: VesselState;
}

export const rootSaga = function* rootSaga() {
  yield spawn(VesselSaga);
};

export const createRootReducer = (history: History) =>
  combineReducers({
    vessels: VesselReducer,
    router: connectRouter(history),
  });
