const mongoose = require("mongoose");

const events_Schema = mongoose.Schema({
  eventName: String,
  description: String,
  date: String,
  imgUrl: String,
  video: String,
  category: String,
  cost: String,
  planId: String,
  organizerId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },
  planId: String,
  comments: [Object],
  rating: String
});

const Events = mongoose.model("events", events_Schema);

const saveEvent = event => {
  return event.save();
};

const getAll = () => {
  return Events.find();
};

const getOneEventById = id => {
  Events.find({ _id: id });
};

module.exports.saveEvent = saveEvent;
module.exports.getAll = getAll;
module.exports.getOneEventById = getOneEventById;
