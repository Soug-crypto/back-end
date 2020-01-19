const mongoose = require("mongoose");

const events_Schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  eventName: String,
  description: String,
  date: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  imgUrl: {
    type: String,
    default: "https://source.unsplash.com/random"
  },
  video: String,
  category: String,
  cost: String,
  location: String,
  organizerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  comments: [
    {
      author: String,
      imgUrl: {
        type: String,
        default:
          "http://www.herbeumont.be/macommune/vie-politique/conseil-communal/img/no-profile-image-png.png/image_view_fullscreen"
      },
      content: String
    }
  ],
  rating: String
});

const Events = mongoose.model("events", events_Schema);

const saveEvent = eventInfo => {
  const event = new Events(eventInfo);
  return event.save();
};

const getAll = () => {
  return Events.find();
};

const getOneEventById = id => {
  return Events.findOne({ _id: id }).populate({
    path: "organizerId",
    select: "username"
  });
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
