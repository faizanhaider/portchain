export interface Vessel {
  imo: number;
  name: string;
}

export enum VesselActionTypes {
  FETCH_REQUEST = "@@vessel/FETCH_REQUEST",
  FETCH_SUCCESS = "@@vessel/FETCH_SUCCESS",
  FETCH_ERROR = "@@vessel/FETCH_ERROR"
}

export interface VesselState {
  readonly loading: boolean;
  readonly vessels: Vessel[];
  readonly errors?: string;
}
