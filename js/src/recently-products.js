!function (t) {
	"use strict";
	function e(t) {
		if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");
		return t.toLowerCase()
	}

	function r(t) {
		return "string" != typeof t && (t = String(t)), t
	}

	function o(t) {
		var e = {
			next: function () {
				var e = t.shift();
				return {done: void 0 === e, value: e}
			}
		};
		return y.iterable && (e[Symbol.iterator] = function () {
			return e
		}), e
	}

	function n(t) {
		this.map = {}, t instanceof n ? t.forEach(function (t, e) {
			this.append(e, t)
		}, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
			this.append(e, t[e])
		}, this)
	}

	function s(t) {
		return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void(t.bodyUsed = !0)
	}

	function i(t) {
		return new Promise(function (e, r) {
			t.onload = function () {
				e(t.result)
			}, t.onerror = function () {
				r(t.error)
			}
		})
	}

	function a(t) {
		var e = new FileReader;
		return e.readAsArrayBuffer(t), i(e)
	}

	function h(t) {
		var e = new FileReader;
		return e.readAsText(t), i(e)
	}

	function u() {
		return this.bodyUsed = !1, this._initBody = function (t) {
			if (this._bodyInit = t, "string" == typeof t)this._bodyText = t; else if (y.blob && Blob.prototype.isPrototypeOf(t))this._bodyBlob = t; else if (y.formData && FormData.prototype.isPrototypeOf(t))this._bodyFormData = t; else if (y.searchParams && URLSearchParams.prototype.isPrototypeOf(t))this._bodyText = t.toString(); else if (t) {
				if (!y.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")
			} else this._bodyText = "";
			this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : y.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
		}, y.blob ? (this.blob = function () {
			var t = s(this);
			if (t)return t;
			if (this._bodyBlob)return Promise.resolve(this._bodyBlob);
			if (this._bodyFormData)throw new Error("could not read FormData body as blob");
			return Promise.resolve(new Blob([this._bodyText]))
		}, this.arrayBuffer = function () {
			return this.blob().then(a)
		}, this.text = function () {
			var t = s(this);
			if (t)return t;
			if (this._bodyBlob)return h(this._bodyBlob);
			if (this._bodyFormData)throw new Error("could not read FormData body as text");
			return Promise.resolve(this._bodyText)
		}) : this.text = function () {
			var t = s(this);
			return t ? t : Promise.resolve(this._bodyText)
		}, y.formData && (this.formData = function () {
			return this.text().then(p)
		}), this.json = function () {
			return this.text().then(JSON.parse)
		}, this
	}

	function f(t) {
		var e = t.toUpperCase();
		return b.indexOf(e) > -1 ? e : t
	}

	function d(t, e) {
		e = e || {};
		var r = e.body;
		if (d.prototype.isPrototypeOf(t)) {
			if (t.bodyUsed)throw new TypeError("Already read");
			this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new n(t.headers)), this.method = t.method, this.mode = t.mode, r || (r = t._bodyInit, t.bodyUsed = !0)
		} else this.url = t;
		if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new n(e.headers)), this.method = f(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r)throw new TypeError("Body not allowed for GET or HEAD requests");
		this._initBody(r)
	}

	function p(t) {
		var e = new FormData;
		return t.trim().split("&").forEach(function (t) {
			if (t) {
				var r = t.split("="), o = r.shift().replace(/\+/g, " "), n = r.join("=").replace(/\+/g, " ");
				e.append(decodeURIComponent(o), decodeURIComponent(n))
			}
		}), e
	}

	function c(t) {
		var e = new n, r = (t.getAllResponseHeaders() || "").trim().split("\n");
		return r.forEach(function (t) {
			var r = t.trim().split(":"), o = r.shift().trim(), n = r.join(":").trim();
			e.append(o, n)
		}), e
	}

	function l(t, e) {
		e || (e = {}), this.type = "default", this.status = e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = e.statusText, this.headers = e.headers instanceof n ? e.headers : new n(e.headers), this.url = e.url || "", this._initBody(t)
	}

	if (!t.fetch) {
		var y = {
			searchParams: "URLSearchParams" in t,
			iterable: "Symbol" in t && "iterator" in Symbol,
			blob: "FileReader" in t && "Blob" in t && function () {
				try {
					return new Blob, !0
				} catch (t) {
					return !1
				}
			}(),
			formData: "FormData" in t,
			arrayBuffer: "ArrayBuffer" in t
		};
		n.prototype.append = function (t, o) {
			t = e(t), o = r(o);
			var n = this.map[t];
			n || (n = [], this.map[t] = n), n.push(o)
		}, n.prototype["delete"] = function (t) {
			delete this.map[e(t)]
		}, n.prototype.get = function (t) {
			var r = this.map[e(t)];
			return r ? r[0] : null
		}, n.prototype.getAll = function (t) {
			return this.map[e(t)] || []
		}, n.prototype.has = function (t) {
			return this.map.hasOwnProperty(e(t))
		}, n.prototype.set = function (t, o) {
			this.map[e(t)] = [r(o)]
		}, n.prototype.forEach = function (t, e) {
			Object.getOwnPropertyNames(this.map).forEach(function (r) {
				this.map[r].forEach(function (o) {
					t.call(e, o, r, this)
				}, this)
			}, this)
		}, n.prototype.keys = function () {
			var t = [];
			return this.forEach(function (e, r) {
				t.push(r)
			}), o(t)
		}, n.prototype.values = function () {
			var t = [];
			return this.forEach(function (e) {
				t.push(e)
			}), o(t)
		}, n.prototype.entries = function () {
			var t = [];
			return this.forEach(function (e, r) {
				t.push([r, e])
			}), o(t)
		}, y.iterable && (n.prototype[Symbol.iterator] = n.prototype.entries);
		var b = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
		d.prototype.clone = function () {
			return new d(this)
		}, u.call(d.prototype), u.call(l.prototype), l.prototype.clone = function () {
			return new l(this._bodyInit, {
				status: this.status,
				statusText: this.statusText,
				headers: new n(this.headers),
				url: this.url
			})
		}, l.error = function () {
			var t = new l(null, {status: 0, statusText: ""});
			return t.type = "error", t
		};
		var m = [301, 302, 303, 307, 308];
		l.redirect = function (t, e) {
			if (-1 === m.indexOf(e))throw new RangeError("Invalid status code");
			return new l(null, {status: e, headers: {location: t}})
		}, t.Headers = n, t.Request = d, t.Response = l, t.fetch = function (t, e) {
			return new Promise(function (r, o) {
				function n() {
					return "responseURL" in i ? i.responseURL : /^X-Request-URL:/m.test(i.getAllResponseHeaders()) ? i.getResponseHeader("X-Request-URL") : void 0
				}

				var s;
				s = d.prototype.isPrototypeOf(t) && !e ? t : new d(t, e);
				var i = new XMLHttpRequest;
				i.onload = function () {
					var t = {
						status: i.status,
						statusText: i.statusText,
						headers: c(i),
						url: n()
					}, e = "response" in i ? i.response : i.responseText;
					r(new l(e, t))
				}, i.onerror = function () {
					o(new TypeError("Network request failed"))
				}, i.ontimeout = function () {
					o(new TypeError("Network request failed"))
				}, i.open(s.method, s.url, !0), "include" === s.credentials && (i.withCredentials = !0), "responseType" in i && y.blob && (i.responseType = "blob"), s.headers.forEach(function (t, e) {
					i.setRequestHeader(e, t)
				}), i.send("undefined" == typeof s._bodyInit ? null : s._bodyInit)
			})
		}, t.fetch.polyfill = !0
	}
}("undefined" != typeof self ? self : this);

