import sortBy from "lodash/sortBy";

function calculatePercentile(values: number[], percentile: number) {
  if (values.length === 0) return 0;

  const rank = (percentile / 100) * values.length;
  if (rank > values.length - 1) return values[values.length - 1];
  if (rank < 0) return values[0];

  if (Number.isInteger(rank)) return (values[rank - 1] + values[rank]) / 2;

  return values[Math.ceil(rank)];
}

export default function percentiles(
  values: number[],
  percentilePoints: number[]
) {
  const sortedValues = sortBy(values);
  return percentilePoints
    .map((percentilePoint) =>
      calculatePercentile(sortedValues, percentilePoint)
    )
    .reduce<{ [K in number]: number }>((result, value, index) => {
      result[percentilePoints[index]] = Number.parseFloat(value.toFixed(2));

      return result;
    }, {});
}
