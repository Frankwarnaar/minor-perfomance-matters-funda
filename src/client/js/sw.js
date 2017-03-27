self.addEventListener('install', event => event.waitUntil(
	caches.open('funda-v1-core')
	.then(cache => cache.addAll([
		'/css/app.css',
		'/js/bundle.js',
	]))
	.then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
	const request = event.request;
	if (request.mode !== 'navigate') {
		event.respondWith(
			fetch(request)
			.catch(err => fetchCoreFile(request.url))
		);
	}
});

function fetchCoreFile(url) {
	return caches.open('funda-v1-core')
	.then(cache => cache.match(url))
	.then(response => response ? response : Promise.reject());
}