(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _App = require('./modules/App.js');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	var app = new _App2.default();
})(_App2.default); /*jshint esversion: 6 */

},{"./modules/App.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*jshint esversion: 6 */

var config = {
	funda: {
		key: '271175433a7c4fe2a45750d385dd9bfd',
		baseUrls: {
			search: 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json',
			objects: 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail',
			autoSuggest: 'http://zb.funda.info/frontend/json',
			map: 'http://mt1.funda.nl/maptiledata.ashx/json'
		}
	},
	google: {
		key: 'AIzaSyA5emTbr8ytwvzrw9NQW7zlXg1NubeDG5M',
		baseUrls: {
			maps: 'https://maps.googleapis.com/maps/api/geocode/json',
			roads: 'https://roads.googleapis.com/v1/nearestRoads'
		}
	},
	geoNames: {
		baseUrl: 'http://api.geonames.org/findNearbyStreetsOSMJSON?formatted=true&style=full',
		userName: 'frankwarnaar@gmail.com'
	}
};

exports.default = config;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion: 6 */

var _cfg = require('../cfg.js');

var _cfg2 = _interopRequireDefault(_cfg);

var _Controller = require('./Controller.js');

var _Controller2 = _interopRequireDefault(_Controller);

var _View = require('./View.js');

var _View2 = _interopRequireDefault(_View);

var _Store = require('./Store.js');

var _Store2 = _interopRequireDefault(_Store);

var _Utils = require('./Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.config = _cfg2.default;
		this.controller = new _Controller2.default(this);
		this.view = new _View2.default(this);
		this.store = new _Store2.default(this);
		this.utils = new _Utils2.default();
		this.init();
	}

	_createClass(App, [{
		key: 'getCoords',
		value: function getCoords() {
			return new Promise(function (resolve, reject) {
				if (navigator.geolocation.getCurrentPosition) {
					navigator.geolocation.getCurrentPosition(function (data) {
						resolve(data.coords);
					});
				} else {
					reject('Couldn\'t get the location from your browser');
				}
			});
		}
	}, {
		key: 'fetchRequest',
		value: function fetchRequest(url) {
			return new Promise(function (resolve, reject) {
				fetch(url).then(function (response) {
					if (response.status !== 200) {
						reject(response.status);
					} else {
						// Examine the text in the response
						response.json().then(function (data) {
							resolve(data);
						});
					}
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}, {
		key: 'handleRequest',
		value: function handleRequest(method, url) {
			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();

				xhr.open(method, url);

				xhr.onload = function () {
					if (this.status >= 200 && this.status < 300) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject({ status: this.status, statusText: xhr.statusText });
					}
				};

				xhr.onerror = function () {
					reject({ status: this.status, statusText: xhr.statusText });
				};

				xhr.send();
			});
		}
	}, {
		key: 'init',
		value: function init() {
			this.controller.init();
		}
	}]);

	return App;
}();

exports.default = App;

},{"../cfg.js":2,"./Controller.js":4,"./Store.js":5,"./Utils.js":6,"./View.js":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion: 6 */

var _routieMin = require('../vendor/routie.min.js');

var _routieMin2 = _interopRequireDefault(_routieMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller(app) {
		_classCallCheck(this, Controller);

		this.app = app;
	}

	_createClass(Controller, [{
		key: 'init',
		value: function init() {
			this.router();
			this.imageViewer();
			this.sortObjects();
			this.filterObjects();
		}
	}, {
		key: 'sortObjects',
		value: function sortObjects() {
			var _this = this;

			var $sortOption = document.querySelector('#sort');
			$sortOption.addEventListener('change', function () {
				_this.app.view.reoderObjects($sortOption.value);
			});
		}
	}, {
		key: 'filterObjects',
		value: function filterObjects() {
			var _this2 = this;

			var $types = document.querySelectorAll('[name="type"]');

			$types.forEach(function ($type) {
				$type.addEventListener('change', function (e) {
					var $checkedTypes = document.querySelectorAll('[name="type"]:checked');
					var checkedTypes = [];
					$checkedTypes.forEach(function ($type) {
						checkedTypes.push($type.value);
					});

					_this2.app.view.filterObjects(checkedTypes);
				});
			});
		}
	}, {
		key: 'imageViewer',
		value: function imageViewer() {
			var _this3 = this;

			var $imageContainer = document.querySelector('#image');
			var $closeImage = document.querySelector('#image a');

			$closeImage.addEventListener('click', function () {
				_this3.app.view.showElement($imageContainer, false);
			});
		}
	}, {
		key: 'router',
		value: function router() {
			var app = this.app;
			(0, _routieMin2.default)({
				// Detail page
				'details/:objectId/:type': function detailsObjectIdType(objectId, type) {
					var hash = window.location.hash;

					app.view.activatePage('#details');
					app.view.renderObject(objectId, type);

					app.store.lastLocation = hash;
				},

				// Fallback to starting page
				'*': function _() {
					var hash = window.location.hash;

					if (hash.includes('image')) {
						var imageUrl = hash.substr(7, hash.length - 1);
						app.view.renderImage(imageUrl);
					} else {
						app.view.renderObjects();
						app.view.activatePage('#results');
						app.view.showElement(document.querySelector('#image'), false);
						app.store.lastLocation = hash;
					}
				}
			});
		}
	}]);

	return Controller;
}();

exports.default = Controller;

},{"../vendor/routie.min.js":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var Store = function () {
	function Store(app) {
		_classCallCheck(this, Store);

		this.app = app;
	}

	_createClass(Store, [{
		key: 'getObjectsNearby',
		value: function getObjectsNearby() {
			var _this = this;

			return new Promise(function (resolve, reject) {
				// Get coordinates of users location
				_this.app.getCoords().then(function (coords) {
					// Get street of location
					_this.app.handleRequest('GET', _this.app.config.google.baseUrls.maps + '?latlng=' + coords.latitude + ',' + coords.longitude + '&key=' + _this.app.config.google.key).then(function (location) {
						var locationComponents = location.results[0].address_components;

						var street = locationComponents.filter(function (component) {
							return component.types.includes('route');
						})[0];
						street = street.long_name;

						var city = locationComponents.filter(function (component) {
							return component.types.includes('locality');
						})[0];
						city = city.long_name;

						var requests = [_this.app.fetchRequest(_this.app.config.funda.baseUrls.search + '/' + _this.app.config.funda.key + '?type=koop&zo=/' + city + '/' + street + '/+1km&page=1&pagesize=25'), _this.app.fetchRequest(_this.app.config.funda.baseUrls.search + '/' + _this.app.config.funda.key + '?type=huur&zo=/' + city + '/' + street + '/+1km&page=1&pagesize=25')];

						Promise.all(requests).then(function (results) {
							var streets = results.map(function (street) {
								return street.Objects;
							});

							// source array concatenation solution: http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#answer-37469411
							var objects = [].concat.apply([], streets);
							objects = [].concat(_toConsumableArray(new Set(objects)));

							_this.objects = objects;
							resolve(objects);
						});
					});
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}]);

	return Store;
}();

exports.default = Store;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, [{
		key: 'getStreet',
		value: function getStreet(components) {
			components = components.filter(function (component) {
				return component.types.includes('locality');
			});

			return components[0].long_name;
		}

		// Remove item from array if it contains a subtring

	}, {
		key: 'filterArray',
		value: function filterArray(array, values) {
			return array.filter(function (item) {
				if (values.includes('koop') && item.Koopprijs !== null) {
					return true;
				}

				if (values.includes('huur') && item.Huurprijs !== null) {
					return true;
				}

				return false;
			});
		}
	}, {
		key: 'sortArray',
		value: function sortArray(array, key) {
			return array.sort(function (a, b) {
				if (typeof a[key] === 'string') {
					return a[key].localeCompare(b[key]);
				} else {
					return a[key] - b[key];
				}
			});
		}
	}]);

	return Utils;
}();

exports.default = Utils;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var View = function () {
	function View(app) {
		_classCallCheck(this, View);

		this.app = app;

		this.$ = {
			results: document.querySelector('.results'),
			resultsList: document.querySelector('#results-list'),
			noResults: document.querySelector('.results p'),
			details: document.querySelector('#details'),
			imageContainer: document.querySelector('#image'),
			body: document.querySelector('body'),
			closeButton: document.querySelector('#image a'),
			lastImg: document.querySelector('#image img'),
			pages: Array.from(document.querySelectorAll('[data-page]')),
			loader: document.querySelector('.loader-container'),
			description: document.querySelector('.loader-container p')
		};
	}

	_createClass(View, [{
		key: 'renderObjects',
		value: function renderObjects() {
			var _this = this;

			// Check if there aren't any objects rendered yet
			if (this.$.resultsList.innerHTML.length === 0) {
				this.showLoader(true, true);
				this.app.store.getObjectsNearby().then(function (objects) {
					_this.renderList(objects);
				}).catch(function (err) {
					console.log(err);

					_this.$.results.insertAdjacentHTML('beforeend', 'Er is iets mis gegaan bij het ophalen van huizen in uw buurt. Probeer het later nog eens.');

					_this.showElement(_this.$.results, true);
					_this.showLoader(false);
				});
			}
		}
	}, {
		key: 'renderList',
		value: function renderList(objects) {
			var _this2 = this;

			this.clearView(this.$.resultsList);
			this.showElement(this.$.noResults, false);

			if (objects.length > 0) {
				this.app.store.objects = objects;
				// Render all the objects
				objects.map(function (object) {
					var $listItem = '\n\t\t\t\t<li data-id="' + object.Id + '">\n\t\t\t\t<img src="' + object.FotoLarge + '" alt="' + object.Adres + '">\n\t\t\t\t<a href="#details/' + object.Id + '/' + (object.Koopprijs ? 'koop' : 'huur') + '"><h2>' + object.Adres + '</h2></a>\n\t\t\t\t<span><strong>\u20AC' + (object.Koopprijs ? object.Koopprijs.toLocaleString('currency') : '') + (object.Huurprijs ? object.Huurprijs.toLocaleString('currency') + ' p/m' : '') + '</strong></span>\n\t\t\t\t' + (object.Woonoppervlakte ? '<span>' + object.Woonoppervlakte + 'm<sup>2</sup></span>' : '') + '\n\t\t\t\t</li>\n\t\t\t\t';

					_this2.$.resultsList.insertAdjacentHTML('beforeend', $listItem);
				});
			} else {
				this.showElement(this.$.noResults, true);
			}
			this.showElement(this.$.results, true);
			this.showLoader(false);
		}
	}, {
		key: 'renderObject',
		value: function renderObject(id, type) {
			var _this3 = this;

			this.app.view.showElement(this.$.imageContainer, false);

			// Check if the object isn't already rendered.
			if (this.app.store.lastDetailPage !== id) {
				this.clearView(this.$.details);
				this.showLoader(true, false);
				// Get details
				this.app.fetchRequest(this.app.config.funda.baseUrls.objects + '/' + this.app.config.funda.key + '/' + type + '/' + id).then(function (details) {
					_this3.app.store.lastDetailPage = id;

					// Get all the medium images of an object
					var gallery = '';
					details.Media.map(function (picture) {
						var bigPic = picture.MediaItems.filter(function (source) {
							if (source.Url.includes('middel')) {
								return source.Url;
							} else if (source.Url.includes('groot')) {
								return source.Url;
							} else if (source.Url.includes('grotere')) {
								return source.Url;
							}
						});

						picture.MediaItems.map(function (source) {
							if (source.Url.includes('middel')) {
								if (bigPic.length > 0) {
									gallery += '<a href="#image/' + bigPic[bigPic.length - 1].Url + '"><img src="' + source.Url + '" alt="' + details.Adres + '"></a>';
								}
							}
						});
					});

					// Filter description
					var descriptions = details.VolledigeOmschrijving.split('\n');
					descriptions = descriptions.filter(function (item) {
						return item.length > 0;
					});

					// Structure description
					var description = descriptions.reduce(function (buffer, item) {
						if (item[0] === '-') {
							return buffer + ' <li>' + item.substr(1, item.length - 1) + '</li>';
						}if (item[item.length - 2] === ':') {
							return buffer + ' <h3>' + item + '</h3>';
						} else {
							return buffer + ' <p>' + item + '</p>';
						}
					});

					// Set content
					var content = '\n\t\t\t\t<section class="object__images">\n\t\t\t\t\t<img src="' + details.HoofdFoto + '" alt=' + details.Adres + '>\n\t\t\t\t\t<section>\n\t\t\t\t\t\t' + gallery + '\n\t\t\t\t\t</section>\n\t\t\t\t</section>\n\t\t\t\t<section>\n\t\t\t\t\t<h1>' + details.Adres + '</h1>\n\t\t\t\t\t<h2>' + details.Postcode + ' ' + details.Plaats + '</h2>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Prijs:</dt><dd><strong>\u20AC\n\t\t\t\t\t\t' + (details.Koopprijs ? details.Koopprijs : details.Huurprijs) + '\n\t\t\t\t\t\t</strong></dd>\n\t\t\t\t\t\t<dt>Aantal kamers:</dt><dd>' + details.AantalKamers + '</dd>\n\t\t\t\t\t\t<dt>Aantal badkamers:</dt><dd>' + details.AantalBadkamers + '</dd>\n\t\t\t\t\t\t<dt>Bouwjaar:</dt><dd>' + details.Bouwjaar + '</dd>\n\t\t\t\t\t\t<dt>Oppervlakte:</dt><dd>' + details.WoonOppervlakte + ' m<sup>2</sup></dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<p>' + description + '</p>\n\t\t\t\t</section>\n\t\t\t\t';

					_this3.$.details.insertAdjacentHTML('beforeend', content);

					_this3.showLoader(false);
					_this3.showElement(_this3.$.details, true);
				}).catch(function (err) {
					console.log(err);
				});
			}
		}
	}, {
		key: 'renderImage',
		value: function renderImage(url) {

			this.$.body.classList.add('no-scroll');

			if (this.$.lastImg) {
				this.$.imageContainer.removeChild(this.$.lastImg);
			}

			if (this.app.store.lastLocation) {
				this.$.closeButton.setAttribute('href', this.app.store.lastLocation);
			}

			this.$.imageContainer.insertAdjacentHTML('beforeend', '<img src="' + url + '"/>');
			this.showElement(this.$.imageContainer, true);
		}
	}, {
		key: 'reoderObjects',
		value: function reoderObjects(sortOption) {
			this.app.store.objects = this.app.utils.sortArray(this.app.store.objects, sortOption);
			this.app.store.objects.map(function (object, i) {
				document.querySelector('[data-id="' + object.Id + '"]').style.order = i;
			});
		}
	}, {
		key: 'filterObjects',
		value: function filterObjects(checkedTypes) {
			this.app.store.filteredObjects = this.app.utils.filterArray(this.app.store.objects, checkedTypes);
			this.renderList(this.app.store.filteredObjects);
		}

		// Make the current page visible and all the other invisible

	}, {
		key: 'activatePage',
		value: function activatePage(route) {
			var _this4 = this;

			this.$.pages.forEach(function ($page) {
				if ('#' + $page.getAttribute('id') === route) {
					_this4.showElement($page, true);
				} else {
					_this4.showElement($page, false);
				}
			});
		}
	}, {
		key: 'showLoader',
		value: function showLoader(show, content) {
			this.showElement(this.$.loader, show);
			this.showElement(this.$.description, content);
		}
	}, {
		key: 'showElement',
		value: function showElement($el, show) {
			if (show) {
				$el.classList.remove('hidden');
			} else {
				$el.classList.add('hidden');
			}
		}
	}, {
		key: 'clearView',
		value: function clearView($el) {
			$el.innerHTML = '';
		}
	}]);

	return View;
}();

exports.default = View;

},{}],8:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2016
 * MIT License
*/
var Routie = function Routie(a, b) {
  var c = [],
      d = {},
      e = "routie",
      f = a[e],
      g = function g(a, b) {
    this.name = b, this.path = a, this.keys = [], this.fns = [], this.params = {}, this.regex = h(this.path, this.keys, !1, !1);
  };g.prototype.addHandler = function (a) {
    this.fns.push(a);
  }, g.prototype.removeHandler = function (a) {
    for (var b = 0, c = this.fns.length; c > b; b++) {
      var d = this.fns[b];if (a == d) return void this.fns.splice(b, 1);
    }
  }, g.prototype.run = function (a) {
    for (var b = 0, c = this.fns.length; c > b; b++) {
      this.fns[b].apply(this, a);
    }
  }, g.prototype.match = function (a, b) {
    var c = this.regex.exec(a);if (!c) return !1;for (var d = 1, e = c.length; e > d; ++d) {
      var f = this.keys[d - 1],
          g = "string" == typeof c[d] ? decodeURIComponent(c[d]) : c[d];f && (this.params[f.name] = g), b.push(g);
    }return !0;
  }, g.prototype.toURL = function (a) {
    var b = this.path;for (var c in a) {
      b = b.replace("/:" + c, "/" + a[c]);
    }if (b = b.replace(/\/:.*\?/g, "/").replace(/\?/g, ""), -1 != b.indexOf(":")) throw new Error("missing parameters for url: " + b);return b;
  };var h = function h(a, b, c, d) {
    return a instanceof RegExp ? a : (a instanceof Array && (a = "(" + a.join("|") + ")"), a = a.concat(d ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (a, c, d, e, f, g) {
      return b.push({ name: e, optional: !!g }), c = c || "", "" + (g ? "" : c) + "(?:" + (g ? c : "") + (d || "") + (f || d && "([^/.]+?)" || "([^/]+?)") + ")" + (g || "");
    }).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)"), new RegExp("^" + a + "$", c ? "" : "i"));
  },
      i = function i(a, b) {
    var e = a.split(" "),
        f = 2 == e.length ? e[0] : null;a = 2 == e.length ? e[1] : e[0], d[a] || (d[a] = new g(a, f), c.push(d[a])), d[a].addHandler(b);
  },
      j = function j(a, b) {
    if ("function" == typeof b) i(a, b), j.reload();else if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
      for (var c in a) {
        i(c, a[c]);
      }j.reload();
    } else "undefined" == typeof b && j.navigate(a);
  };j.lookup = function (a, b) {
    for (var d = 0, e = c.length; e > d; d++) {
      var f = c[d];if (f.name == a) return f.toURL(b);
    }
  }, j.remove = function (a, b) {
    var c = d[a];c && c.removeHandler(b);
  }, j.removeAll = function () {
    d = {}, c = [];
  }, j.navigate = function (a, b) {
    b = b || {};var c = b.silent || !1;c && o(), setTimeout(function () {
      window.location.hash = a, c && setTimeout(function () {
        n();
      }, 1);
    }, 1);
  }, j.noConflict = function () {
    return a[e] = f, j;
  };var k = function k() {
    return window.location.hash.substring(1);
  },
      l = function l(a, b) {
    var c = [];return b.match(a, c) ? (b.run(c), !0) : !1;
  },
      m = j.reload = function () {
    for (var a = k(), b = 0, d = c.length; d > b; b++) {
      var e = c[b];if (l(a, e)) return;
    }
  },
      n = function n() {
    a.addEventListener ? a.addEventListener("hashchange", m, !1) : a.attachEvent("onhashchange", m);
  },
      o = function o() {
    a.removeEventListener ? a.removeEventListener("hashchange", m) : a.detachEvent("onhashchange", m);
  };return n(), b ? j : void (a[e] = j);
};"undefined" == typeof module ? Routie(window) : module.exports = Routie(window, !0);

},{}]},{},[1])

//# sourceMappingURL=app.js.map
