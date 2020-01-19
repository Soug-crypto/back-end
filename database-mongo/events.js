const mongoose = require("mongoose");
const db = require("./index").db;

// mongoose.set('debug', true)

const Location_Schema = mongoose.Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: [Number]
});


const events_Schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  eventName: String,
  description: String,
  date: String,
  imgUrl: {
    type: String,
    default: "https://source.unsplash.com/random"
  },
  video: String,
  category: String,
  cost: String,
  organizerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  comments: [{
    author: String,
    imgUrl: {
      type: String,
      default: "http://www.herbeumont.be/macommune/vie-politique/conseil-communal/img/no-profile-image-png.png/image_view_fullscreen"
    },
    content: String
  }],
  rating: String,
  location: Location_Schema
});

const Events = mongoose.model("events", events_Schema);


db.collection('events').getIndexes()
  .then((indexes) => {
    if (!indexes.location_2dsphere) {
      db.collection('events').createIndex({
          location: "2dsphere"
        })
        .then(() => {
          console.log("Indexed collection by " + indexes.location_2dsphere)
        })

    }
  }).catch(console.error);







const saveEvent = eventInfo => {
  const event = new Events(eventInfo);
  return event.save();
};

const getAll = () => {
  return Events.find();
};

const getOneEventById = id => {
  return Events.findOne({
    _id: id
  }).populate({
    path: "organizerId",
    select: "username"
  });
};

const addAComment = (id, comment) => {
  return Events.findByIdAndUpdate({
    _id: id
  }, {
    $push: {
      comments: comment
    }
  }, {
    useFindAndModify: false
  });
};


const findNearestEvent = (req, fetched) => {
  var lat = req.body.lat || fetched[1];
  var lng = req.body.lng || fetched[0];
  var maxDistance = parseFloat(req.body.maxDistance) || 10000;
  var category = req.body.category;

  lat = parseFloat(lat)
  lng = parseFloat(lng)

  console.log('recieved', lng, lat, maxDistance, category)


  if (!lat && !lng && !category) {
    throw new Error("Please fill out all parameters")
  }


  return Events.aggregate([{
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [lat, lng]
      },
      distanceField: "distance",
      maxDistance: maxDistance,
      query: {
        category: category
      },
      distanceMultiplier: 1 / 6371,
      spherical: true
    }
  }])
}





module.exports.saveEvent = saveEvent;
module.exports.getAll = getAll;
module.exports.addAComment = addAComment;
module.exports.getOneEventById = getOneEventById;
module.exports.findNearestEvent = findNearestEvent;