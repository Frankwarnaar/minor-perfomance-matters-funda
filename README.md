# Serverside Funda app

This project is a progressive web app made for my Minor Everything Web, for Funda. You can search houses available for buying with the app.

## Installation

### Environment variables
You need an ```.env``` file with a Funda API key and a Google API key. There is a ```.env.sample``` in the root of the project. Save this as ```.env```. Replace the keys with your own working keys.


```
$ npm install
$ npm run production
```

## Scripts

### General scripts
Build all the javascript files in the project and run a server on ```localhost:3000```.
```
$ npm run production
```

Start watching javascript files and less files. Rebundle or rebuild them on changes. Besides, a server starts running on ```localhost:3000```
```
$ npm run dev
```

Build all the files needed for production
```
$ npm run build
```

Watch ```.js``` files and ```.less``` files for changes.
```
$ npm run watch
```

Get the project on a public domain running.
```
$ npm run expose
```

### Javascript

#### Build once
Build all the javascript files in the project
```
$ npm run js
```

Build the app javascript
```
$ npm run js:app
```

Build the service worker with sourcemaps
```
$ npm run js:sw:dev
```

Build the service worker without sourcemaps
```
$ npm run js:sw:prod
```

#### Watch
Watch all the javascript files in the project, build on changes.
```
$ npm run watch:js
```

Watch the app javascript for changes, then build
```
$ npm run watch:js:app
```

Watch the service worker for changes, then build
```
$ npm run watch:js:sw
```

### Less

Compile less once
```
$ npm run less
```

Watch less files for changes, then build
```
npm run watch:less
```

## Audits

### 1.Critical css [feature/critical-css](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/critical-css)
Before:
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/critical_css/before.png)

After:
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/critical_css/after.png)

I reduced the first paint time from ```515ms``` to ```366ms```. This is an improvement of ```40,7%```.

### 2.Gzip [feature/gzip](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/gzip)
Before:
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/esmangle/before.png)

After:
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/esmangle/after.png)

I enabled gzip compression on my express server. This reduced the transfer size of my html, js, css and images with ```65%```, according to [Page Speed Insigh](https://developers.google.com/speed/pagespeed/insights/).

### 3.Mangled javascript [feature/minify-js](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/minify-js)
Before:
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/esmangle/before.png)

After:
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/esmangle/after.png)

I minified and mangled my javascript. This reduced the size of my bundled javascript from ```10.2kb``` to ```7.2kb```. This is an improvement of ```41.7%```. Besides that, mangling and minifying my javascript made the bundle load ```200ms``` faster. (```374ms```, ```174ms``` after). This is an improvement of ```114.9%```.

### 4.Service worker [feature/service-worker](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/service-worker)
Before (second load):
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/sw/before.png)

After (second load):
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/sw/after.png)

I setup a serviceworker, to cache my static files, pages and images. On the second time of loading my overview page, this reduced the total transfer size from ```1.4MB``` to ```11.5 kb```. This is a reducement of ```99.2%```. Besides that, the service worker makes visited pages offline available. The total load time reduced from ```15.57s``` to ```1.47s```. This is a reducement of ```90,5%```.

### 5.Picture elements for responsive images [feature/lazyload](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/lazyload)
Before:
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/picture/before.png)

After:
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/picture/after.png)

With the picture element I made sure the user doesn't load a bigger image than necessary. On smaller screens, this reduced the total transer size from ```1020kb``` to ```340kb```. This is a reducement of ```66,7%```. The transfer time was reduced from ```10.91s``` to ```3.69s```. This is a reducement of ```66,2%```. 

### 6.Lazyloading images [feature/lazyload](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/lazyload)
Before:
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/lazyload/before.png)

After:
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/lazyload/after.png)

With the library [Lazyload](http://verlok.github.io/lazyload/), I reduced the images being loaded instantly. Now only the images are getting loaded that are (almost) in the viewport. On mobile, this reduced the total transfer size from ```913kb``` to ```206kb```. This is a reducement of `77,4%`. The page load reduced from ```10.41s``` to `4.71s`. This is a reducement of `54,8%`.


