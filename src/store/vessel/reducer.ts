import { Reducer } from "redux";
import { VesselActionTypes, VesselState } from "./types";

export const initialState: VesselState = {
  vessels: [],
  errors: undefined,
  loading: false
};

const reducer: Reducer<VesselState> = (state = initialState, action) => {
  switch (action.type) {
    case VesselActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case VesselActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, vessels: action.payload };
    }
    case VesselActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as VesselReducer };
