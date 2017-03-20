const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const baseDir = 'build/client';

const searchRouter = require('./routes/search');

const config = require('../../cfg.js');

if (!config.funda.key || !config.google.key || !config.geoNames.userName) {
  throw new Error('Missing apikey in env.');
}

console.log(config);

app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(baseDir));
app.use(bodyParser.urlencoded({extended: true}));

// Connect the routers to routes
app.use('/search', searchRouter);

app.get('/', (req, res) => {
	res.render("index");
});

app.listen(port, (err) => {
	err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});