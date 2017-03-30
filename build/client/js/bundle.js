(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var App = require('./modules/App.js');

(function () {
	'use strict';

	var app = new App();
})(App);

},{"./modules/App.js":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		var Controller = require('./Controller.js');
		var View = require('./View.js');

		this.$ = {
			body: document.querySelector('body'),
			escapeHatch: document.querySelector('body > header a'),
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
		this.view = new View(this);
		this.init();
	}

	_createClass(App, [{
		key: 'init',
		value: function init() {
			this.controller.init();
			this.observeFonts();

			var lazyload = new LazyLoad({
				effect: 'fadeIn',
				threshold: 100
			});
		}
	}, {
		key: 'getCoords',
		value: function getCoords() {
			return new Promise(function (resolve, reject) {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (data) {
						resolve(data.coords);
					});
				} else {
					reject('Couldn\'t get the location from your browser');
				}
			});
		}
	}, {
		key: 'observeFonts',
		value: function observeFonts() {
			var html = document.documentElement;
			if ('Promise' in navigator) {
				var regular = new FontFaceObserver('proximanova', { weight: 400 }).load();
				var semibold = new FontFaceObserver('proximanova', { weight: 600 }).load();
				Promise.all([regular, semibold]).then(function () {
					html.classList.add('fonts-loaded');
				});
			} else {
				html.classList.add('fonts-loaded');
			}
		}
	}]);

	return App;
}();

module.exports = App;

},{"./Controller.js":3,"./View.js":4}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller(app) {
		_classCallCheck(this, Controller);

		this.app = app;
	}

	_createClass(Controller, [{
		key: 'init',
		value: function init() {
			this.housesNearby();
			this.carousel();
		}
	}, {
		key: 'housesNearby',
		value: function housesNearby() {
			var _this = this;

			if (this.app.$.footer) {
				this.app.getCoords().then(function (coords) {
					_this.app.view.renderCoords(coords);
				});
			}
		}
	}, {
		key: 'carousel',
		value: function carousel() {
			var _this2 = this;

			if (this.app.$.carousel) {
				this.app.$.carouselImages.forEach(function ($image) {
					$image.addEventListener('click', function (e) {
						_this2.app.view.renderCarousel($image.getAttribute('href'));
						e.preventDefault();
					});
				});
			}

			if (this.app.$.modalClose) {
				this.app.$.modalClose.addEventListener('click', function () {
					_this2.app.view.closeModal();
				});
			}
		}
	}]);

	return Controller;
}();

module.exports = Controller;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
	function View(app) {
		_classCallCheck(this, View);

		this.app = app;
	}

	_createClass(View, [{
		key: 'renderCoords',
		value: function renderCoords(coords) {
			this.app.$.footer.className = '';
			this.app.$.lat.value = coords.latitude;
			this.app.$.long.value = coords.longitude;
		}
	}, {
		key: 'renderCarousel',
		value: function renderCarousel(url) {
			this.app.$.modalImage.setAttribute('src', url);
			this.app.$.body.classList.add('no-scroll');
			this.showEl(this.app.$.modal, true);

			this.disableLinks(true);
		}
	}, {
		key: 'closeModal',
		value: function closeModal() {
			this.disableLinks(false);
			this.app.$.body.classList.remove('no-scroll');
			this.app.view.showEl(this.app.$.modal, false);
		}
	}, {
		key: 'disableLinks',
		value: function disableLinks(disabled) {
			this.app.$.escapeHatch.setAttribute('tabindex', disabled ? '-1' : '0');
			Array.from(this.app.$.carouselImages).forEach(function ($thumb) {
				$thumb.setAttribute('tabindex', disabled ? '-1' : '0');
			});
		}
	}, {
		key: 'showEl',
		value: function showEl($el, show) {
			if (show) {
				$el.classList.remove('hidden');
			} else {
				$el.classList.add('hidden');
			}
		}
	}]);

	return View;
}();

