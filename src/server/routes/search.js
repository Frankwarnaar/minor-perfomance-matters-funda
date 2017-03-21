'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');
const url = require('url');

const config = require('../../../cfg.js');

router.get('/q', (req, res) => {
	const queries = url.parse(req.url, true).query;
	const city = queries.city;
	const type = queries.type;

	request.get(`${config.funda.baseUrls.search}/${config.funda.key}?type=${type}&zo=/${city}/+1km`, (err, response, body) => {
		const results = JSON.parse(body);
		res.render("search", {
			meta: results.Metadata,
			objects: results.Objects,
			critical: 'search'
		});
	});
});

router.get('/coords/', (req, res) => {
	const queries = url.parse(req.url, true).query;
	const city = queries.city;
	const lat = queries.lat;
	const long = queries.long;
	const type = queries.typeLocation;

	request.get(`${config.google.baseUrls.maps}?latlng=${lat},${long}&key=${config.google.key}`, (err, response, body) => {
		const location = JSON.parse(body);
		const locationComponents = location.results[0].address_components;

		let street = locationComponents.filter(component => {
			return component.types.includes('route');
		})[0];
		street = street.long_name;

		let city = locationComponents.filter(component => {
			return component.types.includes('locality');
		})[0];
		city = city.long_name;

		request.get(`${config.funda.baseUrls.search}/${config.funda.key}?type=${type}&zo=/${city}/${street}/+1km&page=1&pagesize=25`, (err, response, objects) => {
			objects = JSON.parse(objects);
			res.render("search", {
				meta: objects.Metadata,
				objects: objects.Objects,
				critical: 'search'
			});
		});
	});
});

module.exports = router;