const express = require('express');
const mongoose = require('mongoose');
const app = express();

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); 


app.use(express.json()); // CRITICAL: This reads the data from your front-end

// 1. Connect to MongoDB (Use your Atlas string here!)
mongoose.connect('your_mongodb_atlas_connection_string_here')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection failed", err));

// 2. Define Schema and Model (Example: a Student list)
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', itemSchema);

// 3. CRUD ROUTES
// [READ] Get all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// [CREATE] Add a new item
app.post('/api/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

// [UPDATE] Edit an item by ID
app.put('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(updatedItem);
});


app.post("/api/songs", async (req, res) => {
  try {
    const { title, artist, year } = req.body;
    const newSong = await Song.create({ title, artist, year });
    res.status(201).json(newSong); // 201 is required
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 is required
  }
});



app.delete("/api/songs/:id", async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) return res.status(404).json({ message: "Song not found" });
    res.status(204).send(); // 204 means success with no content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all - must sort newest first
app.get("/api/songs", async (req, res) => {
  const songs = await Song.find().sort({ createdAt: -1 }); 
  res.json(songs);
});

// Get by ID - must return 404 if missing
app.get("/api/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(404).json({ message: "Invalid ID format" });
  }
});


// [DELETE] Remove an item by ID
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));