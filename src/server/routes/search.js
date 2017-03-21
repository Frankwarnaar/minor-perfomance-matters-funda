const express = require('express');
const router = express.Router();
const request = require('request');
const url = require('url');

const config = require('../../../cfg.js');

router.get('/', (req, res) => {
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

module.exports = router;