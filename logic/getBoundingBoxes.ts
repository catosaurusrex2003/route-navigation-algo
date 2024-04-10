import { boundingBox, coordinateType } from "../types";

function createBoundingBox(
  coord1: coordinateType,
  coord2: coordinateType
): boundingBox {
  const latitudeMax = Math.max(coord1.latitude, coord2.latitude);
  const longitudeMax = Math.min(coord1.longitude, coord2.longitude);

  const latitudeMin = Math.min(coord1.latitude, coord2.latitude);
  const longitudeMin = Math.max(coord1.longitude, coord2.longitude);

  return { latitudeMin, latitudeMax, longitudeMin, longitudeMax };
}

export const getBoundingBoxArray = (coordArray: coordinateType[]): boundingBox[] => {
  const ret: boundingBox[] = [];
  for (let index = 1; index < coordArray.length; index++) {
    const leftElement = coordArray[index - 1];
    const rightElement = coordArray[index];
    ret.push(createBoundingBox(leftElement, rightElement));
  }
  return ret;
};
