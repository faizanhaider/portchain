import { PortCall, PortCallDelayDayStats } from "../../store/vessel/types";
import calculatePercentile from "../../utils/calculatePercentile";

import sortBy from "lodash/sortBy";

export default function calculateVesselPortCallDelayStats(
  portCalls: PortCall[],
  daysPoints: number[],
  percentilePoints: number[]
) {
  const portCallDelays: Array<{ [K in number]: number }> = [];

  portCalls
    .filter((portCall) => !portCall.isOmitted)
    .forEach(({ arrival, logEntries }) => {
      const actualArrival = new Date(arrival);
      const forecastArrivals = logEntries.filter(
        (entry) => entry.updatedField === "arrival"
      );
      const sortedForecastArrivals = sortBy(
        forecastArrivals,
        (forecast) => new Date(forecast.createdDate),
        "desc"
      );

      const daysPointsObject = daysPoints.reduce<{ [K in number]: number }>(
        (obj, key) => ({ ...obj, [key]: 0 }),
        {}
      );

      sortedForecastArrivals.forEach((forecast) => {
        const { createdDate, arrival } = forecast;
        const forecastDate = new Date(createdDate);
        const arrivalDate = arrival ? new Date(arrival) : new Date();

        const forecastCreatedDay =
          (actualArrival.getTime() - forecastDate.getTime()) /
          (1000 * 3600 * 24);

        const calculateHoursDiff =
          Math.abs(actualArrival.getTime() - arrivalDate.getTime()) /
          (1000 * 3600);

        Object.entries(daysPointsObject).forEach(([days, value]) => {
          if (forecastCreatedDay <= Number(days)) {
            return;
          }
          daysPointsObject[Number(days)] = calculateHoursDiff;
        });
      });

      portCallDelays.push(daysPointsObject);
    });

  const daysPointsPercentile = daysPoints.reduce<Array<PortCallDelayDayStats>>(
    (acc, daysPoint) => {
      acc.push({
        daysPoint,
        percentiles: calculatePercentile(
          portCallDelays.map((delays) => delays[daysPoint]),
          percentilePoints
        ),
      });
      return acc;
    },
    []
  );

  return daysPointsPercentile;
}
