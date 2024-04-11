const fs = require("fs");

import { wayPointPolylineType } from "../types";

export function decodePolyline(encoded: string): wayPointPolylineType | [] {
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }

  return points;
}

const str1 =
  "isutBcsy{LcByASE_Aw@u@o@IKKYAMMc@[aACa@BaDFaBD_NjE}@pIiBxBk@jBm@tA_@hIiBlCo@d@MTBZG`@BL@xBm@zBc@j@Sv@c@PSyA}@Xa@t@b@nBnAvAzAhAdBp@pAn@l@^h@PPfAfCfAjB~B~DfAzB_@N]NcAmBkDmGyB_EWR";

const str2 =
  "isutBcsy{LcByASE_Aw@u@o@IKKYJMX`@rBhB`FdElAfA\\a@l@iA`F{GhCkDnDeFv@p@fAhA`@Xh@h@v@n@\\RNEPIvBy@dC}@vAa@p@QLAZ@Pa@JUNEdAAlAe@NETNVVRTLDb@J|@k@h@Uh@Uh@MxAYh@SNGQ]qAaCaAcBmDuGUa@WR";

const str3 =
  "isutBcsy{LcByASE_Aw@u@o@IKKYJMX`@rBhB`FdElAfA\\a@jD`CpErDxEvEtBlBFZbA|@lEqGrBeDpDmF~B_DvA{Az@e@jCSv@GxDUd@IzCaAz@QxB]iCaEwBgDcCkEkDmGyB_EWR";

const m1 = decodePolyline(str1);
console.log(m1.length);
const jsonString = JSON.stringify(m1);
fs.writeFile("str1.json", jsonString, (err: any) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("JSON data saved to data.json");
  }
});

const m2 = decodePolyline(str2);
console.log(m2.length);
const jsonString2 = JSON.stringify(m2);
fs.writeFile("str2.json", jsonString2, (err: any) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("JSON data saved to data.json");
  }
});

const m3 = decodePolyline(str3);
console.log(m3.length);
const jsonString3 = JSON.stringify(m3);
fs.writeFile("str3.json", jsonString, (err: any) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("JSON data saved to data.json");
  }
});
