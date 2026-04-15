const express = require('express');
const mongoose = require('mongoose');
const app = express();

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

// [DELETE] Remove an item by ID
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));