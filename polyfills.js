// polyfills.js

// Optional: Add global fetch polyfill (for older Node versions)
if (typeof fetch === 'undefined') {
    global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  }
  
  // Optional: Polyfill for AbortController
  if (typeof AbortController === 'undefined') {
    global.AbortController = require('abort-controller');
  }
  
  // Optional: Promise.finally (usually not needed in modern Node)
  if (!Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
      var P = this.constructor;
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason; })
      );
    };
  }
  
  console.log("✅ Polyfills loaded.");
  