require('dotenv').config();

const config = {
	funda: {
		key: process.env.FUNDA_KEY,
		baseUrls: {
			search: 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json',
			objects: 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail',
			autoSuggest: 'http://zb.funda.info/frontend/json',
			map: 'http://mt1.funda.nl/maptiledata.ashx/json'
		}
	},
	google: {
		key: process.env.GOOGLE_KEY,
		baseUrls: {
			maps: 'https://maps.googleapis.com/maps/api/geocode/json',
			roads: 'https://roads.googleapis.com/v1/nearestRoads'
		}
	}
};

module.exports = config;