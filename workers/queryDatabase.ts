import { Location } from "../models/potholeModel";
import { boundingBox } from "../types";

const queryPotholesInBoundingBoxArray = (boundingBoxArray: boundingBox[]) => {
  const query = {
    $or: boundingBoxArray.map((box) => ({
      location: {
        $geoWithin: {
          $box: [
            [box.longitudeMin, box.latitudeMin],
            [box.longitudeMax, box.latitudeMax],
          ],
        },
      },
    })),
  };
  // Execute the query to find potholes within the specified boxes
  Location.find(query)
    .then((result) => {
      console.log("Query result:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
