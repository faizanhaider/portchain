import { action } from "typesafe-actions";
import { VesselActionTypes, Vessel } from "./types";

export const fetchRequest = () => action(VesselActionTypes.FETCH_REQUEST);

export const fetchSuccess = (data: Vessel[]) =>
  action(VesselActionTypes.FETCH_SUCCESS, data);

export const fetchError = (message: string) =>
  action(VesselActionTypes.FETCH_ERROR, message);
