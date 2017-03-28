serviceWorker = {
	init() {
		this.bindEvents();
	},
	bindEvents() {
		self.addEventListener('install', event => event.waitUntil(
			caches.open('funda-v1-core')
			.then(cache => cache.addAll([
				'/css/app.css',
				'/js/bundle.js',
				'/fonts/proximanova/proximanova-regular.woff2',
				'/fonts/proximanova/proximanova-semibold.woff2',
				'/img/logos/funda.svg',
				'/manifest.json',
				'/offline/'
			]))
			.then(self.skipWaiting())
		));

		self.addEventListener('fetch', event => {
			const req = event.request;
			if (req.mode === 'navigate') {
				event.respondWith(
					fetch(req)
					.then(res => this.pages.cache(req, res))
					.catch(err => this.pages.getCached(req))
					.catch(err => this.coreFiles.fetch('/offline/'))
				);
			} else {
				event.respondWith(
					fetch(req)
					.catch(err => this.coreFiles.fetch(req.url))
					.catch(err => this.coreFiles.fetch('/offline/'))
				);
			}
		});
	},
	coreFiles: {
		fetch(url) {
			return caches.open('funda-v1-core')
				.then(cache => cache.match(url))
				.then(response => response ? response : Promise.reject());
		}
	},
	pages: {
		cache(req, res) {
			const clonedRes = res.clone();
			caches.open('funda-v1-pages')
				.then(cache => cache.put(req, clonedRes));
			return res;
		},
		getCached(req) {
			return caches.open('funda-v1-pages')
				.then(cache => cache.match(req))
				.then(res => res ? res : Promise.reject());
		}
	}
};

serviceWorker.init();