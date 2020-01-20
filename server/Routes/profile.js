const express = require("express");
const router = express.Router();
const User = require("../../database-mongo/users");
const Event = require("../../database-mongo/events");

const verifyToken = require("../middleware/verifyToken");

router.patch("/attendEvent", verifyToken, (req, res) => {
  console.log(req.body);
  Event.getOneEventById(req.body.eventID)
    .then(event => User.attendEvent(req.user._id, event))
    .then(data => res.status(204).send(data))
    .catch(err => res.status(500).json(err));
});

//still need work
router.patch("/retractEvent", verifyToken, (req, res) => {
  User.cancelAnEvent(req.user._id, req.body.id)
    .then(userData => res.status(204).send(userData))
    .catch(err => res.status(500).json(err));
});

router.get("/user", verifyToken, (req, res) => {
  User.getOneById(req.user._id)
    .then(userData => res.status(201).send(userData))
    .catch(err => res.status(500).json(err));
});
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  User.getOneById(req.params.id)
    .then(userData => {
      console.log({ userData });
      res.status(201).send(userData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
