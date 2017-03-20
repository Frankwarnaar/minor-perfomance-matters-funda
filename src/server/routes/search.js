const express = require('express');
const router = express.Router();
const request = require('request');
const url = require('url');

const config = require('../../../cfg.js');

router.get('/', (req, res) => {
	const queries = url.parse(req.url, true).query;
	const postal = queries.postal;
	const type = queries.type;

	request.get(`${config.funda.baseUrls.search}/${config.funda.key}?type=${type}&zo=/${postal}/+1km`, (err, response, body) => {
		console.log(JSON.parse(body));
		res.render("search", {
			meta: body.Metadata,
			objects: body.Objects
		});
	});
});

module.exports = router;