import { coordinateType } from "../types";

const slopeConfidence = 0.1;

function calculateSlope(point1: coordinateType, point2: coordinateType) {
  return (
    (point2.latitude - point1.latitude) / (point2.longitude - point1.longitude)
  );
}

export const filterCoordinatesBasedOnSlope = (coords: coordinateType[]) => {
  let filteredCoords = [coords[0]]; // Start with the first coordinate
  let prevSlope = null;

  for (let i = 1; i < coords.length; i++) {
    console.log(i);
    const currentSlope = calculateSlope(
      filteredCoords[filteredCoords.length - 1],
      coords[i]
    );

    if (
      prevSlope === null ||
      Math.abs(prevSlope - currentSlope) > slopeConfidence
    ) {
      filteredCoords.push(coords[i]); // Add the current coordinate
    }

    prevSlope = currentSlope;
  }

  return filteredCoords;
};
