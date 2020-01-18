const express = require("express");
const db = require("../database-mongo/index");
const authRoute = require("./Routes/auth");
const events = require("./Routes/events");
const event = require("./Routes/event");
const profile = require("./Routes/profile");
const cors = require("cors");

const PORT = 7000;
var app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", authRoute);
app.use("/api/event", event);
app.use("/api/profile", profile);
app.use("/api/events", events);
app.get("*", (req, res) => {
  res.send("hi")
})
app.listen(PORT, function() {
  console.log(`listening, on port ${PORT}`);
});
