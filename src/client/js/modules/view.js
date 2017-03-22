class View {
	constructor(app) {
		this.app = app;
	}

	renderCoords(coords) {
		this.app.$.footer.className = '';
		this.app.$.lat.value = coords.latitude;
		this.app.$.long.value = coords.longitude;
	}

	renderCarousel(url) {
		this.app.$.modalImage.setAttribute('src', url);
		this.app.$.body.classList.add('no-scroll');
		this.showEl(this.app.$.modal, true);
	}

	closeModal() {
		this.app.$.body.classList.remove('no-scroll');
		this.app.view.showEl(this.app.$.modal, false);
	}

	showEl($el, show) {
		if (show) {
			$el.classList.remove('hidden');
		} else {
			$el.classList.add('hidden');
		}
	}
}

module.exports = View;