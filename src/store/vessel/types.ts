export interface Vessel {
  imo: string;
  name: string;
  PortCalls: PortCall[];
}

export interface Port {
  id: string;
  name: string;
  totalPortCalls: number;
  portCallDurations: number[];
  portCallDurationsPercentile?: { [K in number]: number };
}

type PortCallDateType = Date | null;

type updatableFields = {
  arrival: PortCallDateType;
  departure: PortCallDateType;
  createdDate: Date;
  isOmitted: boolean;
};

type PortCallLogEntry = {
  updateField: keyof updatableFields;
} & updatableFields;

export type PortCall = {
  port: Port;
  service: string;
} & Omit<updatableFields, "arrival" | "departure"> & {
    arrival: Date;
    departure: Date;
  } & {
    logEntries: PortCallLogEntry[];
  };

export type VesselSchedule = { vessel: Vessel; portCalls: PortCall[] };

export enum VesselActionTypes {
  FETCH_REQUEST = "@@vessel/FETCH_REQUEST",
  FETCH_SUCCESS = "@@vessel/FETCH_SUCCESS",
  FETCH_ERROR = "@@vessel/FETCH_ERROR",
  FETCH_SCHEDULE_REQUEST = "@@vessel/FETCH_SCHEDULE_REQUEST",
  FETCH_SCHEDULE_SUCCESS = "@@vessel/FETCH_SCHEDULE_SUCCESS",
}

export interface VesselState {
  readonly loading: boolean;
  readonly data: Vessel[];
  readonly errors?: string;
}