module.exports = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xpZW50L2pzL2FwcC5qcyIsInNyYy9jbGllbnQvanMvbW9kdWxlcy9BcHAuanMiLCJzcmMvY2xpZW50L2pzL21vZHVsZXMvQ29udHJvbGxlci5qcyIsInNyYy9jbGllbnQvanMvbW9kdWxlcy9WaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sUUFBUSxrQkFBUixDQUFaOztBQUVBLENBQUMsWUFBTTtBQUNOOztBQUVBLEtBQU0sTUFBTSxJQUFJLEdBQUosRUFBWjtBQUVBLENBTEQsRUFLRyxHQUxIOzs7Ozs7Ozs7SUNETSxHO0FBQ0wsZ0JBQWM7QUFBQTs7QUFDYixNQUFNLGFBQWEsUUFBUSxpQkFBUixDQUFuQjtBQUNBLE1BQU0sT0FBTyxRQUFRLFdBQVIsQ0FBYjs7QUFFQSxPQUFLLENBQUwsR0FBUztBQUNSLFNBQU0sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBREU7QUFFUixnQkFBYSxTQUFTLGFBQVQsQ0FBdUIsaUJBQXZCLENBRkw7QUFHUixXQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUhBO0FBSVIsUUFBSyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FKRztBQUtSLFNBQU0sU0FBUyxjQUFULENBQXdCLE1BQXhCLENBTEU7QUFNUixhQUFVLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FORjtBQU9SLG1CQUFnQixTQUFTLGdCQUFULENBQTBCLG1CQUExQixDQVBSO0FBUVIsVUFBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FSQztBQVNSLGVBQVksU0FBUyxhQUFULENBQXVCLFlBQXZCLENBVEo7QUFVUixlQUFZLFNBQVMsYUFBVCxDQUF1QixlQUF2QjtBQVZKLEdBQVQ7O0FBYUEsT0FBSyxVQUFMLEdBQWtCLElBQUksVUFBSixDQUFlLElBQWYsQ0FBbEI7QUFDQSxPQUFLLElBQUwsR0FBa0IsSUFBSSxJQUFKLENBQVMsSUFBVCxDQUFsQjtBQUNBLE9BQUssSUFBTDtBQUNBOzs7O3lCQUVNO0FBQ04sUUFBSyxVQUFMLENBQWdCLElBQWhCO0FBQ0EsUUFBSyxZQUFMOztBQUVBLE9BQU0sV0FBVyxJQUFJLFFBQUosQ0FBYTtBQUM3QixZQUFRLFFBRHFCO0FBRTdCLGVBQVc7QUFGa0IsSUFBYixDQUFqQjtBQUtBOzs7OEJBRVc7QUFDWCxVQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsUUFBSSxVQUFVLFdBQWQsRUFBMkI7QUFDMUIsZUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxnQkFBUTtBQUNoRCxjQUFRLEtBQUssTUFBYjtBQUNBLE1BRkQ7QUFHQSxLQUpELE1BSU87QUFDTjtBQUNBO0FBQ0QsSUFSTSxDQUFQO0FBU0E7OztpQ0FFYztBQUNkLE9BQU0sT0FBTyxTQUFTLGVBQXRCO0FBQ0EsT0FBSSxhQUFhLFNBQWpCLEVBQTRCO0FBQzNCLFFBQU0sVUFBVSxJQUFJLGdCQUFKLENBQXFCLGFBQXJCLEVBQW9DLEVBQUMsUUFBUSxHQUFULEVBQXBDLEVBQW1ELElBQW5ELEVBQWhCO0FBQ0EsUUFBTSxXQUFXLElBQUksZ0JBQUosQ0FBcUIsYUFBckIsRUFBb0MsRUFBQyxRQUFRLEdBQVQsRUFBcEMsRUFBbUQsSUFBbkQsRUFBakI7QUFDQSxZQUFRLEdBQVIsQ0FBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQVosRUFBaUMsSUFBakMsQ0FBc0MsWUFBTTtBQUMzQyxVQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLGNBQW5CO0FBQ0EsS0FGRDtBQUdBLElBTkQsTUFNTztBQUNOLFNBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsY0FBbkI7QUFDQTtBQUNEOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsR0FBakI7Ozs7Ozs7OztJQzdETSxVO0FBQ0wscUJBQVksR0FBWixFQUFpQjtBQUFBOztBQUNoQixPQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0E7Ozs7eUJBRU07QUFDTixRQUFLLFlBQUw7QUFDQSxRQUFLLFFBQUw7QUFDQTs7O2lDQUVjO0FBQUE7O0FBQ2QsT0FBSSxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQVcsTUFBZixFQUF1QjtBQUN0QixTQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLElBQXJCLENBQTBCLGtCQUFVO0FBQ25DLFdBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxZQUFkLENBQTJCLE1BQTNCO0FBQ0EsS0FGRDtBQUdBO0FBQ0Q7Ozs2QkFFVTtBQUFBOztBQUNWLE9BQUksS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLFFBQWYsRUFBeUI7QUFDeEIsU0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLGNBQVgsQ0FBMEIsT0FBMUIsQ0FBa0Msa0JBQVU7QUFDM0MsWUFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDLENBQUQsRUFBTztBQUN2QyxhQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsY0FBZCxDQUE2QixPQUFPLFlBQVAsQ0FBb0IsTUFBcEIsQ0FBN0I7QUFDQSxRQUFFLGNBQUY7QUFDQSxNQUhEO0FBSUEsS0FMRDtBQU1BOztBQUVELE9BQUksS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLFVBQWYsRUFBMkI7QUFDMUIsU0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLFVBQVgsQ0FBc0IsZ0JBQXRCLENBQXVDLE9BQXZDLEVBQWdELFlBQU07QUFDckQsWUFBSyxHQUFMLENBQVMsSUFBVCxDQUFjLFVBQWQ7QUFDQSxLQUZEO0FBR0E7QUFDRDs7Ozs7O0FBR0YsT0FBTyxPQUFQLEdBQWlCLFVBQWpCOzs7Ozs7Ozs7SUNwQ00sSTtBQUNMLGVBQVksR0FBWixFQUFpQjtBQUFBOztBQUNoQixPQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0E7Ozs7K0JBRVksTSxFQUFRO0FBQ3BCLFFBQUssR0FBTCxDQUFTLENBQVQsQ0FBVyxNQUFYLENBQWtCLFNBQWxCLEdBQThCLEVBQTlCO0FBQ0EsUUFBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLEdBQVgsQ0FBZSxLQUFmLEdBQXVCLE9BQU8sUUFBOUI7QUFDQSxRQUFLLEdBQUwsQ0FBUyxDQUFULENBQVcsSUFBWCxDQUFnQixLQUFoQixHQUF3QixPQUFPLFNBQS9CO0FBQ0E7OztpQ0FFYyxHLEVBQUs7QUFDbkIsUUFBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLFVBQVgsQ0FBc0IsWUFBdEIsQ0FBbUMsS0FBbkMsRUFBMEMsR0FBMUM7QUFDQSxRQUFLLEdBQUwsQ0FBUyxDQUFULENBQVcsSUFBWCxDQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixXQUE5QjtBQUNBLFFBQUssTUFBTCxDQUFZLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FBVyxLQUF2QixFQUE4QixJQUE5Qjs7QUFFQSxRQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDQTs7OytCQUVZO0FBQ1osUUFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0EsUUFBSyxHQUFMLENBQVMsQ0FBVCxDQUFXLElBQVgsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsV0FBakM7QUFDQSxRQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsTUFBZCxDQUFxQixLQUFLLEdBQUwsQ0FBUyxDQUFULENBQVcsS0FBaEMsRUFBdUMsS0FBdkM7QUFDQTs7OytCQUVZLFEsRUFBVTtBQUN0QixRQUFLLEdBQUwsQ0FBUyxDQUFULENBQVcsV0FBWCxDQUF1QixZQUF2QixDQUFvQyxVQUFwQyxFQUFnRCxXQUFXLElBQVgsR0FBa0IsR0FBbEU7QUFDQSxTQUFNLElBQU4sQ0FBVyxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQVcsY0FBdEIsRUFBc0MsT0FBdEMsQ0FBOEMsa0JBQVU7QUFDdkQsV0FBTyxZQUFQLENBQW9CLFVBQXBCLEVBQWdDLFdBQVcsSUFBWCxHQUFrQixHQUFsRDtBQUNBLElBRkQ7QUFHQTs7O3lCQUVNLEcsRUFBSyxJLEVBQU07QUFDakIsT0FBSSxJQUFKLEVBQVU7QUFDVCxRQUFJLFNBQUosQ0FBYyxNQUFkLENBQXFCLFFBQXJCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sUUFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixRQUFsQjtBQUNBO0FBQ0Q7Ozs7OztBQUdGLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBBcHAgPSByZXF1aXJlKCcuL21vZHVsZXMvQXBwLmpzJyk7XG5cbigoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5cbn0pKEFwcCk7IiwiXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRjb25zdCBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9Db250cm9sbGVyLmpzJyk7XG5cdFx0Y29uc3QgVmlldyA9IHJlcXVpcmUoJy4vVmlldy5qcycpO1xuXG5cdFx0dGhpcy4kID0ge1xuXHRcdFx0Ym9keTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxuXHRcdFx0ZXNjYXBlSGF0Y2g6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBoZWFkZXIgYScpLFxuXHRcdFx0Zm9vdGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJyksXG5cdFx0XHRsYXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYXQnKSxcblx0XHRcdGxvbmc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb25nJyksXG5cdFx0XHRjYXJvdXNlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9iamVjdF9faW1hZ2VzJyksXG5cdFx0XHRjYXJvdXNlbEltYWdlczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9iamVjdF9faW1hZ2VzIGEnKSxcblx0XHRcdG1vZGFsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKSxcblx0XHRcdG1vZGFsSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCBpbWcnKSxcblx0XHRcdG1vZGFsQ2xvc2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCBidXR0b24nKVxuXHRcdH07XG5cblx0XHR0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzKTtcblx0XHR0aGlzLnZpZXcgICAgICAgPSBuZXcgVmlldyh0aGlzKTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dGhpcy5jb250cm9sbGVyLmluaXQoKTtcblx0XHR0aGlzLm9ic2VydmVGb250cygpO1xuXG5cdFx0Y29uc3QgbGF6eWxvYWQgPSBuZXcgTGF6eUxvYWQoe1xuXHRcdFx0ZWZmZWN0OiAnZmFkZUluJyxcblx0XHRcdHRocmVzaG9sZDogMTAwLFxuXHRcdH0pO1xuXG5cdH1cblxuXHRnZXRDb29yZHMoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcblx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihkYXRhID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGRhdGEuY29vcmRzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZWplY3QoYENvdWxkbid0IGdldCB0aGUgbG9jYXRpb24gZnJvbSB5b3VyIGJyb3dzZXJgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG9ic2VydmVGb250cygpIHtcblx0XHRjb25zdCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdGlmICgnUHJvbWlzZScgaW4gbmF2aWdhdG9yKSB7XG5cdFx0XHRjb25zdCByZWd1bGFyID0gbmV3IEZvbnRGYWNlT2JzZXJ2ZXIoJ3Byb3hpbWFub3ZhJywge3dlaWdodDogNDAwfSkubG9hZCgpO1xuXHRcdFx0Y29uc3Qgc2VtaWJvbGQgPSBuZXcgRm9udEZhY2VPYnNlcnZlcigncHJveGltYW5vdmEnLCB7d2VpZ2h0OiA2MDB9KS5sb2FkKCk7XG5cdFx0XHRQcm9taXNlLmFsbChbcmVndWxhciwgc2VtaWJvbGRdKS50aGVuKCgpID0+IHtcblx0XHRcdFx0aHRtbC5jbGFzc0xpc3QuYWRkKCdmb250cy1sb2FkZWQnKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRodG1sLmNsYXNzTGlzdC5hZGQoJ2ZvbnRzLWxvYWRlZCcpO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCJjbGFzcyBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHRoaXMuaG91c2VzTmVhcmJ5KCk7XG5cdFx0dGhpcy5jYXJvdXNlbCgpO1xuXHR9XG5cblx0aG91c2VzTmVhcmJ5KCkge1xuXHRcdGlmICh0aGlzLmFwcC4kLmZvb3Rlcikge1xuXHRcdFx0dGhpcy5hcHAuZ2V0Q29vcmRzKCkudGhlbihjb29yZHMgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcC52aWV3LnJlbmRlckNvb3Jkcyhjb29yZHMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Y2Fyb3VzZWwoKSB7XG5cdFx0aWYgKHRoaXMuYXBwLiQuY2Fyb3VzZWwpIHtcblx0XHRcdHRoaXMuYXBwLiQuY2Fyb3VzZWxJbWFnZXMuZm9yRWFjaCgkaW1hZ2UgPT4ge1xuXHRcdFx0XHQkaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuYXBwLnZpZXcucmVuZGVyQ2Fyb3VzZWwoJGltYWdlLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuYXBwLiQubW9kYWxDbG9zZSkge1xuXHRcdFx0dGhpcy5hcHAuJC5tb2RhbENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcC52aWV3LmNsb3NlTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xsZXI7IiwiY2xhc3MgVmlldyB7XG5cdGNvbnN0cnVjdG9yKGFwcCkge1xuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHR9XG5cblx0cmVuZGVyQ29vcmRzKGNvb3Jkcykge1xuXHRcdHRoaXMuYXBwLiQuZm9vdGVyLmNsYXNzTmFtZSA9ICcnO1xuXHRcdHRoaXMuYXBwLiQubGF0LnZhbHVlID0gY29vcmRzLmxhdGl0dWRlO1xuXHRcdHRoaXMuYXBwLiQubG9uZy52YWx1ZSA9IGNvb3Jkcy5sb25naXR1ZGU7XG5cdH1cblxuXHRyZW5kZXJDYXJvdXNlbCh1cmwpIHtcblx0XHR0aGlzLmFwcC4kLm1vZGFsSW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xuXHRcdHRoaXMuYXBwLiQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1zY3JvbGwnKTtcblx0XHR0aGlzLnNob3dFbCh0aGlzLmFwcC4kLm1vZGFsLCB0cnVlKTtcblxuXHRcdHRoaXMuZGlzYWJsZUxpbmtzKHRydWUpO1xuXHR9XG5cblx0Y2xvc2VNb2RhbCgpIHtcblx0XHR0aGlzLmRpc2FibGVMaW5rcyhmYWxzZSk7XG5cdFx0dGhpcy5hcHAuJC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXNjcm9sbCcpO1xuXHRcdHRoaXMuYXBwLnZpZXcuc2hvd0VsKHRoaXMuYXBwLiQubW9kYWwsIGZhbHNlKTtcblx0fVxuXG5cdGRpc2FibGVMaW5rcyhkaXNhYmxlZCkge1xuXHRcdHRoaXMuYXBwLiQuZXNjYXBlSGF0Y2guc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIGRpc2FibGVkID8gJy0xJyA6ICcwJyk7XG5cdFx0QXJyYXkuZnJvbSh0aGlzLmFwcC4kLmNhcm91c2VsSW1hZ2VzKS5mb3JFYWNoKCR0aHVtYiA9PiB7XG5cdFx0XHQkdGh1bWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIGRpc2FibGVkID8gJy0xJyA6ICcwJyk7XG5cdFx0fSk7XG5cdH1cblxuXHRzaG93RWwoJGVsLCBzaG93KSB7XG5cdFx0aWYgKHNob3cpIHtcblx0XHRcdCRlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7Il19
