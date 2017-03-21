const Controller = require('./Controller.js');
const View = require('./View.js');

class App {
	constructor() {
		this.controller = new Controller(this);
		this.view       = new View(this);
		this.init();
	}

	getCoords() {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(data => {
					resolve(data.coords);
				});
			} else {
				reject(`Couldn't get the location from your browser`);
			}
		});
	}

	init() {
		this.controller.init();
	}
}

module.exports = App;