import { Vessel, Port, PortCall } from "../../store/vessel/types";
import calculatePercentiles from "../../utils/calculatePercentiles";
import { PortCallDurationPercentilePointsFortPorts } from "../../config";

export default function generatePortsWithPortCallsStats(
  vessels: Vessel[]
): Port[] {
  const portCallsList = vessels.reduce<PortCall[]>((acc, vessel) => {
    if (vessel.portCalls) {
      return acc.concat(vessel.portCalls);
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
        portCallDurationsPercentile: {},
      });
    } else if (!isOmitted) {
      ports[existingPortIndex].totalPortCalls++;
      ports[existingPortIndex].portCallDurations.push(portCallDuration);
    }

    return ports;
  }, []);

  portsList.forEach(
    (port) =>
      (port.portCallDurationsPercentile = calculatePercentiles(
        port.portCallDurations,
        PortCallDurationPercentilePointsFortPorts
      ))
  );

  return portsList;
}
