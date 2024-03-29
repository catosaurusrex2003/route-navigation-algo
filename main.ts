// import { coordinateType } from "./types";
import coordinates from "./assets/data.json";
// import { makeJson } from "./helpers/makejson";
import { makeDesmosString } from "./helpers/makeDesmosString";
import { filterCoordinatesBasedOnSlope } from "./logic/filterCoordinatesBasedOnSlope";

console.log(`original array length : ${coordinates.length}`);
const filteredCoordinates = filterCoordinatesBasedOnSlope(coordinates);
console.log(`filtered arrayy length : ${filteredCoordinates.length}`);
// makeJson(filterCoordinates, "filtered");
console.log(filteredCoordinates);

const meow1 = makeDesmosString(coordinates);
console.log(meow1,"\n\n\n\n\n\n\n");
const meow2 = makeDesmosString(filteredCoordinates);
console.log(meow2);
