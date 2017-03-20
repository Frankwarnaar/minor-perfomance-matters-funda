const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const baseDir = 'build';

app.use('/static', express.static(path.join(__dirname, baseDir), { etag: false, lastModified: false }));

app.get('*', (req, res, next) => {
	res.render(path.join('./', req.url, 'index.html'), {});
});

app.listen(port, (err) => {
	err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});