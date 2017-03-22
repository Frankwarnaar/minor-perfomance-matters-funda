const Controller = require('./Controller.js');
const View = require('./View.js');

class App {
	constructor() {
		this.$ = {
			body: document.querySelector('body'),
			footer: document.getElementById('footer'),
			lat: document.getElementById('lat'),
			long: document.getElementById('long'),
			carousel: document.querySelector('.object__images'),
			carouselImages: document.querySelectorAll('.object__images a'),
			modal: document.querySelector('.modal'),
			modalImage: document.querySelector('.modal img'),
			modalClose: document.querySelector('.modal button')
		};

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