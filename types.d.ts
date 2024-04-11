export type coordinateType = { latitude: number; longitude: number };
export type wayPointPolylineType = coordinateType[];
export type boundingBox = {
  latitudeMin: number;
  latitudeMax: number;
  longitudeMin: number;
  longitudeMax: number;
};