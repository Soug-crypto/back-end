const mongoose = require("mongoose");
const db = require("./index").db;

<<<<<<< HEAD
=======
// mongoose.set('debug', true)

>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532
const Location_Schema = mongoose.Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: [Number]
});
<<<<<<< HEAD
=======

>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532

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
<<<<<<< HEAD
  location: Location_Schema,
=======
>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532
  organizerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
<<<<<<< HEAD
  comments: [
    {
      author: String,
      imgUrl: {
        type: String,
        default:
          "http://www.herbeumont.be/macommune/vie-politique/conseil-communal/img/no-profile-image-png.png/image_preview"
      },
      content: String
    }
  ],
  rating: String
=======
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
>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532
});

const Events = mongoose.model("events", events_Schema);

<<<<<<< HEAD
db.collection("events")
  .getIndexes()
  .then(indexes => {
    if (!indexes.location_2dsphere) {
      db.collection("events")
        .createIndex({
          location: "2dsphere"
        })
        .then(() => {
          console.log("Indexed collection by " + indexes.location_2dsphere);
        });
    }
  })
  .catch(console.error);
=======

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






>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532

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
    select: ["username", "imgUrl"]
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

<<<<<<< HEAD
=======

>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532
const findNearestEvent = (req, fetched) => {
  var lat = req.body.lat || fetched[1];
  var lng = req.body.lng || fetched[0];
  var maxDistance = parseFloat(req.body.maxDistance) || 10000;
  var category = req.body.category;

<<<<<<< HEAD
  lat = parseFloat(lat);
  lng = parseFloat(lng);

  console.log("recieved", lng, lat, maxDistance, category);

  if (!lat && !lng && !category) {
    throw new Error("Please fill out all parameters");
  }

  return Events.aggregate([
    {
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
    }
  ]);
};

module.exports.findNearestEvent = findNearestEvent;
=======
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





>>>>>>> 26415e8e61cf39cc202cfcf2299ee849da0e2532
module.exports.saveEvent = saveEvent;
module.exports.getAll = getAll;
module.exports.addAComment = addAComment;
module.exports.getOneEventById = getOneEventById;
module.exports.findNearestEvent = findNearestEvent;