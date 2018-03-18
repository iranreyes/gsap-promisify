/**
 * Animate specific functions inside the TweenModules, like TweenLite.to
 *
 * @param {Function} func - TweenModule.to
 * @param {DOMElement} element - DOM Element
 * @param {number} duration - Duration
 * @param {Object} opts - Paramaters
 * @returns
 */
function _animateFunc(func, element, duration, opts) {
  opts = Object.assign({}, opts);
  var tween;
  return new Promise(function(resolve, reject, onCancel) {
    opts.onComplete = resolve;
    tween = func(element, duration, opts);
    onCancel &&
      onCancel(function() {
        tween.kill();
      });
  });
}

/**
 * Get a wrapper of GSAP Tween
 *
 * @param {Promise} Promise - Promise framework
 * @param {TweenModule} TweenModule - TweenMax or TweenLite
 * @returns {Object} GSAP Promisified
 */
function animate(Promise, TweenModule) {
  var animateTo = _animateFunc.bind(null, TweenModule.to);

  var util = animateTo;
  util.to = animateTo;
  util.from = _animateFunc.bind(null, TweenModule.from);

  util.set = function animateSet(element, params) {
    params = Object.assign({}, params);
    return new Promise(function(resolve, reject) {
      params.onComplete = resolve;
      TweenModule.set(element, params);
    });
  };

  util.fromTo = function animateFromTo(element, duration, from, to) {
    to = Object.assign({}, to);
    var tween;
    return new Promise(function(resolve, reject, onCancel) {
      to.onComplete = resolve;
      tween = TweenModule.fromTo(element, duration, from, to);
      onCancel &&
        onCancel(function() {
          tween.kill();
        });
    });
  };

  util.killTweensOf = TweenModule.killTweensOf.bind(TweenModule);
  util.all = Promise.all;
  return util;
}

module.exports = animate;
