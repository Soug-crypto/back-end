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
  comments: [],
  rating: String
});

const Events = mongoose.model("events", events_Schema);

const saveEvent = eventInfo => {
  const event = new Events(eventInfo);
  console.log(event);
  return event.save();
};

const getAll = () => {
  return Events.find();
};

const getOneEventById = id => {
  return Events.findOne({ _id: id });
};

const addAComment = (id, comment) => {
  return Events.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: comment } },
    { useFindAndModify: false }
  );
};
module.exports.saveEvent = saveEvent;
module.exports.getAll = getAll;
module.exports.addAComment = addAComment;
module.exports.getOneEventById = getOneEventById;
