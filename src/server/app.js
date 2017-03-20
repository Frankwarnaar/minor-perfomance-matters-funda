const express = require('express'),
	path = require('path');

const app = express();
const port = 3000;
const baseDir = 'build/client';

app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(baseDir));

app.get('/', (req, res, next) => {
	res.render("index");
});

app.listen(port, (err) => {
	err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});