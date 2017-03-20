const express = require('express');
const router = express.Router();
const request = require('request');

const config = require('../../../cfg.js');

router.get('/:id/:type', (req, res) => {
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
		var descriptions = object.VolledigeOmschrijving.split('\n');
		descriptions = descriptions.filter(item => {
			return item.length > 0;
		});

		// Structure description
		const description = descriptions.reduce((buffer, item) => {
			if (item[0] === '-') {
				return `${buffer} <li>${item.substr(1, item.length - 1)}</li>`;
			} if (item[item.length - 2] === ':') {
				return `${buffer} <h3>${item}</h3>`;
			} else {
				return `${buffer} <p>${item}</p>`;
			}
		});

		res.render("details", {
			object: object,
			gallery: gallery,
			description: description
		});
	});
});

module.exports = router;