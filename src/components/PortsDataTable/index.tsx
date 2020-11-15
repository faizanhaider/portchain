import React from "react";
import {
  DataGrid,
  ColDef,
  RowsProp,
  ValueFormatterParams,
} from "@material-ui/data-grid";
import isEqual from "lodash/isEqual";

const columns: ColDef[] = [
  { field: "id", headerName: "Port Code", width: 100 },
  { field: "name", headerName: "Port Name", width: 130 },
  { field: "totalPortCalls", headerName: "Port Calls", width: 100 },
];

const percentileColumns: ColDef[] = columns.concat([
  {
    field: "portCallDurationsPercentile",
    headerName: "Port Call Duration Percentiles",
    renderCell: ({ value }: ValueFormatterParams) => (
      <>
        {Object.entries(value as { [k: number]: number }).map(
          ([key, value], index) => {
            return (
              <>
                <strong>{` ${key}th:`}</strong>
                {`${value} Hrs,`}
              </>
            );
          }
        )}
      </>
    ),
    width: 1000,
  },
]);

interface Props {
  rows: RowsProp;
  showPercentiles?: boolean;
}

const PortsDataTable: React.FC<Props> = ({ rows, showPercentiles = false }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={showPercentiles ? percentileColumns : columns}
      />
    </div>
  );
};

export default React.memo(PortsDataTable, isEqual);
