import { Location } from "../models/potholeModel";
import { boundingBox } from "../types";

export const queryPotholesInBoundingBoxArray = async (
  boundingBoxArray: boundingBox[]
) => {
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
  try {
    const result = await Location.find(query);
    return result;
  } catch (error) {
    console.log(`ERROR while querying database: ${error}`);
  }
};
