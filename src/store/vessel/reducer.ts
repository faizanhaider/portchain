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
  totalApiCalls: 0,
};

const reducer: Reducer<VesselState> = (state = initialState, action) => {
  switch (action.type) {
    case VesselActionTypes.FETCH_REQUEST: {
      return { ...state, totalApiCalls: state.totalApiCalls + 1 };
    }
    case VesselActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        totalApiCalls: state.totalApiCalls - 1,
        data: action.payload,
      };
    }
    case VesselActionTypes.FETCH_ERROR: {
      return {
        ...state,
        totalApiCalls: state.totalApiCalls - 1,
        errors: action.payload,
      };
    }
    case VesselActionTypes.FETCH_SCHEDULE_REQUEST: {
      return { ...state, totalApiCalls: state.totalApiCalls + 1 };
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

      return {
        ...Object.assign(state, data),
        totalApiCalls: state.totalApiCalls - 1,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as VesselReducer };
