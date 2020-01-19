const express = require("express");
const router = express.Router();
const Event = require("../../database-mongo/events");
const verifyToken = require("../middleware/verifyToken");
const upload = require("./../helpers/multer");
const ObjectId = require("mongoose").Types.ObjectId;
const axios = require("axios");

router.post("/create", verifyToken, (req, res) => {
  const event = {
    _id: ObjectId(req.body._id),
    organizerId: req.user._id,
    eventName: req.body.eventName,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
    cost: req.body.cost,
    imgUrl: req.body.imgUrl,
    location: req.body.location
  };
  console.log(event);
  Event.saveEvent(event)
    .then(savedEvent => {
      res.status(201).json(savedEvent);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/all", (req, res) => {
  Event.getAll()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json(err));
});

router.post("/upload-img", upload.array("uploads[]", 12), function(req, res) {
  res.send(req.files);
});

module.exports = router;
