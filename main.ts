import mongoose from "mongoose";
import coordinates from "./assets/str1.json";
import { makeDesmosString } from "./helpers/makeDesmosString";
import { filterCoordinatesBasedOnAngle } from "./logic/filterCoordinatesBasedOnAngle";
import { filterCoordinatesBasedOnSlope } from "./logic/filterCoordinatesBasedOnSlope";
import { getBoundingBoxArray } from "./logic/getBoundingBoxes";
import "dotenv/config";
import { queryPotholesInBoundingBoxArray } from "./workers/queryDatabase";

(async () => {
  await mongoose.connect(process.env.MONGOURI as string);
  console.time("main");

  // console.log(`original array length : ${coordinates.length}`);

  // const filteredCoordinates = filterCoordinatesBasedOnAngle(coordinates);
  // console.log(`filtered arrayy length : ${filteredCoordinates.length}`);

  // console.log(makeDesmosString(coordinates));
  // console.log("\n\n\n");
  // console.log(makeDesmosString(filteredCoordinates));

  // const boundingBoxArray = getBoundingBoxArray(filteredCoordinates);
  // console.log(`Bounding Box array is `, boundingBoxArray.length);

  const tempBoundingBoxArray = [
    {
      latitudeMin: 0,
      latitudeMax: 100,
      longitudeMin: 0,
      longitudeMax: 100,
    },
  ];

  const queryResult = await queryPotholesInBoundingBoxArray(
    tempBoundingBoxArray
  );
  console.log(queryResult);

  // const meow1 = makeDesmosString(coordinates);
  // console.log(meow1, "\n\n\n\n\n\n\n");
  // const meow2 = makeDesmosString(filteredCoordinates);
  // console.log(meow2);

  console.timeEnd("main");
  return;
})();
