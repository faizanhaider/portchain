import { Vessel, Port, PortCall } from "../store/vessel/types";

export default function generatePortsWithTotalPortCalls(
  vessels: Vessel[]
): Port[] {
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
    } = portCall;

    const existingPortIndex = ports.findIndex((port) => port.id === id);

    if (existingPortIndex === -1) {
      ports.push({
        id,
        name,
        totalPortCalls: isOmitted ? 0 : 1,
      });
    } else if (!isOmitted) {
      ports[existingPortIndex].totalPortCalls++;
    }

    return ports;
  }, []);

  return portsList;
}
