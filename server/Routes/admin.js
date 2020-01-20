const Event = require("../../database-mongo/events");
const router = require("express").Router();
const jwt = require("jsonwebtoken");



router.post("/saveevent", verifyToken, (req, res) => {
  let commands = req.body
  const event = {
    _id: ObjectId(req.body._id),
    organizerId: req.body.organizerId,
    eventName: req.body.eventName,
    description: req.body.description,
    date: req.body.date,
    category: req.body.category,
    cost: req.body.cost,
    location : req.body.location,
    imgUrl: req.body.imgUrl
  };
  Event.saveEvent(event)
    .then(savedEvent => {
      res.status(201).json(savedEvent)
    })
    .catch(err => {
      res.status(500).json(err);
    });

})

router.post("/getall", verifyToken, (req, res) => {
  Event.getAll()
  .then(savedData => res.status(201).json(savedData))
  .catch(err => res.status(500).json(err));

})

router.post("/deleteevent", verifyToken, (req, res) => {
  let id = req.body.id
  Event.deleteEvent(id)
  .then(savedData => res.status(201).json(savedData))
  .catch(err => res.status(500).json(err));

})

router.post("/updateEvent", verifyToken, (req, res) => {
  let id = req.body.id;
  let changeObj = req.body.changeObj
  Event.updateEvent(id, changeObj )
  .then(savedData => res.status(201).json(savedData))
  .catch(err => res.status(500).json(err));

})
