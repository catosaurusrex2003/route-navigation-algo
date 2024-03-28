// const fs = require("fs");

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

// const str =
//   "i{tsBcdz{LD|@|AGZ?tBERBZFj@J|@RrC\\dB\\bEl@fANR@?EFEFAFBDJ?D?BXV`DxBrAv@vCpAp@TTDpB^fANzE`AbB^a@vA_@nAW~@m@pBMv@e@~BMb@}BbIhEhAnC`AxJzC|@NxIAlA?`@??V@tC?pB?JRLTP^DnB@pAAJDBR?^g@?_AL}@Rg@Na@TGHERElBBdCFbDAjAQ\\N`EBpDDjBRjFFfEHfF^|DZvBd@nCPrALtAJtADlC?nBAnAY|FIzA@z@LlALf@Th@Zf@`@d@d@^rAn@|Bt@VTd@P`Bn@~@b@ZCxF|A`Dv@dB`@Kp@}@bFAJ";

// const m = decodePolyline(str);

// console.log(m.length);

// const jsonData = JSON.stringify(m);

// console.log(str.length);
// console.log(jsonData.length);