(function (f) {
	if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = f()
	} else if (typeof define === "function" && define.amd) {
		define([], f)
	} else {
		var g;
		if (typeof window !== "undefined") {
			g = window
		} else if (typeof global !== "undefined") {
			g = global
		} else if (typeof self !== "undefined") {
			g = self
		} else {
			g = this
		}
		g.store = f()
	}
})(function () {
	var define, module, exports;
	return (function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = typeof require == "function" && require;
					if (!u && a)return a(o, !0);
					if (i)return i(o, !0);
					var f = new Error("Cannot find module '" + o + "'");
					throw f.code = "MODULE_NOT_FOUND", f
				}
				var l = n[o] = {exports: {}};
				t[o][0].call(l.exports, function (e) {
					var n = t[o][1][e];
					return s(n ? n : e)
				}, l, l.exports, e, t, n, r)
			}
			return n[o].exports
		}

		var i = typeof require == "function" && require;
		for (var o = 0; o < r.length; o++)s(r[o]);
		return s
	})({
		1: [function (require, module, exports) {
			(function (global) {
				"use strict";
				module.exports = function () {
					function e() {
						try {
							return o in n && n[o]
						} catch (e) {
							return !1
						}
					}

					var t, r = {}, n = "undefined" != typeof window ? window : global, i = n.document, o = "localStorage", a = "script";
					if (r.disabled = !1, r.version = "1.3.20", r.set = function (e, t) {
						}, r.get = function (e, t) {
						}, r.has = function (e) {
							return void 0 !== r.get(e)
						}, r.remove = function (e) {
						}, r.clear = function () {
						}, r.transact = function (e, t, n) {
							null == n && (n = t, t = null), null == t && (t = {});
							var i = r.get(e, t);
							n(i), r.set(e, i)
						}, r.getAll = function () {
						}, r.forEach = function () {
						}, r.serialize = function (e) {
							return JSON.stringify(e)
						}, r.deserialize = function (e) {
							if ("string" == typeof e)try {
								return JSON.parse(e)
							} catch (t) {
								return e || void 0
							}
						}, e())t = n[o], r.set = function (e, n) {
						return void 0 === n ? r.remove(e) : (t.setItem(e, r.serialize(n)), n)
					}, r.get = function (e, n) {
						var i = r.deserialize(t.getItem(e));
						return void 0 === i ? n : i
					}, r.remove = function (e) {
						t.removeItem(e)
					}, r.clear = function () {
						t.clear()
					}, r.getAll = function () {
						var e = {};
						return r.forEach(function (t, r) {
							e[t] = r
						}), e
					}, r.forEach = function (e) {
						for (var n = 0; n < t.length; n++) {
							var i = t.key(n);
							e(i, r.get(i))
						}
					}; else if (i && i.documentElement.addBehavior) {
						var c, u;
						try {
							u = new ActiveXObject("htmlfile"), u.open(), u.write("<" + a + ">document.w=window</" + a + '><iframe src="/favicon.ico"></iframe>'), u.close(), c = u.w.frames[0].document, t = c.createElement("div")
						} catch (l) {
							t = i.createElement("div"), c = i.body
						}
						var f = function (e) {
							return function () {
								var n = Array.prototype.slice.call(arguments, 0);
								n.unshift(t), c.appendChild(t), t.addBehavior("#default#userData"), t.load(o);
								var i = e.apply(r, n);
								return c.removeChild(t), i
							}
						}, d = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), s = function (e) {
							return e.replace(/^d/, "___$&").replace(d, "___")
						};
						r.set = f(function (e, t, n) {
							return t = s(t), void 0 === n ? r.remove(t) : (e.setAttribute(t, r.serialize(n)), e.save(o), n)
						}), r.get = f(function (e, t, n) {
							t = s(t);
							var i = r.deserialize(e.getAttribute(t));
							return void 0 === i ? n : i
						}), r.remove = f(function (e, t) {
							t = s(t), e.removeAttribute(t), e.save(o)
						}), r.clear = f(function (e) {
							var t = e.XMLDocument.documentElement.attributes;
							e.load(o);
							for (var r = t.length - 1; r >= 0; r--)e.removeAttribute(t[r].name);
							e.save(o)
						}), r.getAll = function (e) {
							var t = {};
							return r.forEach(function (e, r) {
								t[e] = r
							}), t
						}, r.forEach = f(function (e, t) {
							for (var n, i = e.XMLDocument.documentElement.attributes, o = 0; n = i[o]; ++o)t(n.name, r.deserialize(e.getAttribute(n.name)))
						})
					}
					try {
						var v = "__storejs__";
						r.set(v, v), r.get(v) != v && (r.disabled = !0), r.remove(v)
					} catch (l) {
						r.disabled = !0
					}
					return r.enabled = !r.disabled, r
				}();
			}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
		}, {}]
	}, {}, [1])(1)
});


