import { coordinateType } from "../types";

const threshold = 10;

export function filterCoordinatesBasedOnAngle(coordinates: coordinateType[]) {
  const result = [];
  let prevAngle = null;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const slope =
      (coordinates[i + 1].latitude - coordinates[i].latitude) /
      (coordinates[i + 1].longitude - coordinates[i].longitude);
    const angle = Math.atan(slope) * (180 / Math.PI);

    if (prevAngle === null || Math.abs(angle - prevAngle) > threshold) {
      result.push(coordinates[i]);
    }

    prevAngle = angle;
  }

  // Add the last coordinate
  result.push(coordinates[coordinates.length - 1]);

  return result;
}
