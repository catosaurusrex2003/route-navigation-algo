import mongoose from "mongoose";
import coordinates from "./assets/str1.json";
import { makeDesmosString } from "./helpers/makeDesmosString";
import { filterCoordinatesBasedOnAngle } from "./logic/filterCoordinatesBasedOnAngle";
import { filterCoordinatesBasedOnSlope } from "./logic/filterCoordinatesBasedOnSlope";
import { getBoundingBoxArray } from "./logic/getBoundingBoxes";
import "dotenv/config";
import { queryPotholesInBoundingBoxArray } from "./workers/queryDatabase";
import { getRoute } from "./workers/getRoute";
import { decodePolyline } from "./logic/decodePolyline";
import { coordinateType } from "./types";

(async () => {
  await mongoose.connect(process.env.MONGOURI as string);
  console.time("main");

  const routeObj = await getRoute(
    "Hatkeshwar Temple, GCC Club Road, Shanti Vidya Nagari, Phase 3, Gaurav Sankalp, Mira Road East, Mira Bhayandar, Maharashtra, India",
    "Dara's Dhaba, National Highway 8, Kashimira, Mira Road East, Mira Bhayandar, Maharashtra, India"
  );

  // console.log(routeObj);

  const masterCoordinatesArray: {
    polyline: string;
    coordinatesArray: coordinateType[];
  }[] = routeObj?.allRoutes.map(
    (eachRouteObj: { polyline: string; waypoints: any[] }) => {
      const sus = decodePolyline(eachRouteObj.polyline);
      return { polyline: eachRouteObj.polyline, coordinatesArray: sus };
    }
  );

  const allRoutesCalculation = await Promise.all(
    masterCoordinatesArray.map(async (coordinatesObj, index) => {
      const coordinatesArray = coordinatesObj.coordinatesArray;
      const polyline = coordinatesObj.polyline;
      console.log(`original array length : ${coordinatesArray.length}`);

      const filteredCoordinates =
        filterCoordinatesBasedOnAngle(coordinatesArray);
      console.log(`filtered arrayy length : ${filteredCoordinates.length}`);

      // console.log(makeDesmosString(coordinatesArray));
      // console.log("\n\n\n");
      // console.log(makeDesmosString(filteredCoordinates));

      const boundingBoxArray = getBoundingBoxArray(filteredCoordinates);
      console.log(`Bounding Box array length is `, boundingBoxArray.length);

      const queryResult = await queryPotholesInBoundingBoxArray(
        boundingBoxArray
      );
      console.log(
        ` no. of potholes in route no. ${index} : ${queryResult?.length} `
      );
      return {
        coordinatesArray,
        polyline,
        countPotholes: queryResult?.length || 0,
      };
    })
  );

  console.log("allRoutesCalculation : ", allRoutesCalculation);

  console.timeEnd("main");
  mongoose.disconnect();
})();
