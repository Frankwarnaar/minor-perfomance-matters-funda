const routie = require('../vendor/routie.min.js');

class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.app.getCoords().then(coords => {
			this.app.view.render(coords);
		});
	}
}

module.exports = Controller;