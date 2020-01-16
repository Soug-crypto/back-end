var users = require('./dummy-data.js');
var userprofile = require('./dummy-data.js');
var events = require('./dummy-data.js');
var mongoose = require('mongoose');
var User = require('./database-mongo/users.js');
var Pofile = require('./database-mongo/user-profile.js');
var Event = require('./database-mongo/events.js');

var dbName = 'events';
mongoose.connect(`mongodb://localhost/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true }, function(
	err,
	db
) {
	if (err) throw err;
	console.log(`database ${dbName} was created`);
});

var seedDb = function(users, userprofile, events) {
	for (var i = 0; i < users.users.length; i++) {
		//console.log(User.create, users.users);
		User.create(users.users[i], (err, res) => {
			if (err) {
				console.log(err);
				return err;
			} else {
				console.log('database is populated user');
			}
		});
	}
	// for (var i = 0; i < userprofile.userprofile.length; i++) {
	//   Pofile.save(userprofile.userprofile[i], (err, res) => {
	//     if (err) {
	//       return err;
	//     } else {
	//       console.log("database is populated user profile");
	//     }
	//   });
	// }
	for (var i = 0; i < events.events.length; i++) {
		Event.save(events.events[i], (err, res) => {
			if (err) {
				return err;
			} else {
				console.log('database is populated events');
			}
		});
	}
};

seedDb(users, userprofile, events);
