import mongoose from "mongoose";

// db schema




const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true }
}, { timestamps: true }); // Adding timestamps helps with "Sort by newest" later

export const Song = mongoose.model("Song", songSchema);
