import fs from "fs";

export const makeJson = (jsObject: any, fileName: string) => {
  const normalizedFileName = fileName.endsWith(".json") ? fileName : `${fileName}.json`;

  fs.writeFile(normalizedFileName, JSON.stringify(jsObject, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File written successfully");
    }
  });
};
