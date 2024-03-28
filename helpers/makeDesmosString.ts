import { wayPointPolylineType } from "../types";

export const makeDesmosString = (polyline: wayPointPolylineType) => {
  let str = "";
  for (let index = 0; index < polyline.length; index++) {
    const element = polyline[index];
    str += `(${element.latitude} , ${element.longitude}) , `;
  }
  return str;
};
