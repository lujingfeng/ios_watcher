define('reflux', function(require, exports, module) {

  "use strict";
  
  !(function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();else if ("function" == typeof define && define.amd) define([], a);else {
      var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.Reflux = a();
    }
  })(function () {
    var define, module, exports;return (function a(b, c, d) {
      function e(g, h) {
        if (!c[g]) {
          if (!b[g]) {
            var i = "function" == typeof require && require;if (!h && i) return i(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw (j.code = "MODULE_NOT_FOUND", j);
          }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
            var c = b[g][1][a];return e(c ? c : a);
          }, k, k.exports, a, b, c, d);
        }return c[g].exports;
      }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);return e;
    })({ 1: [function (a, b, c) {
        "use strict";function d(a, b, c) {
          this.fn = a, this.context = b, this.once = c || !1;
        }function e() {}var f = "function" != typeof Object.create ? "~" : !1;e.prototype._events = void 0, e.prototype.listeners = function (a, b) {
          var c = f ? f + a : a,
              d = this._events && this._events[c];if (b) return !!d;if (!d) return [];if (d.fn) return [d.fn];for (var e = 0, g = d.length, h = new Array(g); g > e; e++) h[e] = d[e].fn;return h;
        }, e.prototype.emit = function (a, b, c, d, e, g) {
          var h = f ? f + a : a;if (!this._events || !this._events[h]) return !1;var i,
              j,
              k = this._events[h],
              l = arguments.length;if ("function" == typeof k.fn) {
            switch ((k.once && this.removeListener(a, k.fn, void 0, !0), l)) {case 1:
                return k.fn.call(k.context), !0;case 2:
                return k.fn.call(k.context, b), !0;case 3:
                return k.fn.call(k.context, b, c), !0;case 4:
                return k.fn.call(k.context, b, c, d), !0;case 5:
                return k.fn.call(k.context, b, c, d, e), !0;case 6:
                return k.fn.call(k.context, b, c, d, e, g), !0;}for (j = 1, i = new Array(l - 1); l > j; j++) i[j - 1] = arguments[j];k.fn.apply(k.context, i);
          } else {
            var m,
                n = k.length;for (j = 0; n > j; j++) switch ((k[j].once && this.removeListener(a, k[j].fn, void 0, !0), l)) {case 1:
                k[j].fn.call(k[j].context);break;case 2:
                k[j].fn.call(k[j].context, b);break;case 3:
                k[j].fn.call(k[j].context, b, c);break;default:
                if (!i) for (m = 1, i = new Array(l - 1); l > m; m++) i[m - 1] = arguments[m];k[j].fn.apply(k[j].context, i);}
          }return !0;
        }, e.prototype.on = function (a, b, c) {
          var e = new d(b, c || this),
              g = f ? f + a : a;return this._events || (this._events = f ? {} : Object.create(null)), this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], e] : this._events[g].push(e) : this._events[g] = e, this;
        }, e.prototype.once = function (a, b, c) {
          var e = new d(b, c || this, !0),
              g = f ? f + a : a;return this._events || (this._events = f ? {} : Object.create(null)), this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], e] : this._events[g].push(e) : this._events[g] = e, this;
        }, e.prototype.removeListener = function (a, b, c, d) {
          var e = f ? f + a : a;if (!this._events || !this._events[e]) return this;var g = this._events[e],
              h = [];if (b) if (g.fn) (g.fn !== b || d && !g.once || c && g.context !== c) && h.push(g);else for (var i = 0, j = g.length; j > i; i++) (g[i].fn !== b || d && !g[i].once || c && g[i].context !== c) && h.push(g[i]);return h.length ? this._events[e] = 1 === h.length ? h[0] : h : delete this._events[e], this;
        }, e.prototype.removeAllListeners = function (a) {
          return this._events ? (a ? delete this._events[f ? f + a : a] : this._events = f ? {} : Object.create(null), this) : this;
        }, e.prototype.off = e.prototype.removeListener, e.prototype.addListener = e.prototype.on, e.prototype.setMaxListeners = function () {
          return this;
        }, e.prefixed = f, "undefined" != typeof b && (b.exports = e);
      }, {}], 2: [function (a, b, c) {
        "use strict";b.exports = {};
      }, {}], 3: [function (a, b, c) {
        "use strict";c.createdStores = [], c.createdActions = [], c.reset = function () {
          for (; c.createdStores.length;) c.createdStores.pop();for (; c.createdActions.length;) c.createdActions.pop();
        };
      }, {}], 4: [function (a, b, c) {
        "use strict";var d = a("./utils"),
            e = a("./joins").instanceJoinCreator,
            f = function f(a) {
          for (var b, c = 0, d = {}; c < (a.children || []).length; ++c) b = a.children[c], a[b] && (d[b] = a[b]);return d;
        },
            g = function h(a) {
          var b = {};for (var c in a) {
            var e = a[c],
                g = f(e),
                i = h(g);b[c] = e;for (var j in i) {
              var k = i[j];b[c + d.capitalize(j)] = k;
            }
          }return b;
        };b.exports = { hasListener: function hasListener(a) {
            for (var b, c, d, e = 0; e < (this.subscriptions || []).length; ++e) for (d = [].concat(this.subscriptions[e].listenable), b = 0; b < d.length; b++) if ((c = d[b], c === a || c.hasListener && c.hasListener(a))) return !0;return !1;
          }, listenToMany: function listenToMany(a) {
            var b = g(a);for (var c in b) {
              var e = d.callbackName(c),
                  f = this[e] ? e : this[c] ? c : void 0;f && this.listenTo(b[c], f, this[e + "Default"] || this[f + "Default"] || f);
            }
          }, validateListening: function validateListening(a) {
            return a === this ? "Listener is not able to listen to itself" : d.isFunction(a.listen) ? a.hasListener && a.hasListener(this) ? "Listener cannot listen to this listenable because of circular loop" : void 0 : a + " is missing a listen method";
          }, listenTo: function listenTo(a, b, c) {
            var e,
                f,
                g,
                h = this.subscriptions = this.subscriptions || [];return d.throwIf(this.validateListening(a)), this.fetchInitialState(a, c), e = a.listen(this[b] || b, this), f = function () {
              var a = h.indexOf(g);d.throwIf(-1 === a, "Tried to remove listen already gone from subscriptions list!"), h.splice(a, 1), e();
            }, g = { stop: f, listenable: a }, h.push(g), g;
          }, stopListeningTo: function stopListeningTo(a) {
            for (var b, c = 0, e = this.subscriptions || []; c < e.length; c++) if ((b = e[c], b.listenable === a)) return b.stop(), d.throwIf(-1 !== e.indexOf(b), "Failed to remove listen from subscriptions list!"), !0;return !1;
          }, stopListeningToAll: function stopListeningToAll() {
            for (var a, b = this.subscriptions || []; a = b.length;) b[0].stop(), d.throwIf(b.length !== a - 1, "Failed to remove listen from subscriptions list!");
          }, fetchInitialState: function fetchInitialState(a, b) {
            b = b && this[b] || b;var c = this;if (d.isFunction(b) && d.isFunction(a.getInitialState)) {
              var e = a.getInitialState();e && d.isFunction(e.then) ? e.then(function () {
                b.apply(c, arguments);
              }) : b.call(this, e);
            }
          }, joinTrailing: e("last"), joinLeading: e("first"), joinConcat: e("all"), joinStrict: e("strict") };
      }, { "./joins": 11, "./utils": 13 }], 5: [function (a, b, c) {
        "use strict";var d = a("./utils");b.exports = { preEmit: function preEmit() {}, shouldEmit: function shouldEmit() {
            return !0;
          }, listen: function listen(a, b) {
            b = b || this;var c = function c(_c) {
              e || a.apply(b, _c);
            },
                d = this,
                e = !1;return this.emitter.addListener(this.eventLabel, c), function () {
              e = !0, d.emitter.removeListener(d.eventLabel, c);
            };
          }, promise: function promise(a) {
            var b = this,
                c = this.children.indexOf("completed") >= 0 && this.children.indexOf("failed") >= 0;if (!c) throw new Error('Publisher must have "completed" and "failed" child publishers');a.then(function (a) {
              return b.completed(a);
            }, function (a) {
              return b.failed(a);
            });
          }, listenAndPromise: function listenAndPromise(a, b) {
            var c = this;b = b || this, this.willCallPromise = (this.willCallPromise || 0) + 1;var d = this.listen(function () {
              if (!a) throw new Error("Expected a function returning a promise but got " + a);var d = arguments,
                  e = a.apply(b, d);return c.promise.call(c, e);
            }, b);return function () {
              c.willCallPromise--, d.call(c);
            };
          }, trigger: function trigger() {
            var a = arguments,
                b = this.preEmit.apply(this, a);a = void 0 === b ? a : d.isArguments(b) ? b : [].concat(b), this.shouldEmit.apply(this, a) && this.emitter.emit(this.eventLabel, a);
          }, triggerAsync: function triggerAsync() {
            var a = arguments,
                b = this;d.nextTick(function () {
              b.trigger.apply(b, a);
            });
          }, triggerPromise: function triggerPromise() {
            var a = this,
                b = arguments,
                c = this.children.indexOf("completed") >= 0 && this.children.indexOf("failed") >= 0,
                e = d.createPromise(function (e, f) {
              if (a.willCallPromise) return void d.nextTick(function () {
                var c = a.promise;a.promise = function (b) {
                  return b.then(e, f), a.promise = c, a.promise.apply(a, arguments);
                }, a.trigger.apply(a, b);
              });if (c) var g = a.completed.listen(function (a) {
                g(), h(), e(a);
              }),
                  h = a.failed.listen(function (a) {
                g(), h(), f(a);
              });a.triggerAsync.apply(a, b), c || e();
            });return e;
          } };
      }, { "./utils": 13 }], 6: [function (a, b, c) {
        "use strict";b.exports = {};
      }, {}], 7: [function (a, b, c) {
        "use strict";b.exports = function (a, b) {
          for (var c in b) if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
            var d = Object.getOwnPropertyDescriptor(b, c);if (!d.value || "function" != typeof d.value || !b.hasOwnProperty(c)) continue;a[c] = b[c].bind(a);
          } else {
            var e = b[c];if ("function" != typeof e || !b.hasOwnProperty(c)) continue;a[c] = e.bind(a);
          }return a;
        };
      }, {}], 8: [function (a, b, c) {
        "use strict";var d = a("./utils"),
            e = a("./ActionMethods"),
            f = a("./PublisherMethods"),
            g = a("./Keep"),
            h = { preEmit: 1, shouldEmit: 1 },
            i = function j(a) {
          a = a || {}, d.isObject(a) || (a = { actionName: a });for (var b in e) if (!h[b] && f[b]) throw new Error("Cannot override API method " + b + " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead.");for (var c in a) if (!h[c] && f[c]) throw new Error("Cannot override API method " + c + " in action creation. Use another method name or override it on Reflux.PublisherMethods instead.");a.children = a.children || [], a.asyncResult && (a.children = a.children.concat(["completed", "failed"]));for (var i = 0, k = {}; i < a.children.length; i++) {
            var l = a.children[i];k[l] = j(l);
          }var m = d.extend({ eventLabel: "action", emitter: new d.EventEmitter(), _isAction: !0 }, f, e, a),
              n = function o() {
            var a = o.sync ? "trigger" : d.environment.hasPromise ? "triggerPromise" : "triggerAsync";return o[a].apply(o, arguments);
          };return d.extend(n, k, m), g.createdActions.push(n), n;
        };b.exports = i;
      }, { "./ActionMethods": 2, "./Keep": 3, "./PublisherMethods": 5, "./utils": 13 }], 9: [function (a, b, c) {
        "use strict";var d = a("./utils"),
            e = a("./Keep"),
            f = a("./mixer"),
            g = a("./bindMethods"),
            h = { preEmit: 1, shouldEmit: 1 };b.exports = function (b) {
          function c() {
            var a,
                c = 0;if ((this.subscriptions = [], this.emitter = new d.EventEmitter(), this.eventLabel = "change", g(this, b), this.init && d.isFunction(this.init) && this.init(), this.listenables)) for (a = [].concat(this.listenables); c < a.length; c++) this.listenToMany(a[c]);
          }var i = a("./StoreMethods"),
              j = a("./PublisherMethods"),
              k = a("./ListenerMethods");b = b || {};for (var l in i) if (!h[l] && (j[l] || k[l])) throw new Error("Cannot override API method " + l + " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");for (var m in b) if (!h[m] && (j[m] || k[m])) throw new Error("Cannot override API method " + m + " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");b = f(b), d.extend(c.prototype, k, j, i, b);var n = new c();return e.createdStores.push(n), n;
        };
      }, { "./Keep": 3, "./ListenerMethods": 4, "./PublisherMethods": 5, "./StoreMethods": 6, "./bindMethods": 7, "./mixer": 12, "./utils": 13 }], 10: [function (a, b, c) {
        "use strict";Object.defineProperty(c, "__esModule", { value: !0 });var d = { version: { "reflux-core": "0.2.1" } };d.ActionMethods = a("./ActionMethods"), d.ListenerMethods = a("./ListenerMethods"), d.PublisherMethods = a("./PublisherMethods"), d.StoreMethods = a("./StoreMethods"), d.createAction = a("./createAction"), d.createStore = a("./createStore");var e = a("./joins").staticJoinCreator;d.joinTrailing = d.all = e("last"), d.joinLeading = e("first"), d.joinStrict = e("strict"), d.joinConcat = e("all");var f = d.utils = a("./utils");d.EventEmitter = f.EventEmitter, d.Promise = f.Promise, d.createActions = (function () {
          var a = function a(_a, b) {
            Object.keys(_a).forEach(function (c) {
              var e = _a[c];b[c] = d.createAction(e);
            });
          };return function (b) {
            var c = {};return b instanceof Array ? b.forEach(function (b) {
              f.isObject(b) ? a(b, c) : c[b] = d.createAction(b);
            }) : a(b, c), c;
          };
        })(), d.setEventEmitter = function (a) {
          d.EventEmitter = f.EventEmitter = a;
        }, d.setPromise = function (a) {
          d.Promise = f.Promise = a;
        }, d.setPromiseFactory = function (a) {
          f.createPromise = a;
        }, d.nextTick = function (a) {
          f.nextTick = a;
        }, d.use = function (a) {
          a(d);
        }, d.__keep = a("./Keep"), Function.prototype.bind || console.error("Function.prototype.bind not available. ES5 shim required. https://github.com/spoike/refluxjs#es5"), c["default"] = d, b.exports = c["default"];
      }, { "./ActionMethods": 2, "./Keep": 3, "./ListenerMethods": 4, "./PublisherMethods": 5, "./StoreMethods": 6, "./createAction": 8, "./createStore": 9, "./joins": 11, "./utils": 13 }], 11: [function (a, b, c) {
        "use strict";function d(a, b, c) {
          return function () {
            var d,
                e = c.subscriptions,
                f = e ? e.indexOf(a) : -1;for (i.throwIf(-1 === f, "Tried to remove join already gone from subscriptions list!"), d = 0; d < b.length; d++) b[d]();e.splice(f, 1);
          };
        }function e(a) {
          a.listenablesEmitted = new Array(a.numberOfListenables), a.args = new Array(a.numberOfListenables);
        }function f(a, b) {
          return function () {
            var c = j.call(arguments);if (b.listenablesEmitted[a]) switch (b.strategy) {case "strict":
                throw new Error("Strict join failed because listener triggered twice.");case "last":
                b.args[a] = c;break;case "all":
                b.args[a].push(c);} else b.listenablesEmitted[a] = !0, b.args[a] = "all" === b.strategy ? [c] : c;g(b);
          };
        }function g(a) {
          for (var b = 0; b < a.numberOfListenables; b++) if (!a.listenablesEmitted[b]) return;a.callback.apply(a.listener, a.args), e(a);
        }var h = a("./createStore"),
            i = a("./utils"),
            j = Array.prototype.slice,
            k = { strict: "joinStrict", first: "joinLeading", last: "joinTrailing", all: "joinConcat" };c.staticJoinCreator = function (a) {
          return function () {
            var b = j.call(arguments);return h({ init: function init() {
                this[k[a]].apply(this, b.concat("triggerAsync"));
              } });
          };
        }, c.instanceJoinCreator = function (a) {
          return function () {
            i.throwIf(arguments.length < 2, "Cannot create a join with less than 2 listenables!");var b,
                c,
                g = j.call(arguments),
                h = g.pop(),
                k = g.length,
                l = { numberOfListenables: k, callback: this[h] || h, listener: this, strategy: a },
                m = [];for (b = 0; k > b; b++) i.throwIf(this.validateListening(g[b]));for (b = 0; k > b; b++) m.push(g[b].listen(f(b, l), this));return e(l), c = { listenable: g }, c.stop = d(c, m, this), this.subscriptions = (this.subscriptions || []).concat(c), c;
          };
        };
      }, { "./createStore": 9, "./utils": 13 }], 12: [function (a, b, c) {
        "use strict";var d = a("./utils");b.exports = function (a) {
          var b = { init: [], preEmit: [], shouldEmit: [] },
              c = (function e(a) {
            var c = {};return a.mixins && a.mixins.forEach(function (a) {
              d.extend(c, e(a));
            }), d.extend(c, a), Object.keys(b).forEach(function (c) {
              a.hasOwnProperty(c) && b[c].push(a[c]);
            }), c;
          })(a);return b.init.length > 1 && (c.init = function () {
            var a = arguments;b.init.forEach(function (b) {
              b.apply(this, a);
            }, this);
          }), b.preEmit.length > 1 && (c.preEmit = function () {
            return b.preEmit.reduce((function (a, b) {
              var c = b.apply(this, a);return void 0 === c ? a : [c];
            }).bind(this), arguments);
          }), b.shouldEmit.length > 1 && (c.shouldEmit = function () {
            var a = arguments;return !b.shouldEmit.some(function (b) {
              return !b.apply(this, a);
            }, this);
          }), Object.keys(b).forEach(function (a) {
            1 === b[a].length && (c[a] = b[a][0]);
          }), c;
        };
      }, { "./utils": 13 }], 13: [function (require, module, exports) {
        "use strict";function capitalize(a) {
          return a.charAt(0).toUpperCase() + a.slice(1);
        }function callbackName(a, b) {
          return b = b || "on", b + exports.capitalize(a);
        }function checkEnv(target) {
          var flag = void 0;try {
            eval(target) && (flag = !0);
          } catch (e) {
            flag = !1;
          }environment[callbackName(target, "has")] = flag;
        }function isObject(a) {
          var b = typeof a;return "function" === b || "object" === b && !!a;
        }function extend(a) {
          if (!isObject(a)) return a;for (var b, c, d = 1, e = arguments.length; e > d; d++) {
            b = arguments[d];for (c in b) if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
              var f = Object.getOwnPropertyDescriptor(b, c);Object.defineProperty(a, c, f);
            } else a[c] = b[c];
          }return a;
        }function isFunction(a) {
          return "function" == typeof a;
        }function object(a, b) {
          for (var c = {}, d = 0; d < a.length; d++) c[a[d]] = b[d];return c;
        }function isArguments(a) {
          return "object" == typeof a && "callee" in a && "number" == typeof a.length;
        }function throwIf(a, b) {
          if (a) throw Error(b || a);
        }Object.defineProperty(exports, "__esModule", { value: !0 }), exports.capitalize = capitalize, exports.callbackName = callbackName, exports.isObject = isObject, exports.extend = extend, exports.isFunction = isFunction, exports.object = object, exports.isArguments = isArguments, exports.throwIf = throwIf;var environment = {};exports.environment = environment, checkEnv("setImmediate"), checkEnv("Promise"), exports.EventEmitter = require("eventemitter3"), environment.hasSetImmediate ? exports.nextTick = function (a) {
          setImmediate(a);
        } : exports.nextTick = function (a) {
          setTimeout(a, 0);
        }, environment.hasPromise ? (exports.Promise = Promise, exports.createPromise = function (a) {
          return new exports.Promise(a);
        }) : (exports.Promise = null, exports.createPromise = function () {});
      }, { eventemitter3: 1 }], 14: [function (a, b, c) {
        var d = a("reflux-core/lib/utils"),
            e = a("reflux-core/lib/ListenerMethods");b.exports = d.extend({ componentWillUnmount: e.stopListeningToAll }, e);
      }, { "reflux-core/lib/ListenerMethods": 4, "reflux-core/lib/utils": 13 }], 15: [function (a, b, c) {
        var d = a("reflux-core/lib/ListenerMethods"),
            e = a("./ListenerMixin"),
            f = a("reflux-core/lib/utils");b.exports = function (a, b) {
          return { getInitialState: function getInitialState() {
              return f.isFunction(a.getInitialState) ? void 0 === b ? a.getInitialState() : f.object([b], [a.getInitialState()]) : {};
            }, componentDidMount: function componentDidMount() {
              f.extend(this, d);var c = this,
                  e = void 0 === b ? this.setState : function (a) {
                ("undefined" == typeof c.isMounted || c.isMounted() === !0) && c.setState(f.object([b], [a]));
              };this.listenTo(a, e);
            }, componentWillUnmount: e.componentWillUnmount };
        };
      }, { "./ListenerMixin": 14, "reflux-core/lib/ListenerMethods": 4, "reflux-core/lib/utils": 13 }], 16: [function (a, b, c) {
        var d = a("reflux-core/lib/ListenerMethods"),
            e = a("./ListenerMixin"),
            f = a("reflux-core/lib/utils");b.exports = function (a, b, c) {
          return c = f.isFunction(b) ? b : c, { getInitialState: function getInitialState() {
              if (f.isFunction(a.getInitialState)) {
                if (f.isFunction(b)) return c.call(this, a.getInitialState());var d = c.call(this, a.getInitialState());return "undefined" != typeof d ? f.object([b], [d]) : {};
              }return {};
            }, componentDidMount: function componentDidMount() {
              f.extend(this, d);var e = this,
                  g = function g(a) {
                if (f.isFunction(b)) e.setState(c.call(e, a));else {
                  var d = c.call(e, a);e.setState(f.object([b], [d]));
                }
              };this.listenTo(a, g);
            }, componentWillUnmount: e.componentWillUnmount };
        };
      }, { "./ListenerMixin": 14, "reflux-core/lib/ListenerMethods": 4, "reflux-core/lib/utils": 13 }], 17: [function (a, b, c) {
        var d = a("reflux-core");d.connect = a("./connect"), d.connectFilter = a("./connectFilter"), d.ListenerMixin = a("./ListenerMixin"), d.listenTo = a("./listenTo"), d.listenToMany = a("./listenToMany"), b.exports = d;
      }, { "./ListenerMixin": 14, "./connect": 15, "./connectFilter": 16, "./listenTo": 18, "./listenToMany": 19, "reflux-core": 10 }], 18: [function (a, b, c) {
        var d = a("reflux-core/lib/ListenerMethods");b.exports = function (a, b, c) {
          return { componentDidMount: function componentDidMount() {
              for (var e in d) if (this[e] !== d[e]) {
                if (this[e]) throw "Can't have other property '" + e + "' when using Reflux.listenTo!";this[e] = d[e];
              }this.listenTo(a, b, c);
            }, componentWillUnmount: d.stopListeningToAll };
        };
      }, { "reflux-core/lib/ListenerMethods": 4 }], 19: [function (a, b, c) {
        var d = a("reflux-core/lib/ListenerMethods");b.exports = function (a) {
          return { componentDidMount: function componentDidMount() {
              for (var b in d) if (this[b] !== d[b]) {
                if (this[b]) throw "Can't have other property '" + b + "' when using Reflux.listenToMany!";this[b] = d[b];
              }this.listenToMany(a);
            }, componentWillUnmount: d.stopListeningToAll };
        };
      }, { "reflux-core/lib/ListenerMethods": 4 }] }, {}, [17])(17);
  });

});
