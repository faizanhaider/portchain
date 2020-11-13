import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest, fetchScheduleRequest } from "../../store/vessel/action";
import { ApplicationState } from "../../store/index";

import generatePortsWithTotalPortCalls from "../../utils/generatePortsWithTotalPortCalls";

const vesselState = (state: ApplicationState) => state.vessels;

function Vessels() {
  const dispatch = useDispatch();
  const { data } = useSelector(vesselState);
  const vesselsImo: string[] = data.map((item) => item.imo);

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    if (vesselsImo.length) {
      vesselsImo.forEach((imo) => dispatch(fetchScheduleRequest(imo)));
    }
  }, [...vesselsImo, dispatch]);

  const ports = generatePortsWithTotalPortCalls(data);

  return (
    <>
      <ul>
        {data.map((vessel) => (
          <li>{vessel.name}</li>
        ))}
      </ul>
      <table>
        <thead>
          <th>Name</th>
          <th>Code</th>
          <th>Port Calls</th>
          <th>Port Calls Durations</th>
        </thead>
        <tbody>
          {ports.map((port) => {
            return (
              <tr>
                <td>{port.name}</td>
                <td>{port.id}</td>
                <td>{port.totalPortCalls}</td>
                <td>
                  {port.portCallDurationsPercentile &&
                    Object.entries<number>(
                      port.portCallDurationsPercentile
                    ).map(
                      ([key, value], index) => `${key}: ${value}-----------`
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Vessels;
