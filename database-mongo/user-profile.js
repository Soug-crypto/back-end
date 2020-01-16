const mongoose = require("mongoose");

const user_profileSchema = mongoose.Schema({
  _userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  phoneNumber: String,
  email: {
    required: true,
    type: String
  },
  birthDate: String,
  imgUrl: String,
  about: String,
  attendedEvents: [Object]
});

const Profile = mongoose.model("Profile", user_profileSchema);

const createprofile = (userID, fullName, email) => {
  const userProfile = new Profile({
    _userId: userID,
    fullname: fullName,
    email: email
  });
  return userProfile.save();
};

module.exports.createprofile = createprofile;
