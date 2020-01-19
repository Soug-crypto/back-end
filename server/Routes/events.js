const express = require("express");
const router = express.Router();
const Event = require("../../database-mongo/events");
const verifyToken = require("../middleware/verifyToken");
const upload = require("./../helpers/multer");
const ObjectId = require("mongoose").Types.ObjectId;
const axios = require("axios");

router.post("/create", verifyToken, (req, res) => {
  latiLongiGetter(req.body.location)
    .then(response => {
      var fetched =
        response.data["resourceSets"][0]["resources"][0]["point"][
          "coordinates"
        ];
      const event = {
        _id: ObjectId(req.body._id),
        organizerId: req.user._id,
        eventName: req.body.eventName,
        description: req.body.description,
        date: req.body.date,
        category: req.body.category,
        cost: req.body.cost,
        imgUrl: req.body.imgUrl,
        location: { coordinates: fetched }
      };
      return Event.saveEvent(event);
    })
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

router.post("/findNearestEvent", (req, res) => {
  const address = req.body.address;

  if (address) {
    latiLongiGetter(address)
      .then(response => {
        var fetched =
          response.data["resourceSets"][0]["resources"][0]["point"][
            "coordinates"
          ];
        return Event.findNearestEvent(req, fetched);
      })
      .then(data => {
        res.json(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    Event.findNearestEvent(req)
      .then(data => {
        res.json(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

var latiLongiGetter = address => {
  const url = `http://dev.virtualearth.net/REST/v1/Locations?query=${address}&maxResults=1&key=AuMse-MT94lj0_ntckXzfHC4pT0CKaTePJVLBP2daFx0TpPfd1i5SoejGfkn2lrW`;
  return axios.get(url);
};

router.post("/upload-img", upload.array("uploads[]", 12), function(req, res) {
  console.log({ a: req.files });
  res.send(req.files);
});

module.exports = router;
