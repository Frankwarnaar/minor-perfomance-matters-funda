'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const staticAsset = require('static-asset');

const app = express();
const port = process.env.PORT || 3000;
const baseDir = 'build/client';

const searchRouter = require('./routes/search');
const detailsRouter = require('./routes/details');

const config = require('../../cfg.js');

if (!config.funda.key || !config.google.key) {
	throw new Error('Missing apikey in env.');
}

app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(staticAsset(baseDir));
app.use(express.static(baseDir, {
	maxAge: 31557600000 // one year
}));
app.use(bodyParser.urlencoded({extended: true}));

// Connect the routers to routes
app.use('/search', searchRouter);
app.use('/details', detailsRouter);

app.get('/sw.js', (req, res) => {
	res.sendFile('client/js/sw.js', {root: './src'});
});

app.get('/manifest.json', (req, res) => {
	res.sendFile('client/manifest.json', {root: './src'});
});

app.get('/offline', (req, res) => {
	res.render('offline', {
		critical: 'index'
	});
});

app.get('/', (req, res) => {
	res.render("index", {
		critical: 'index'
	});
});

app.listen(port, (err) => {
	err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});