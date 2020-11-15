import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest, fetchScheduleRequest } from "../../store/vessel/action";
import { ApplicationState } from "../../store/index";
import generatePortsWithTotalPortCalls from "./generatePortsWithPortCallsStats";

import PortsDataTable from "../../components/PortsDataTable";
import VesselDataTable from "../../components/VesselDataTable";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import orderBy from "lodash/orderBy";

const vesselState = (state: ApplicationState) => state.vessels;

function Vessels() {
  const dispatch = useDispatch();
  const { data } = useSelector(vesselState);
  const { totalApiCalls } = useSelector(vesselState);
  const vesselsImo: string[] = data.map((item) => item.imo);

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    if (vesselsImo.length) {
      vesselsImo.forEach((imo) => dispatch(fetchScheduleRequest(imo)));
    }
    // eslint-disable-next-line
  }, [...vesselsImo, dispatch]);

  const ports = generatePortsWithTotalPortCalls(data);

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h6">TOP 5 ports by Most Arrivals</Typography>
        {ports && totalApiCalls === 0 && (
          <PortsDataTable
            rows={orderBy(ports, ["totalPortCalls"], ["desc"]).slice(0, 5)}
          />
        )}
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h6">TOP 5 ports by Least Arrivals</Typography>
        {ports && totalApiCalls === 0 && (
          <PortsDataTable
            rows={orderBy(ports, ["totalPortCalls"], ["asc"]).slice(0, 5)}
          />
        )}
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h6">
          Ports including Port Call Duration Percentiles
        </Typography>
        {ports && totalApiCalls === 0 && (
          <PortsDataTable rows={ports} showPercentiles={true} />
        )}
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h6">
          Vessels with expandable rows for Delay Days Percentiles
        </Typography>
        {data && totalApiCalls === 0 && <VesselDataTable rows={data} />}
      </Container>
    </>
  );
}

export default Vessels;
