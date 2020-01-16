const mongoose = require("mongoose");
require("dotenv").config();
//Promise
mongoose.Promise = global.Promise;

// create connection
mongoose.connect(`mongodb://localhost/EventsManager`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
// add event open the connection and handle the error
const db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

exports.db = db;
