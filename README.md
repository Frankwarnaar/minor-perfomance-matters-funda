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

### Global development
Build all the javascript files in the project and run a server on ```localhost:3000```.
```
$ npm run production
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

Start watching javascript files and less files. Rebundle or rebuild them on changes. Besides, a server starts running on ```localhost:3000```
```
$ npm run dev
```

Build all the files needed for production
```
$ npm run build
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

## Less

Compile less once
```
$ npm run less
```

Watch less files for changes, then build
```
npm run watch:less
```

## Watch
Watch ```.js``` files and ```.less``` files for changes.
