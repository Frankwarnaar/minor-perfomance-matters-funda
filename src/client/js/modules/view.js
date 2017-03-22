class View {
	constructor(app) {
		this.app = app;
		this.$ = {
			footer: document.getElementById('footer'),
			lat: document.getElementById('lat'),
			long: document.getElementById('long')
		};
	}

	render(coords) {
		this.$.footer.className = '';
		this.$.lat.value = coords.latitude;
		this.$.long.value = coords.longitude;
	}
}

module.exports = View;