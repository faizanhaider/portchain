import { Reducer } from "redux";
import { VesselActionTypes, VesselState } from "./types";
import calculatePortCallDelayStats from "../../containers/Vessels/calculatePortCallDelayStats";
import {
  PortCallDelaysForVessels,
  PorCallDelaysPercentilePointsForVessels,
} from "../../config";

export const initialState: VesselState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<VesselState> = (state = initialState, action) => {
  switch (action.type) {
    case VesselActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case VesselActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case VesselActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case VesselActionTypes.FETCH_SCHEDULE_REQUEST: {
      return { ...state, loading: true };
    }
    case VesselActionTypes.FETCH_SCHEDULE_SUCCESS: {
      const { data } = state;
      const {
        payload: { vessel, portCalls },
      } = action;
      const vesselIndex = data.findIndex((item) => item.imo === vessel.imo);
      data[vesselIndex].portCalls = portCalls;
      data[vesselIndex].portCallDelayStats = calculatePortCallDelayStats(
        portCalls,
        PortCallDelaysForVessels,
        PorCallDelaysPercentilePointsForVessels
      );

      return { ...Object.assign(state, data), loading: false };
    }
    default: {
      return state;
    }
  }
};

export { reducer as VesselReducer };
