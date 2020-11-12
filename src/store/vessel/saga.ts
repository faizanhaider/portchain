import { all, fork, put, takeEvery } from "redux-saga/effects";
import { VesselActionTypes } from "./types";
import { fetchError, fetchSuccess } from "./action";
import inventory from "./mockdata";

function* handleFetch() {
  try {
    //this is a mock data.. replace this with real api
    const data = inventory;
    yield put(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("An unknown error occurred."));
    }
  }
}
function* watchFetchRequest() {
  yield takeEvery(VesselActionTypes.FETCH_REQUEST, handleFetch);
}
function* VesselSaga() {
  yield all([fork(watchFetchRequest)]);
}
export default VesselSaga;