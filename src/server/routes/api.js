'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');
const url = require('url');

const config = require('../../../cfg.js');

router.get('/search/q', (req, res) => {
	const queries = url.parse(req.url, true).query;
	const city = queries.city;
	const type = queries.type;

	request.get(`${config.funda.baseUrls.search}/${config.funda.key}?type=${type}&zo=/${city}/+1km`, (err, response, body) => {
		const results = JSON.parse(body);
		res.json({
			meta: results.Metadata,
			objects: results.Objects
		});
	});
});

router.get('/coords/', (req, res) => {
	const queries = url.parse(req.url, true).query;
	const city = queries.city;
	const lat = queries.lat;
	const long = queries.long;
	const type = queries.type;

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
			res.json({
				meta: objects.Metadata,
				objects: objects.Objects
			});
		});
	});
});

router.get('/details/:id/:type', (req, res) => {
	const id = req.params.id;
	const type = req.params.type;

	request.get(`${config.funda.baseUrls.objects}/${config.funda.key}/${type}/${id}`, (err, response, body) => {
		const object = JSON.parse(body);

		var gallery = '';
		object.Media.map(picture => {
			const bigPic = picture.MediaItems.filter(source => {
				if (source.Url.includes('middel')) {
					return source.Url;
				} else if (source.Url.includes('groot')) {
					return source.Url;
				} else if (source.Url.includes('grotere')) {
					return source.Url;
				}
			});

			picture.MediaItems.map(source => {
				if (source.Url.includes('middel')) {
					if (bigPic.length > 0) {
						gallery += `<a href="#image/${bigPic[bigPic.length - 1].Url}"><img src="${source.Url}" alt="${object.Adres}"></a>`;
					}
				}
			});
		});

		// Filter description
		let descriptions = object.VolledigeOmschrijving.split('\n');
		descriptions = descriptions.filter(item => {
			return item.length > 0;
		});

		res.json({
			object: object,
			gallery: gallery,
			descriptions: descriptions
		});
	});
});

module.exports = router;