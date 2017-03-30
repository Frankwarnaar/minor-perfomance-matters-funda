# Serverside Funda app

This project is a progressive web app made for my Minor Everything Web, for Funda. You can search houses available for buying with the app.

[demo](http://ss-funda.herokuapp.com/)

## Installation

### Environment variables
You need an ```.env``` file with a Funda API key and a Google API key. There is a ```.env.sample``` in the root of the project. Save this as ```.env```. Replace the keys with your own working keys.


```
$ npm install
```

## Building and deploying

### General scripts
Build all the javascript files in the project and run a server on ```localhost:3000```.
```
$ npm run production
```

Start watching javascript files and less files. Rebundle or rebuild them on changes. Besides, a server starts running on ```localhost:3000```
```
$ npm run dev
```

## Audits
All the local checks are done on throttling with regular 3g (100ms, 750kb/s, 250kb/s).

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

### 7.Cache static files [feature/caching](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/caching)
Before:

![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/caching/before.png)

After:

![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/caching/after.png)

With adding a maxAge to my static files, I made sure they were cached on the browser. Besides that I fingerprinted my js and css, to make sure users won't get stuck with an old version of them.

### 8. Flash of invisible text [feature/foit](https://github.com/Frankwarnaar/minor-perfomance-matters-funda/tree/feature/foit)
Before:

![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/fout/before.png)

After:

![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/fout/after.png)

With [fontFaceObserver](https://github.com/bramstein/fontfaceobserver) I reduced the time until text was visibile from `2.71s` to `444ms`. This is a reducement of `83.6%`.

### Conclusion
#### Network
Before:

![Before all](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/before_all.png)

After:

![After all](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/after_all.png)

I reduced the total transfer size from `1.5mb` to `165kb` (`89%` less). The full page loaded in `2.49s` after the improvements. Before this was `17.04s`. This is `85.4%` quicker.

##### Second load

Before:

![Before all](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/before_2nd-load.png)

After:

![After all](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/after_2nd_load.png)

I reduced the total transfer size from `237kb` to `4.4kb` (`98.1%` less). The full page loaded in `1.51s` after the improvements. Before this was `3.46s`. This is `56.3%` quicker.

#### Google Page speed insights
Before
![Page speed insights - mobile](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/before_psi_mob.png)
![Page speed insights - desktop](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/before_psi_desk.png)

After
![Page speed insights - mobile](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/after_psi_mob.png)
![Page speed insights - desktop](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/after_psi_desk.png)

I improved the score on mobile from `83/100` to `100/100`. On desktop I improved the score from `93/100` to `100/100`.

#### Web page test
Before:
![Web page test - before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/before_wpt.png)

After:
![Web page test - before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/before_wpt.png)

I improved caching static from `0%` to `80%`. Besides, i Improved the CDN detected from `0%` to `33%`.

#### First paint
Before:
![Before](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/critical_css/before.png)

After:
![after](https://raw.githubusercontent.com/Frankwarnaar/minor-perfomance-matters-funda/master/improvements/critical_css/after.png)

I reduced the first paint time from ```515ms``` to ```366ms```. This is an improvement of ```40,7%```.

## Service worker
I implemented a service worker to achieve two job stories:
1. When I'm offline, I want to watch pages I've already visited, so I can always watch pages that are important for me.
2. When I've once visited a page, I want to cache the static files, so the load time reduces.

[Jump back to performance improvements of the Serive Worker](https://github.com/Frankwarnaar/minor-perfomance-matters-funda#4service-worker-featureservice-worker)
