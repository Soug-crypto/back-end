const express = require("express");
const router = express.Router();
const Event = require("../../database-mongo/events");
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, (req, res) => {
  const event = {
    organizerId: req.user._id,
    eventName: req.body.eventName,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
    cost: req.body.cost
  };
  Event.saveEvent(event)
    .then(savedEvent => res.status(201).json(savedEvent))
    .catch(err => res.status(500).json(err));
});

router.get("/all", (req, res) => {
  Event.getAll()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json(err));
});
module.exports = router;