Ecwid.OnPageLoad.add(function(page) {
	/* constants */
	/* TODO заменить на public_token */
	const token = 'secret_VP5zXwrzPa8niU5mcm1whdZFLbCq6ZEV'
	const apiProductUrl = 'https://app.ecwid.com/api/v3'
	const app_id="testapp-hackathon2016-3"
	const appSettings = JSON.parse(Ecwid.getAppPublicConfig(app_id))

	/* check if array contains item 
	const removeExist = (item, arr) => {
		return arr.filter((i)=> {
				return i !== item
			})
	}*/

	const getMaxShown = () => appSettings.maxShown || 3
	
	const getContainer = () => document.querySelector(appSettings.container)
	
	/* main render */
	const render = (viewed, container) => {
		const viewedHtml = document.createElement('div');
		viewedHtml.className = "recently-viewed-list"
		viewedHtml.innerHTML = viewed.map((item) => {
			return `<div class="recently-viewed recently-viewed--${item}">${renderItem(item,viewedHtml) || ''}</div>`
		}).join('')

		container.innerHTML = '<h4>Recently Viewed</h4>'
		container.appendChild(viewedHtml)
	}

	/* render item */
	const renderItem = (productId, obj) => {
		fetch(`${apiProductUrl}/${Ecwid.getOwnerId()}/products/${productId}?token=${token}`)
			.then(function (response) {
				return response.json()
			}).then(function (json) {
				const pItem = obj.querySelector('.recently-viewed--'+productId)
				pItem.innerHTML = `<a class="recently-viewed__url" href="${json.url}"><div class="recently-viewed__thumb"><img src="${json.thumbnailUrl}" alt=""></div><div class="recently-viewed__name">${json.name}</div><div class="recently-viewed__price">${json.price}</div></a>`
		}).catch(function (ex) {
			console.warn('parsing failed', ex)
		})
	}


	const addRecentProduct = (id, viewed) => {
		let newViewed = viewed.filter((i)=> {
			return i !== id
		})
		newViewed.unshift(id)
		if ( newViewed.length > getMaxShown() ) {
			newViewed.pop()
		}
		return newViewed
	}

	console.log (getMaxShown() , getContainer()  )

	const productBrowser = getContainer()
	let recentlyViewed = document.querySelector('.recently-viewed-products')
	if (!recentlyViewed) {
		recentlyViewed = document.createElement('div')
		recentlyViewed.className = "recently-viewed-products"
		productBrowser.parentNode.insertBefore(recentlyViewed, productBrowser)
	}

	if (!store.enabled) {
		window.warn('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
		return
	}

	let viewed = store.get('viewed') || []

	if ( page.type === 'PRODUCT') {
		let pId = page.productId
		viewed = addRecentProduct(pId, viewed)

		store.set('viewed', viewed)
		render(viewed, recentlyViewed)
	}

})

