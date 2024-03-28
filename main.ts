import { coordinateType } from "./types";
import coordinates from "./assets/data.json";
import { makeJson } from "./helpers/makejson";
import { makeDesmosString } from "./helpers/makeDesmosString";

const confidence = 0.5;

function filterCoordinates(coords: coordinateType[]) {
  let filteredCoords = [coords[0]]; // Start with the first coordinate
  let prevSlope = null;

  for (let i = 1; i < coords.length; i++) {
    const currentSlope = calculateSlope(
      filteredCoords[filteredCoords.length - 1],
      coords[i]
    );

    if (prevSlope === null || Math.abs(prevSlope - currentSlope) > confidence) {
      filteredCoords.push(coords[i]); // Add the current coordinate
    }

    prevSlope = currentSlope;
  }

  return filteredCoords;
}

function calculateSlope(point1: coordinateType, point2: coordinateType) {
  return (
    (point2.latitude - point1.latitude) / (point2.longitude - point1.longitude)
  );
}

console.log(`original array length : ${coordinates.length}`);
const filteredCoordinates = filterCoordinates(coordinates);
console.log(`filtered arrayy length : ${filteredCoordinates.length}`);
// makeJson(filterCoordinates, "filtered");
console.log(filteredCoordinates);

const meow = makeDesmosString(filteredCoordinates);
console.log(meow);
