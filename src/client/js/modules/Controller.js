const routie = require('../vendor/routie.min.js');

class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.housesNearby();
		this.carousel();
	}

	housesNearby() {
		if (this.app.$.footer) {
			this.app.getCoords().then(coords => {
				this.app.view.renderCoords(coords);
			});
		}
	}

	carousel() {
		if (this.app.$.carousel) {
			this.app.$.carouselImages.forEach($image => {
				$image.addEventListener('click', (e) => {
					this.app.view.renderCarousel($image.getAttribute('href'));
					e.preventDefault();
				});
			});
		}

		if (this.app.$.modalClose) {
			this.app.$.modalClose.addEventListener('click', () => {
				this.app.view.closeModal();
			});
		}
	}
}

module.exports = Controller;