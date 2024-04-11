import mongoose from "mongoose";
import coordinates from "./assets/str1.json";
import { makeDesmosString } from "./helpers/makeDesmosString";
import { filterCoordinatesBasedOnAngle } from "./logic/filterCoordinatesBasedOnAngle";
import { filterCoordinatesBasedOnSlope } from "./logic/filterCoordinatesBasedOnSlope";
import { getBoundingBoxArray } from "./logic/getBoundingBoxes";
import "dotenv/config";
import {
  queryPotholesInBoundingBox,
  queryPotholesInBoundingBoxArray,
} from "./workers/queryDatabase";

(async () => {
  await mongoose.connect(process.env.MONGOURI as string);
  console.time("main");

  console.log(`original array length : ${coordinates.length}`);

  const filteredCoordinates = filterCoordinatesBasedOnAngle(coordinates);
  console.log(`filtered arrayy length : ${filteredCoordinates.length}`);

  console.log(makeDesmosString(coordinates));
  console.log("\n\n\n");
  console.log(makeDesmosString(filteredCoordinates));

  const boundingBoxArray = getBoundingBoxArray(filteredCoordinates);
  console.log(`Bounding Box array is `, boundingBoxArray.length);

  const queryResult = await queryPotholesInBoundingBoxArray(boundingBoxArray);
  console.log(queryResult);
  console.log(` length : ${queryResult?.length} `);

  // const meow1 = makeDesmosString(coordinates);
  // console.log(meow1, "\n\n\n\n\n\n\n");

  console.timeEnd("main");
  mongoose.disconnect();
})();
