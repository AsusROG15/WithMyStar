import "./chunk-G3PMV62Z.js";

// node_modules/web-vitals/dist/web-vitals.js
var e;
var n;
var t;
var i;
var r;
var a = -1;
var o = function(e3) {
  addEventListener("pageshow", function(n2) {
    n2.persisted && (a = n2.timeStamp, e3(n2));
  }, true);
};
var c = function() {
  return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
};
var u = function() {
  var e3 = c();
  return e3 && e3.activationStart || 0;
};
var f = function(e3, n2) {
  var t2 = c(), i2 = "navigate";
  return a >= 0 ? i2 = "back-forward-cache" : t2 && (i2 = document.prerendering || u() > 0 ? "prerender" : document.wasDiscarded ? "restore" : t2.type.replace(/_/g, "-")), { name: e3, value: void 0 === n2 ? -1 : n2, rating: "good", delta: 0, entries: [], id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12), navigationType: i2 };
};
var s = function(e3, n2, t2) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(e3)) {
      var i2 = new PerformanceObserver(function(e4) {
        Promise.resolve().then(function() {
          n2(e4.getEntries());
        });
      });
      return i2.observe(Object.assign({ type: e3, buffered: true }, t2 || {})), i2;
    }
  } catch (e4) {
  }
};
var d = function(e3, n2) {
  var t2 = function t3(i2) {
    "pagehide" !== i2.type && "hidden" !== document.visibilityState || (e3(i2), n2 && (removeEventListener("visibilitychange", t3, true), removeEventListener("pagehide", t3, true)));
  };
  addEventListener("visibilitychange", t2, true), addEventListener("pagehide", t2, true);
};
var v = function(e3, n2, t2, i2) {
  var r2, a2;
  return function(o2) {
    n2.value >= 0 && (o2 || i2) && ((a2 = n2.value - (r2 || 0)) || void 0 === r2) && (r2 = n2.value, n2.delta = a2, n2.rating = function(e4, n3) {
      return e4 > n3[1] ? "poor" : e4 > n3[0] ? "needs-improvement" : "good";
    }(n2.value, t2), e3(n2));
  };
};
var l = function(e3) {
  requestAnimationFrame(function() {
    return requestAnimationFrame(function() {
      return e3();
    });
  });
};
var p = function(e3) {
  document.prerendering ? addEventListener("prerenderingchange", function() {
    return e3();
  }, true) : e3();
};
var m = -1;
var h = function() {
  return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
};
var g = function(e3) {
  "hidden" === document.visibilityState && m > -1 && (m = "visibilitychange" === e3.type ? e3.timeStamp : 0, T());
};
var y = function() {
  addEventListener("visibilitychange", g, true), addEventListener("prerenderingchange", g, true);
};
var T = function() {
  removeEventListener("visibilitychange", g, true), removeEventListener("prerenderingchange", g, true);
};
var E = function() {
  return m < 0 && (m = h(), y(), o(function() {
    setTimeout(function() {
      m = h(), y();
    }, 0);
  })), { get firstHiddenTime() {
    return m;
  } };
};
var L = function(e3, n2) {
  n2 = n2 || {}, p(function() {
    var t2, i2 = [1800, 3e3], r2 = E(), a2 = f("FCP"), c2 = s("paint", function(e4) {
      e4.forEach(function(e5) {
        "first-contentful-paint" === e5.name && (c2.disconnect(), e5.startTime < r2.firstHiddenTime && (a2.value = Math.max(e5.startTime - u(), 0), a2.entries.push(e5), t2(true)));
      });
    });
    c2 && (t2 = v(e3, a2, i2, n2.reportAllChanges), o(function(r3) {
      a2 = f("FCP"), t2 = v(e3, a2, i2, n2.reportAllChanges), l(function() {
        a2.value = performance.now() - r3.timeStamp, t2(true);
      });
    }));
  });
};
var C = function(e3, n2) {
  n2 = n2 || {}, p(function() {
    var t2, i2 = [0.1, 0.25], r2 = f("CLS"), a2 = -1, c2 = 0, u2 = [], p2 = function(n3) {
      a2 > -1 && e3(n3);
    }, m2 = function(e4) {
      e4.forEach(function(e5) {
        if (!e5.hadRecentInput) {
          var n3 = u2[0], i3 = u2[u2.length - 1];
          c2 && e5.startTime - i3.startTime < 1e3 && e5.startTime - n3.startTime < 5e3 ? (c2 += e5.value, u2.push(e5)) : (c2 = e5.value, u2 = [e5]), c2 > r2.value && (r2.value = c2, r2.entries = u2, t2());
        }
      });
    }, h2 = s("layout-shift", m2);
    h2 && (t2 = v(p2, r2, i2, n2.reportAllChanges), L(function(e4) {
      a2 = e4.value, r2.value < 0 && (r2.value = 0, t2());
    }), d(function() {
      m2(h2.takeRecords()), t2(true);
    }), o(function() {
      c2 = 0, a2 = -1, r2 = f("CLS", 0), t2 = v(p2, r2, i2, n2.reportAllChanges), l(function() {
        return t2();
      });
    }));
  });
};
var b = { passive: true, capture: true };
var w = /* @__PURE__ */ new Date();
var S = function(i2, r2) {
  e || (e = r2, n = i2, t = /* @__PURE__ */ new Date(), P(removeEventListener), A());
};
var A = function() {
  if (n >= 0 && n < t - w) {
    var r2 = { entryType: "first-input", name: e.type, target: e.target, cancelable: e.cancelable, startTime: e.timeStamp, processingStart: e.timeStamp + n };
    i.forEach(function(e3) {
      e3(r2);
    }), i = [];
  }
};
var I = function(e3) {
  if (e3.cancelable) {
    var n2 = (e3.timeStamp > 1e12 ? /* @__PURE__ */ new Date() : performance.now()) - e3.timeStamp;
    "pointerdown" == e3.type ? function(e4, n3) {
      var t2 = function() {
        S(e4, n3), r2();
      }, i2 = function() {
        r2();
      }, r2 = function() {
        removeEventListener("pointerup", t2, b), removeEventListener("pointercancel", i2, b);
      };
      addEventListener("pointerup", t2, b), addEventListener("pointercancel", i2, b);
    }(n2, e3) : S(n2, e3);
  }
};
var P = function(e3) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(n2) {
    return e3(n2, I, b);
  });
};
var F = function(t2, r2) {
  r2 = r2 || {}, p(function() {
    var a2, c2 = [100, 300], u2 = E(), l2 = f("FID"), p2 = function(e3) {
      e3.startTime < u2.firstHiddenTime && (l2.value = e3.processingStart - e3.startTime, l2.entries.push(e3), a2(true));
    }, m2 = function(e3) {
      e3.forEach(p2);
    }, h2 = s("first-input", m2);
    a2 = v(t2, l2, c2, r2.reportAllChanges), h2 && d(function() {
      m2(h2.takeRecords()), h2.disconnect();
    }, true), h2 && o(function() {
      var o2;
      l2 = f("FID"), a2 = v(t2, l2, c2, r2.reportAllChanges), i = [], n = -1, e = null, P(addEventListener), o2 = p2, i.push(o2), A();
    });
  });
};
var M = 0;
var k = 1 / 0;
var D = 0;
var x = function(e3) {
  e3.forEach(function(e4) {
    e4.interactionId && (k = Math.min(k, e4.interactionId), D = Math.max(D, e4.interactionId), M = D ? (D - k) / 7 + 1 : 0);
  });
};
var B = function() {
  return r ? M : performance.interactionCount || 0;
};
var R = function() {
  "interactionCount" in performance || r || (r = s("event", x, { type: "event", buffered: true, durationThreshold: 0 }));
};
var H = 0;
var N = function() {
  return B() - H;
};
var O = [];
var q = {};
var j = function(e3) {
  var n2 = O[O.length - 1], t2 = q[e3.interactionId];
  if (t2 || O.length < 10 || e3.duration > n2.latency) {
    if (t2) t2.entries.push(e3), t2.latency = Math.max(t2.latency, e3.duration);
    else {
      var i2 = { id: e3.interactionId, latency: e3.duration, entries: [e3] };
      q[i2.id] = i2, O.push(i2);
    }
    O.sort(function(e4, n3) {
      return n3.latency - e4.latency;
    }), O.splice(10).forEach(function(e4) {
      delete q[e4.id];
    });
  }
};
var _ = function(e3, n2) {
  n2 = n2 || {}, p(function() {
    var t2 = [200, 500];
    R();
    var i2, r2 = f("INP"), a2 = function(e4) {
      e4.forEach(function(e5) {
        (e5.interactionId && j(e5), "first-input" === e5.entryType) && (!O.some(function(n4) {
          return n4.entries.some(function(n5) {
            return e5.duration === n5.duration && e5.startTime === n5.startTime;
          });
        }) && j(e5));
      });
      var n3, t3 = (n3 = Math.min(O.length - 1, Math.floor(N() / 50)), O[n3]);
      t3 && t3.latency !== r2.value && (r2.value = t3.latency, r2.entries = t3.entries, i2());
    }, c2 = s("event", a2, { durationThreshold: n2.durationThreshold || 40 });
    i2 = v(e3, r2, t2, n2.reportAllChanges), c2 && (c2.observe({ type: "first-input", buffered: true }), d(function() {
      a2(c2.takeRecords()), r2.value < 0 && N() > 0 && (r2.value = 0, r2.entries = []), i2(true);
    }), o(function() {
      O = [], H = B(), r2 = f("INP"), i2 = v(e3, r2, t2, n2.reportAllChanges);
    }));
  });
};
var z = {};
var G = function(e3, n2) {
  n2 = n2 || {}, p(function() {
    var t2, i2 = [2500, 4e3], r2 = E(), a2 = f("LCP"), c2 = function(e4) {
      var n3 = e4[e4.length - 1];
      if (n3) {
        var i3 = Math.max(n3.startTime - u(), 0);
        i3 < r2.firstHiddenTime && (a2.value = i3, a2.entries = [n3], t2());
      }
    }, p2 = s("largest-contentful-paint", c2);
    if (p2) {
      t2 = v(e3, a2, i2, n2.reportAllChanges);
      var m2 = function() {
        z[a2.id] || (c2(p2.takeRecords()), p2.disconnect(), z[a2.id] = true, t2(true));
      };
      ["keydown", "click"].forEach(function(e4) {
        addEventListener(e4, m2, { once: true, capture: true });
      }), d(m2, true), o(function(r3) {
        a2 = f("LCP"), t2 = v(e3, a2, i2, n2.reportAllChanges), l(function() {
          a2.value = performance.now() - r3.timeStamp, z[a2.id] = true, t2(true);
        });
      });
    }
  });
};
var J = function e2(n2) {
  document.prerendering ? p(function() {
    return e2(n2);
  }) : "complete" !== document.readyState ? addEventListener("load", function() {
    return e2(n2);
  }, true) : setTimeout(n2, 0);
};
var K = function(e3, n2) {
  n2 = n2 || {};
  var t2 = [800, 1800], i2 = f("TTFB"), r2 = v(e3, i2, t2, n2.reportAllChanges);
  J(function() {
    var a2 = c();
    if (a2) {
      var s2 = a2.responseStart;
      if (s2 <= 0 || s2 > performance.now()) return;
      i2.value = Math.max(s2 - u(), 0), i2.entries = [a2], r2(true), o(function() {
        i2 = f("TTFB", 0), (r2 = v(e3, i2, t2, n2.reportAllChanges))(true);
      });
    }
  });
};
export {
  C as getCLS,
  L as getFCP,
  F as getFID,
  _ as getINP,
  G as getLCP,
  K as getTTFB,
  C as onCLS,
  L as onFCP,
  F as onFID,
  _ as onINP,
  G as onLCP,
  K as onTTFB
};
//# sourceMappingURL=web-vitals.js.map
