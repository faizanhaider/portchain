import { Vessel, Port, PortCall } from "../store/vessel/types";
import calculatePercentile from "./calculatePercentile";
import sortBy from "lodash/sortBy";

export default function generatePortsWithPortCalls(vessels: Vessel[]): Port[] {
  const portCallsList = vessels.reduce<PortCall[]>((acc, vessel) => {
    if (vessel.PortCalls) {
      return acc.concat(vessel.PortCalls);
    }

    return acc;
  }, []);

  const portsList = portCallsList.reduce<Port[]>((ports, portCall) => {
    const {
      port: { id, name },
      isOmitted,
      arrival,
      departure,
    } = portCall;

    const existingPortIndex = ports.findIndex((port) => port.id === id);

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const portCallDuration =
      (departureDate.getTime() - arrivalDate.getTime()) / (1000 * 3600);

    if (existingPortIndex === -1) {
      ports.push({
        id,
        name,
        totalPortCalls: isOmitted ? 0 : 1,
        portCallDurations: isOmitted ? [] : [portCallDuration],
      });
    } else if (!isOmitted) {
      ports[existingPortIndex].totalPortCalls++;
      ports[existingPortIndex].portCallDurations.push(portCallDuration);
    }

    return ports;
  }, []);

  portsList.forEach(
    (port) =>
      (port.portCallDurationsPercentile = calculatePercentile(
        sortBy(port.portCallDurations),
        [5, 20, 50, 75, 90]
      ))
  );

  return portsList;
}
