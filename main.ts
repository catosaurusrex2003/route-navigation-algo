import coordinates from "./assets/data.json";
import { makeDesmosString } from "./helpers/makeDesmosString";
import { filterCoordinatesBasedOnAngle } from "./logic/filterCoordinatesBasedOnAngle";
import { filterCoordinatesBasedOnSlope } from "./logic/filterCoordinatesBasedOnSlope";

console.log(`original array length : ${coordinates.length}`);
// const filteredCoordinates = filterCoordinatesBasedOnSlope(coordinates);
const filteredCoordinates = filterCoordinatesBasedOnAngle(coordinates);
console.log(`filtered arrayy length : ${filteredCoordinates.length}`);

const meow1 = makeDesmosString(coordinates);
console.log(meow1, "\n\n\n\n\n\n\n");
const meow2 = makeDesmosString(filteredCoordinates);
console.log(meow2);
