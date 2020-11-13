import { all, fork, put, takeEvery } from "redux-saga/effects";
import { VesselActionTypes } from "./types";
import { fetchError, fetchSuccess, fetchScheduleSuccess } from "./action";

function* handleVesselsFetch() {
  try {
    const url =
      "https://import-coding-challenge-api.portchain.com/api/v2/vessels";
    const result = yield fetch(url).then((response) => response.json());
    yield put(fetchSuccess(result));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("An unknown error occurred."));
    }
  }
}

function* handleVesselScheduleFetch(action: { payload: string; type: string }) {
  try {
    const url = `https://import-coding-challenge-api.portchain.com/api/v2/schedule/${action.payload}`;
    const result = yield fetch(url).then((response) => response.json());
    yield put(fetchScheduleSuccess(result));
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("An unknown error occurred."));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(VesselActionTypes.FETCH_REQUEST, handleVesselsFetch);
  yield takeEvery(
    VesselActionTypes.FETCH_SCHEDULE_REQUEST,
    handleVesselScheduleFetch
  );
}
function* VesselSaga() {
  yield all([fork(watchFetchRequest)]);
}
export default VesselSaga;
