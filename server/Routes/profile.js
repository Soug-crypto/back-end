const express = require("express");
const router = express.Router();
const User = require("../../database-mongo/users");
const Event = require("../../database-mongo/events");

const verifyToken = require("../middleware/verifyToken");

router.patch("/attend", verifyToken, (req, res) => {
  Event.getOneEventById(req.body.id)
    .then(event => User.attendEvent(req.user._id, event))
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).json(err));
});

//still need work
router.patch("/retract", verifyToken, (req, res) => {
  User.cancelAnEvent(req.user._id, req.body.id)
    .then(userData => res.status(201).send(userData))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  User.getOneById(req.params.id)
    .then(userData => res.status(201).send(userData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
