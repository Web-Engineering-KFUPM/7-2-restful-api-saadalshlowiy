/*
===================================================================
Back-end Lab — RESTFul API
===================================================================

===================================================================
LAB SETUP INSTRUCTIONS
===================================================================

1. Navigate to the project directory:
   Open your terminal and run:
      cd 7-2-restful-api

2. Install project dependencies:
   Run either of these commands:
      npm i
      OR
      npm install

3. Start the front server server from this path: 7-2-RESTFul-APIs-main\7-2-restful-api\client:
   Run:
      npm run dev

4. Start the back-end server from a separate terminal, path: 7-2-RESTFul-APIs-main\7-2-restful-api\server:
    Run command to install express, cors, mongoose dotenv:
      npm install express cors mongoose dotenv

    Run command to start backend server:
      node server.js

  ⚠️ Note: Start the back-end server after establishing the connection with mongoDB.

  If your system blocks running npm commands (especially on Windows PowerShell),
   run this command first to allow script execution:
      Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
*/

/** =================================================================
 *  TODO 1 — Connect to MongoDB (file: server)
 *  =================================================================
 *  Steps:
 *    - Create the environment file with name ".env" inside the 7-2-restful-api\server folder
 *    - Create two variables:
 *        - MONGO_URL=
 *        - PORT=5174
 *    - Copy connection string from your mongo cloud account: clusters->connection->MongoDB for VS Code
 *    - Save the connection string to MONGO_URL variable.
 *    - Replace the <db_password> with your database passowrd.
 *    - At the end of the connection string after back slash "/", write swe363_songs.
 *        For Example: mongodb+srv://<db_username>:<db_password>@cluster0.oh7ap07.mongodb.net/swe363_songs
 *    - Write your db_username & db_password in the connection string.
 *    - If connection successful → console.log("Mongo connected").
 *    - If error → console.error("Connection error:", err.message)
 *
 *  Hint:
 *    await mongoose.connect(process.env.MONGO_URL);
 */

/** =================================================================
 *  TODO 2 — Import dotenv and load environment (file: server/server.js)
 *  =================================================================
 *  Steps: 
 *    - import the dotenv.
 *    - load the load environment variables.
 * 
 *  Syntax hint:
        import ______ from "________";
        ______.config();
 * 
 */

/** =================================================================
 *  TASK 2 — Create Schema & Model (file: server/models/song.model.js)
 *  =================================================================
 *  Goal:
 *    - Define a Song schema with fields:
 *        title (String, required)
 *        artist (String, required)
 *        year (Number)
 *    - Export a Mongoose model named "Song".
 *
 *  Example:
 *    name: { type: String, required: true, trim: true }
 *      Note: trim is used to remove the extra spaces automatically.
 * 
 *  Syntax hint:
 * 
      const songSchema = new mongoose.Schema({
        title:  { type: _______, required: _____, trim: _____ },
        artist: { type: _______, required: _____, trim: _____ },
        year:   { type: _______, min: _____, max: _____ }
      }, { timestamps: _____ });

      const Song = mongoose.model("Song", songSchema);
 */

/** =================================================================
 *  TODO 3 — POST /api/songs (Insert) file: server/server.js
 *  =================================================================
 *  Goal:
 *    - Insert a new song into DB.
 *    - Expect JSON body: { title, artist, year }.
 *    - Respond 201 + created song on success.
 *    - Respond 400 + {message} on validation error.
 *
 *  Syntax hint:
      app.post("__________", async (req, res) => {
        try {
          const { title = "", artist = "", year } = __________ || {};
          const created = await __________.create({
            title: __________.trim(),
            artist: __________.trim(),
            year
          });
          res.status(____).json(__________);
        } catch (err) {
          res.status(____).json({ message: err.message || "____________" });
        }
      });
 */

/*  =================================================================
 *  TODO 4— GET /api/songs (Read all) file: server/server.js
 *  =================================================================
 *  Goal:
 *    - Use Song.find() to get all songs from DB.
 *    - Sort by newest first (createdAt descending).
 *    - Return JSON array of songs.
 *
 *  Syntax hint:
      app.get("__________", async (____, res) => {
        const rows = await __________.find().sort({ createdAt: ___ });
        res.json(____);
      });

      app.get("______________", async (req, res) => {
        const s = await __________.findById(__________);
        if (!s) return res.status(___).json({ message: "______________" });
        res.json(____);
      });
 */

/** =================================================================
 *  TODO 5 — PUT /api/songs/:id (Update) file: server/server.js
 *  =================================================================
 *  Goal:
 *    - Update an existing song by its ID.
 *    - Use Song.findByIdAndUpdate() with {new:true, runValidators:true}.
 *    - If not found → 404 {message:"Song not found"}.
 *
 *  Syntax hint:
      app.put("______________", async (req, res) => {
        try {
          const updated = await __________.findByIdAndUpdate(
            __________,
            __________ || {},
            { new: _____, runValidators: _____, context: "________" }
          );
          if (!updated) return res.status(___).json({ message: "______________" });
          res.json(__________);
        } catch (err) {
          res.status(___).json({ message: err.message || "_____________" });
        }
      });
 */

/** =================================================================
 *  TODO 6 — DELETE /api/songs/:id file: server/server.js
 *  =================================================================
 *  Goal:
 *    - Delete a song from DB by its ID.
 *    - If not found → 404 {message:"Song not found"}.
 *    - On success → 204 No Content.
 *
 *  Syntax hint:
      app.delete("______________", async (req, res) => {
        const deleted = await __________.findByIdAndDelete(__________);
        if (!deleted) return res.status(___).json({ message: "______________" });
        res.status(___).end();
      });
 */
// Example of the POST (Create) function
const addItem = async (name) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name }) // This becomes req.body on the server
  });
  const data = await response.json();
  console.log("Added:", data);
};

// Example of the GET (Read) function
const getItems = async () => {
  const response = await fetch('/api/items');
  const data = await response.json();
  setItems(data); // Assuming you have a state variable
};