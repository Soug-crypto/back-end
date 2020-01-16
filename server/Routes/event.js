const express = require("express");
const router = express.Router();
const Event = require("../../database-mongo/events");
const verifyToken = require("../middleware/verifyToken");

router.get("/:id", (req, res) => {
  Event.getOneEventById(req.params.id)
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json(err));
});

router.post("/comments/add", verifyToken, (req, res) => {
  const comment = {
    auther: req.user.username,
    content: req.body.content,
    eventID: req.body.id
  };
  Event.addAComment(req.body.id, comment)
    .then(savedData => res.status(201).json(savedData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
