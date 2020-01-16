var Mongoose = require('mongoose');

const users = [
	{
		_id: new Mongoose.Types.ObjectId(),
		userName: 'dforgan0',
		password: 'w1mlEkryt',
		email: 'gtassell0@tinypic.com',
		type: 'user'
		// profileId: "5e148bf8fc13ae0c40000001"
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		userName: 'dperell1',
		password: '6BSym3',
		email: 'tcristoforetti1@nasa.gov',
		type: 'user'
		// profileId: "5e148bf8fc13ae0c40000003"
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		userName: 'kdodgshon2',
		password: '1pK97cFHXIC',
		email: 'elaval2@icio.us',
		type: 'organizer'
		// profileId: "5e148bf8fc13ae0c40000005"
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		userName: 'dchomiszewski3',
		password: 'T0Ou0Ud',
		email: 'dpowter3@sitemeter.com',
		type: 'organizer'
		// profileId: "5e148bf8fc13ae0c40000007"
	}
];
const userprofile = [
	{
		_id: new Mongoose.Types.ObjectId(),
		firstName: 'Goraud',
		lastName: 'Baynom',
		birthDate: '5/1/2018',
		imgUrl: 'http://dummyimage.com/204x248.jpg/ff4444/ffffff',
		about:
			'ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie'
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		firstName: 'Giacomo',
		lastName: 'Bramwich',
		birthDate: '11/26/2018',
		imgUrl: 'http://dummyimage.com/228x137.jpg/5fa2dd/ffffff',
		about: 'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing'
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		firstName: 'Pace',
		lastName: 'Phippen',
		birthDate: '7/7/2018',
		imgUrl: 'http://dummyimage.com/103x131.jpg/dddddd/000000',
		about:
			'in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et'
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		firstName: 'Luca',
		lastName: 'Lodemann',
		birthDate: '8/24/2018',
		imgUrl: 'http://dummyimage.com/225x121.jpg/dddddd/000000',
		about: 'in eleifend quam a odio in hac habitasse platea dictumst maecenas'
	}
];

const events = [
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'tristique',
		description: 'amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam',
		date: '1/27/2018',
		imgUrl: [ 'http://dummyimage.com/205x223.jpg/5fa2dd/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'music',
		cost: 'FREE',
		organizerId: '5e148bf8fc13ae0c40000004',
		planId: '5e148aadfc13ae1216000001',
		comments: [
			{
				userId: '5e18932dd484d007a467d42a',
				username: 'SofianSaleh',
				comment: 'HAHAHAHAHAHAH'
			}
		],
		rating: [ 3, 2, 4, 5, 2, 2 ]
	},

	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'et',
		description:
			'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar',
		date: '3/30/2018',
		imgUrl: [ 'http://dummyimage.com/185x240.jpg/5fa2dd/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'it',
		cost: '2,99$',
		organizerId: '5e148bf8fc13ae0c40000004',
		planId: '5e148aadfc13ae1216000003',
		Comments: [
			{
				_userId: '5e18932dd484d007a467d42a',
				userName: 'SofianSaleh',
				comment: 'HAHAHAHAsdfsdgsfdgsdfgsfgsdfgHAHAH'
			}
		],
		rating: [ 3, 2, 4, 5, 2, 2 ]
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'pede morbi',
		description: 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed',
		date: '5/10/2018',
		imgUrl: [ 'http://dummyimage.com/239x231.jpg/ff4444/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'music',
		cost: 'FREE',
		organizerId: '5e148bf8fc13ae0c40000006',
		planId: '5e148aadfc13ae1216000005',
		Comments: [
			{
				_userId: '5e18932dd484d007a467d42a',
				userName: 'SofianSaleh',
				comment: 'HAHAHAHAHAsadfhjklhgfdrseasrdfghjkhgfdHAH'
			}
		],
		rating: [ 3, 2, 4, 5, 2, 2 ]
	},
	{
		_id: new Mongoose.Types.ObjectId(),
		eventName: 'tristique tortor',
		description:
			'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur',
		date: '3/8/2018',
		imgUrl: [ 'http://dummyimage.com/233x226.jpg/ff4444/ffffff' ],
		videos: [ 'https://www.youtube.com/watch?v=NpEaa2P7qZI' ],
		category: 'education',
		cost: 'FREE',
		organizerId: '5e148bf8fc13ae0c40000006',
		planId: '5e148aadfc13ae1216000007'
	}
];

module.exports.events = events;
