import mongoose from "mongoose";
const { Schema } = mongoose;



const LocationSchema = new Schema({
  name: String,
  location: {
    type: { type: String },
    coordinates: [{ type: Number }],
  },
  numberofPotholes: [{ type: Number }],
});

LocationSchema.index({ location: "2dsphere" });

export const Location = mongoose.model("coordinate", LocationSchema);

// // Define the bounds for multiple boxes
// const boxes = [
//   { latMin: 19.0, latMax: 20.0, lonMin: 72.0, lonMax: 73.0 }, // Box 1
//   { latMin: 21.0, latMax: 22.0, lonMin: 74.0, lonMax: 75.0 }, // Box 2
//   // Add more boxes as needed
// ];
