const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const config = require("config");
const app = express();

// Bodyparser Middleware
app.use(express.json());

//DB Config
const db = config.get("mongoURI");

//Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true, // ?read about this
    useCreateIndex: true, // ?read about this
    useUnifiedTopology: true, // ?read about this
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Use Routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
