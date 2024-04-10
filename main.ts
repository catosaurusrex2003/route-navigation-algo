import mongoose from "mongoose";
import coordinates from "./assets/data.json";
import { makeDesmosString } from "./helpers/makeDesmosString";
import { filterCoordinatesBasedOnAngle } from "./logic/filterCoordinatesBasedOnAngle";
import { filterCoordinatesBasedOnSlope } from "./logic/filterCoordinatesBasedOnSlope";
import { getBoundingBoxArray } from "./logic/getBoundingBoxes";
import "dotenv/config";
import { queryPotholesInBoundingBoxArray } from "./workers/queryDatabase";

mongoose.connect(
  process.env.MONGOURI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions
);

(async () => {
  console.time("main");

  console.log(`original array length : ${coordinates.length}`);

  const filteredCoordinates = filterCoordinatesBasedOnAngle(coordinates);
  console.log(`filtered arrayy length : ${filteredCoordinates.length}`);
  //   console.log(filteredCoordinates);

  const boundingBoxArray = getBoundingBoxArray(filteredCoordinates);
  console.log(`Bounding Box array is `, boundingBoxArray);
  //   console.log(boundingBoxArray);

  const queryResult = await queryPotholesInBoundingBoxArray(boundingBoxArray);
  console.log(queryResult);

  // const meow1 = makeDesmosString(coordinates);
  // console.log(meow1, "\n\n\n\n\n\n\n");
  // const meow2 = makeDesmosString(filteredCoordinates);
  // console.log(meow2);

  console.timeEnd("main");
})();
