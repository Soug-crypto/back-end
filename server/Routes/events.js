const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, (req, res) => {
  const event = {
    organizerId: req.user._id,
    eventName: req.body.eventname,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
    cost: req.body.cost
  };
  res.json(event);
});

module.exports = router;
