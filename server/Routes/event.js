const express = require("express");
const router = express.Router();
const Event = require("../../database-mongo/events");

router.get("/:id", (req, res) => {
  Event.getOneEventById(req.params.id)
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json(err));
});
module.exports = router;
