const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  fullname: {
    type: String
  },
  phoneNumber: String,
  birthDate: String,
  imgUrl: {
    type: String,
    default:
      "http://www.herbeumont.be/macommune/vie-politique/conseil-communal/img/no-profile-image-png.png/image_view_fullscreen"
  },
  about: String,
  attendedEvents: []
});

const User = mongoose.model("User", userSchema);

const attendEvent = (id, event) => {
  console.log(id);
  return User.findByIdAndUpdate(
    { _id: id },
    { $push: { attendedEvents: event } },
    { new: true }
  );
};

const getOneById = id => {
  return User.findOne({ _id: id });
};

const cancelAnEvent = (id, eventID) => {
  return User.findByIdAndUpdate(
    { _id: id },
    {
      $pull: { attendedEvents: { _id: eventID } }
    },
    { useFindAndModify: false },
    { new: true }
  );
};

//function that will hash the password and save it in the users collection
//this function return a promise
const saveUser = async (username, email, password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({
    username: username,
    email: email,
    password: hashedPassword
  });
  return user.save();
};

//function that will check if the user is already registred in the database or not
//and check if the password is valid
//this function return an object if the password match or false if the password dosen't match
const findUser = (email, password) => {
  return User.findOne({ email }).then(async user => {
    if (user) {
      let pswd = await bcrypt.compare(password, user.password);
      return { found: pswd, user };
    } else {
      return { found: false };
    }
  });
};

module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
module.exports.attendEvent = attendEvent;
module.exports.getOneById = getOneById;
module.exports.cancelAnEvent = cancelAnEvent;
