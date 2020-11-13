import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest, fetchScheduleRequest } from "../../store/vessel/action";
import { ApplicationState } from "../../store/index";

const vesselState = (state: ApplicationState) => state.vessels;

function Vessels() {
  const dispatch = useDispatch();
  const vessels = useSelector(vesselState);
  const vesselsImo: string[] = vessels.data.map((item) => item.imo);

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    if (vesselsImo.length) {
      vesselsImo.forEach((imo) => dispatch(fetchScheduleRequest(imo)));
    }
  }, [...vesselsImo, dispatch]);

  return (
    <ul>
      {vessels.data.map((vessel) => (
        <li>{vessel.name}</li>
      ))}
    </ul>
  );
}

export default Vessels;
