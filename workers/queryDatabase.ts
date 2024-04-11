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
            [
              Math.min(box.longitudeMin, box.longitudeMax),
              Math.min(box.latitudeMin, box.latitudeMax),
            ],
            [
              Math.max(box.longitudeMin, box.longitudeMax),
              Math.max(box.latitudeMin, box.latitudeMax),
            ],
          ],
        },
      },
    })),
  };
  console.log(query);

  try {
    const result = await Location.find(query);
    return result;
  } catch (error) {
    console.log(`ERROR while querying database: ${error}`);
  }
};

export const queryPotholesInBoundingBox = async (box: boundingBox) => {
  const query = {
    location: {
      $geoWithin: {
        $box: [
          [
            Math.min(box.longitudeMin, box.longitudeMax),
            Math.min(box.latitudeMin, box.latitudeMax),
          ],
          [
            Math.max(box.longitudeMin, box.longitudeMax),
            Math.max(box.latitudeMin, box.latitudeMax),
          ],
        ],
      },
    },
  };
  console.log(query);
  // Execute the query to find potholes within the specified bounding box
  try {
    const result = await Location.find(query);
    return result;
  } catch (error) {
    console.log(`ERROR while querying database: ${error}`);
  }
};
