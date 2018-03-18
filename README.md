# GSAP Promisify

[![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges)

Replace GSAP TweenMax or TweenLite callback for promises. This is an improved version of the npm package gsap-lite-promise.

This package doesn't include GSAP to decouple the hard dependency to the package versions and to improve it flexibility.

```js
require('gsap/src/uncompressed/TweenMax.js');

const animate = require('gsap-promisify')(Promise, window.TweenMax);

Promise.all([animate(element, 1.0, { x: 10 }), animate(element, 1.0, { y: 10, delay: 0.5 })]).then(function() {
  console.log('all animations finished');
});
```

## Arguments

### First Argument - Promise

Select your favorite Promise framework and send it as an argument. Is recommended the use of native Promise and in its default the polyfill.

### Second Argument - TweenModule

Send TweenMax or TweenLite. Instead of work with an internal version of `gsap`, maybe different than the one you are currently using in your project, just send your version and we will promisify that gsap module.

## Example

Customizing the GSAP implementation to use the built in minified sources and adding a `staggerTo` the implementation.

```
require('gsap/src/minified/plugins/CSSPlugin.min.js');
require('gsap/src/minified/plugins/ScrollToPlugin.min.js');
require('gsap/src/minified/TweenLite.min.js');
const animate = require('gsap-promisify')(Promise, window.TweenLite);
animate.staggerTo = function(els, duration, props, delay) {
  return Promise.all(
    els.map((el, i) =>
      animate.to(el, duration, {
        ...props,
        delay: props.delay + delay * i
      })
    )
  );
};
```

## Usage

[![NPM](https://nodei.co/npm/gsap-promisify.png)](https://nodei.co/npm/gsap-promisify/)

This promisifies the `TweenLite | TweenMax` methods: `to`, `from`, `set` and `fromTo`.

#### `animate.to(element, duration, params)`

#### `animate.from(element, duration, from)`

#### `animate.set(element, params)`

#### `animate.fromTo(element, duration, from, to)`

Matches the `TweenLite | TweenMax` methods by the same name, but returns a Promise for the onComplete event.

#### `animate.all(element)`

An alias for `Promise.all`, which will trigger all tweens in parallel.

#### `animate(element, duration, params)`

The default export is the same as `animate.to`.

## License

MIT, see [LICENSE](http://github.com/iranreyes/gsap-promisify/blob/master/LICENSE) for details.
