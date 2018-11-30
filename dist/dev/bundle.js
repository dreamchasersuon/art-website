/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "c61e8b0f16cef69e77b7";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "dev";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/dist/dev/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/style/style.css":
/*!*******************************************************!*\
  !*** ./node_modules/css-loader!./src/style/style.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body{\n\tdisplay:flex;\n}\nhtml, body {\n\tmargin:0;\n\toverflow:hidden;\n\tpadding:0;\n}\nmain {\n\tdisplay: flex;\n\tposition: absolute;\n\topacity: 0.9;\n\twidth: 100%;\n\tz-index: 99998;\n\tjustify-content: space-evenly;\n\theight: 100%;\n\tflex-flow: row wrap\n}\n.Gallery-SocialMedia_wrapper {\n\tmargin: 0 1vh;\n\tdisplay: flex;\n\tflex-flow: column;\n\talign-self: center;\n}\n.feature {\n\t display: flex;\n\t min-width: 40vmin;\n\t max-height: 70vmin;\n\t position: absolute;\n\t top: 20vh;\n\t left: 18vh;\n}\n.Gallery-SliderPreview_wrapper {\n\tposition: absolute;\n\tdisplay: flex;\n\tbackground-color: rgba(15, 15, 15, 1);\n\tmin-height: 13vmin;\n\ttop: 85vmin;\n\tborder-radius: 1vh;\n\tleft: 18vmin;\n\talign-items: center;\n\twidth: 100%;\n\t-webkit-animation-duration:3s;\n\tanimation-duration:3s;\n\t-webkit-animation-name:slide;\n\tanimation-name:slide;\n\tanimation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n.Gallery-SliderPreview {\n\tposition: relative;\n\tdisplay: flex;\n\tbackground-color: rgba(115, 115, 115, 0.8);\n\tmax-width: 90vmin;\n\tborder-radius: 1vh;\n\tbox-sizing: border-box;\n\toverflow-x: scroll;\n\toverflow-y: hidden;\n\talign-content: center;\n\tmargin-left: 5vh;\n}\n\n.featured-item {\n\tmin-height: 30vmin;\n\tbackground-position: center top;\n\tmin-width: 40vmin;\n\tbackground-size: 100%;\n}\n\n.xy-center {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n.transition {\n\ttransition: all 350ms ease-in-out;\n}\n\n.r-3-2 {\n\twidth: 100%;\n\tpadding-bottom: 66.667%;\n}\n\n.image-holder {\n\tbackground-repeat: no-repeat;\n\tbackground-size: 100%;\n}\n\n.item-wrapper {\n\tcursor: pointer;\n\twidth: 100%; /* arbitrary value */\n\tdisplay: flex;\n\tmargin: 0 2vh;\n\tflex-flow: column;\n}\n\n.gallery-item { opacity: 0.5; }\n.gallery-item.active { opacity: 1; }\n\n.AdjustPosition-Button_wrapper {\n    display: flex;\n    flex-direction: row-reverse;\n}\n.MainGroup-AboutInfo_wrapper {\n\tdisplay: flex;\n\tmax-height: 50%;\n\tmin-width: 15%;\n\tmax-width: 100%;\n\tflex-flow: row wrap;\n\tjustify-content: space-between;\n\twidth: 130vh;\n\tmargin-top: -15vh;\n}\n.BodyDivisor_black {\n\tbackground-color:rgba(45, 45, 45, 1);\n\twidth: 50%;\n\theight: 1000px;\n\tdisplay: flex;\n}\n.Nav-SocialMedia_wrapper {\n\tdisplay:flex;\n\twidth:100%;\n\theight: 3em;\n\tjustify-content: space-around;\n}\n.BodyDivisorBlack-TextItem_title {\n\tposition:absolute;\n\ttop:92%;\n\tleft:1%;\n\tfont-size:14px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:800;\n\tcolor:rgba(45, 45, 45, 1);\n\tcursor: text;\n\tbackground-color: rgba(78, 178, 78, 1);\n}\n.AboutInfo-ArticleBlackSide_wrapper {\n\tdisplay: flex;\n\tmax-height: 25vh;\n\tposition: relative;\n\tmax-width: 50vmin;\n\talign-self: center;\n}\n.ArticleBlackSide-TextItem_left, .ArticleBlackSide-TextItem_right {\n\tcolor:white;\n\tfont-family:'Roboto', sans-serif;\n\tfont-size:1.7em;\n}\n.ArticleBlackSide-TextItem_left {\n\ttext-align:right;\n\tmargin-right:10px;\n\tpadding-right:25px;\n\toverflow:auto;\n\twidth:50%;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n}\n.ArticleBlackSide-TextItem_right {\n\ttext-align:left;\n\tmargin-left:10px;\n\toverflow:auto;\n\twidth:50%;\n}\n.InitialsLogo-Name {\n\tposition: relative;\n\tfont-size: 2.5em;\n\tcolor: rgba(45, 45, 45, 1);\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tbackground-color: rgba(78, 178, 78, 1);\n\theight: 1em;\n\tmargin: 0;\n\tcursor: default;\n}\n.InitialsLogo-Surname {\n\tcolor: white;\n\tbackground-color: rgba(78, 178, 78, 1);\n\tfont-size: 2.5em;\n\theight: 1em;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tposition: relative;\n\tmargin: 0;\n\tleft: 30%;\n\twidth: -moz-fit-content;\n\tmargin-top: 1%;\n\tcursor: default;\n}\n.BodyDivisor_white {\n\tbackground-color:white;\n\t-webkit-animation-duration:3s;\n\tanimation-duration:3s;\n\t-webkit-animation-name:slidein;\n\tanimation-name:slidein;\n\twidth: 50%;\n\tdisplay: flex;\n}\n.AboutInfo-ArticleWhiteSide_wrapper {\n\tdisplay:flex;\n\tposition:relative;\n\tflex-direction:column;\n\tmax-width:45vh;\n\tmax-height:50vh;\n\toverflow-wrap:break-word;\n\toverflow:auto;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n\tmargin-left: 10vh;\n}\nh2 {\n\tfont-size:44px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:500;\n\twill-change: color;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:2%;\n\ttransition-property:color;\n\ttransition-duration:1s;\n\ttransition-timing-function:ease-out;\n}\np {\n\tfont-size:1.5em;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:300;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:0px;\n\tpadding-right:10px;\n}\n.BodyDivisorWhite-PhotoItem_wrapper {\n\tposition: relative;\n\ttop: 70%;\n\tmargin-left: 70%;\n\tz-index: 99998;\n\ttransition: all 2s 200ms cubic-bezier(0.86, 0, 0.07, 1);\n}\n.BodyDivisorWhite-PhotoItem_wrapper:hover {\n\ttransform: translateY(-60px);\n}\nimg {\n\tmax-width: 100%;\n\theight: auto;\n}\n.Button_opened {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:13px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:black;\n\ttext-align:center;\n\tbackground:rgba(255, 255, 255, 0.6);\n\tborder-radius:50%;\n\t-webkit-animation:shadow-pulse 3s infinite;\n\tanimation:shadow-pulse 3s infinite;\n\t-webkit-animation-delay:6s;\n\tanimation-delay:6s;\n\tcursor: pointer;\n}\n.Button_opened:hover {\n\tbackground-color: rgba(40, 127, 165, 0.4);\n}\n.Gallery-Button_closed {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:20px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:white;\n\ttext-align:center;\n\tbackground:rgba(25, 25, 25, 1);\n\tborder-radius:50%;\n\t-webkit-animation:shadow-white 10s infinite;\n\tanimation:shadow-white 10s infinite;\n\t-webkit-animation-delay:15s;\n\tanimation-delay:15s;\n\tcursor: pointer;\n\tmargin-right: 50vmin;\n\talign-self: center;\n}\n.Gallery {\n\tposition:absolute;\n\tdisplay:none;\n\tjustify-content: space-between;\n\twidth: 125vmax;\n\tbackground-color:rgba(25, 25, 25, 1);\n\tz-index:99999;\n}\n.InitialsLogo-Surname, .InitialsLogo-Name {\n\ttransition:4s, 2s, 2s;\n}\n.InitialsLogo-Surname:hover {\n\tcolor:rgba(45, 45, 45, 1);\n}\n.InitialsLogo-Name:hover {\n\tcolor:white;\n}\n\n@-webkit-keyframes slidein\n{\n\tfrom\n\t{margin-left:40%;\n\twidth:100%;}\n\tto\n\t{margin-left:0%;\n\twidth:50%;}\n}\n@-webkit-keyframes slide {\n\tfrom {\n\t\tmargin-left: 70%;\n\t\twidth: 50%;\n\t}\n\tto {\n\t\tmargin-left: 0%;\n\t\twidth: 100%;\n\t}\n}\n@-webkit-keyframes shadow-pulse{\n0% {\n\t\ttransform: scale(1, 1);\n\t\topacity: 1;\n\t}\n50%{\n\ttransform: scale(2, 2);\n\topacity: 0.5;\n\t}\n\t100%{\n\t\ttransform: scale(1, 1);\n\t\topacity: 1;\n\t\t}\n}\n@-webkit-keyframes shadow-white{\n\t0%{\n\t\ttransform: scale(1, 1);\n\t\topacity: 1;\n\t}\n  50%{\n\ttransform: scale(0.5, 0.5);\n\topacity: 0.5;\n\t}\n\t100%{\n\t\ttransform: scale(1, 1);\n\t\topacity: 1;\n\t\t}\n}\n@media screen and (max-width: 768px) {\n   .lastname, .name, .photo-right,.text-wrapper-black, .text-wrapper-white {\n    display: flex;\n  }\n  body {\n    overflow-x: hidden;\n    overflow-y: auto;\n    width: 100%;\n    height: auto;\n    margin-bottom: 0;\n    padding-bottom: 0;\n  }\n  .BodyDivisor_white, .BodyDivisor_black {\n    min-height: 768px;\n    max-height: auto;\n  }\n\n  .Nav-SocialMedia_wrapper {\n    width: 20%;\n    right: 43%;\n    top: 91%;\n    height: 7%;\n    position: absolute;\n  }\n  .Button_opened {\n    top: 6%;\n    position: absolute;\n    left: 77%;\n  }\n  .AboutInfo-ArticleBlackSide_wrapper {\n    position: absolute;\n    display: flex;\n    justify-content: space-around;\n    flex-flow: row wrap;\n    max-width: 40%;\n    min-width: 20%;\n    top: 37%;\n    left: 2em;\n    min-height: 20%;\n    max-height: 30%;\n    overflow: auto;\n\n  }\n  .ArticleBlackSide-TextItem_left {\n    border-left: 1px solid rgba(78, 178, 78, 1);\n    border-right: 0;\n    display: flex;\n    text-align: left;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    width: 70%;\n    padding-left: 5%;\n    padding-bottom: 5%;\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_right {\n    display: flex;\n    width: 70%;\n    text-align: right;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    padding-top: 10%;\n    padding-right: 5%;\n    border-right: 1px solid rgba(178, 178, 78, 1);\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_left:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n  .ArticleBlackSide-TextItem_right:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n\n  .AboutInfo-ArticleWhiteSide_wrapper {\n    position: absolute;\n    border-right: 1px solid rgba(78, 178, 78, 1);\n    left: 58%;\n    top: 30%;\n    min-width: 20%;\n    max-width: 35%;\n    min-height: 20%;\n    max-height: 40%;\n    display: flex;\n  }\n  h2 {\n  \tfont-size: 46px;\n  }\n  h2:hover {\n    font-size: 46px;\n  }\n  p {\n    font-size: 24px;\n  }\n  p:hover {\n    font-size: 24px;\n  }\n  .BioSection-SectionHeader_first {\n    margin-top: 0;\n  }\n  .InitialsLogo-Surname, .InitialsLogo-Name {\n    display: flex;\n    font-size: 40px;\n    position: absolute;\n  }\n  .InitialsLogo-Name {\n    max-width: 30%;\n    min-width: 30%;\n    color: rgba(55, 55, 55, 1);\n    top: -1%;\n    right: 68%;\n    transform: rotate(0deg);\n    background-color: rgba(78, 178, 78, 1);\n    max-height: 5%;\n  }\n  .InitialsLogo-Surname {\n    max-width: 30%;\n    min-width: 30%;\n    left: 15%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n    transform: rotate(0deg);\n    top: 5%;\n  }\n  .BodyDivisorWhite-PhotoItem_wrapper {\n    position: absolute;\n    width: 200px;\n  }\n  .BodyDivisorBlack-TextItem_title {\n    position: absolute;\n    display: flex;\n    left: 7%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n  }\n  path {\n    fill: rgba(78, 178, 178, 1);\n  }\n  path:hover {\n    fill: rgba(78, 178, 78, 1);\n  }\n  .Gallery-Button_closed {\n    position: absolute;\n    left: 80%;\n    top: 7%;\n  }\n}\n/*. sourceMappingURL=data:application/json;base64,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aHQ6MTAwJTt9XG5odG1sLCBib2R5e21hcmdpbjowO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7fVxuI2JsYWNre2JhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTttYXgtaGVpZ2h0OjEwMCU7bWF4LXdpZHRoOjUwJTt3aWR0aDo1MCU7fVxuI2xvZ28td3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MSU7ZGlzcGxheTpmbGV4O3dpZHRoOjUwJTt9XG4jbG9nby1mYWNle3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6OTIlO31cbiNsb2dvLWluc3R7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxJTt9XG4jYXJ0aXN0LXRpdGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo5MiU7bGVmdDoxJTtmb250LXNpemU6MTRweDtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Y29sb3I6cmdiYSgyNTUsIDI1NSwgMjU1LCAxKTt9XG4jdGV4dC13cmFwcGVyLWJsYWNre3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6ZmxleDttYXgtaGVpZ2h0OjI1JTtwb3NpdGlvbjpyZWxhdGl2ZTttYXgtd2lkdGg6MzYwcHg7dG9wOjM3JTtsZWZ0OjI1JTt9XG4jdGV4dC1sZWZ0LWJsYWNrLCAjdGV4dC1yaWdodC1ibGFja3tjb2xvcjp3aGl0ZTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXNpemU6MzBweDt9XG4jdGV4dC1sZWZ0LWJsYWNre3RleHQtYWxpZ246cmlnaHQ7d2lsbC1jaGFuZ2U6IGZvbnQtc2l6ZTttYXJnaW4tcmlnaHQ6MTBweDtwYWRkaW5nLXJpZ2h0OjMwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCB3aGl0ZTt0cmFuc2l0aW9uLXByb3BlcnR5OmZvbnQtc2l6ZTt0cmFuc2l0aW9uLWR1cmF0aW9uOjFzO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O31cbiN0ZXh0LXJpZ2h0LWJsYWNre3RleHQtYWxpZ246bGVmdDt3aWxsLWNoYW5nZTogZm9udC1zaXplO21hcmdpbi1sZWZ0OjEwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNsYXN0bmFtZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6ODMlO2xlZnQ6NDMlO3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6d2hpdGU7Zm9udC1zaXplOjM2cHg7d2lkdGg6MTUwcHg7aGVpZ2h0OjQwcHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7dHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpO2ZvbnQtd2VpZ2h0OjMwMDt9XG4jd2hpdGV7YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTttYXgtd2lkdGg6ODAwcHg7d2lsbC1jaGFuZ2U6IHdpZHRoLCBoZWlnaHQ7bWF4LWhlaWdodDphdXRvO3dpZHRoOjUwJTthbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jdGV4dC13cmFwcGVyLXdoaXRle2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MjUlO2xlZnQ6MjUlO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXgtd2lkdGg6MzUwcHg7bWF4LWhlaWdodDo0MDBweDtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmQ7b3ZlcmZsb3c6YXV0bztib3JkZXItcmlnaHQ6MXB4IHNvbGlkIGJsYWNrO31cbmgye2ZvbnQtc2l6ZTo0OHB4O2ZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjUwMDt3aWxsLWNoYW5nZTogY29sb3I7Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTttYXJnaW4tYm90dG9tOjBweDt0cmFuc2l0aW9uLXByb3BlcnR5OmNvbG9yO3RyYW5zaXRpb24tZHVyYXRpb246MXM7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7fVxuI2ZpcnN0LXBhcmFnLCAjc2Vjb25kLXBhcmFnLCAjdGhpcmQtcGFyYWcsICNmb3J0aC1wYXJhZywgI2ZpZnRoLXBhcmFnLCAjc2l4dGgtcGFyYWd7Zm9udC1zaXplOjE4cHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWFyZ2luLWJvdHRvbTowcHg7cGFkZGluZy1yaWdodDoxMHB4O3dpbGwtY2hhbmdlOiBmb250LXNpemU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNuYW1le3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbTo1MCU7cmlnaHQ6NDclO2ZvbnQtc2l6ZTozNnB4O3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDozMDA7fVxuI3Bob3RvLXJpZ2h0e3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6NjglO2JvdHRvbTotNTBweDt9XG4jYnV0dG9ue2Zsb2F0OnJpZ2h0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo1JTttYXJnaW46MHB4IDMwcHggODBweCAwcHg7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O2ZvbnQ6MTNweC8xMDBweCAnUm9ib3RvJywgc2Fucy1zZXJpZjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6MXB4O2NvbG9yOmJsYWNrO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6cmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO31cbiNjbG9zZS1idXR0b257cG9zaXRpb246YWJzb2x1dGU7bGVmdDo5MCU7dG9wOjUlO21hcmdpbjowcHggMzBweCA4MHB4IDBweDt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Zm9udDoyMHB4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzoxcHg7Y29sb3I6d2hpdGU7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZDpyZ2JhKDQ1LCA0NSwgNDUsIDEpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctd2hpdGUgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnl7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO21heC13aWR0aDoxMjAlO3dpZHRoOjEwMCU7aGVpZ2h0OjExMCU7bWF4LWhlaWdodDoxMTAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNSwgMjUsIDI1LCAwLjkpO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnktd3JhcHBlcnt3aWR0aDo3MCU7d2lsbC1jaGFuZ2U6IGJhY2tncm91bmQtY29sb3I7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2UtaW47dHJhbnNpdGlvbi1kdXJhdGlvbjoyczttYXJnaW46YXV0bztib3JkZXItcmFkaXVzOjEycHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDAuOCk7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjcwJTttYXgtaGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO292ZXJmbG93LXg6YXV0bzt9XG4jZ2FsbGVyeS1oZWFkZXItd3JhcHBlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtwb3NpdGlvbjpmaXhlZDt3aWR0aDo3MCU7Ym9yZGVyLXJhZGl1czoxMnB4O2hlaWdodDphdXRvO2JvcmRlci1ib3R0b206cmdiYSg1NSwgNTUsIDU1LCAxKTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWF4LWhlaWdodDoyMCU7ei1pbmRleDo5OTk5ODt9XG5oM3tmb250LXNpemU6MzZweDt3aWxsLWNoYW5nZTogY29sb3I7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc3R5bGU6aXRhbGljO2JvdHRvbToxMCU7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2NvbG9yOndoaXRlO3RyYW5zaXRpb246Y29sb3I7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDt9XG4uc2VsZWN0LWJsb2Nre2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZ3JhcGhpY3MtYmxvY2t7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOnJlbGF0aXZlO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3dpZHRoOjEwMCU7fVxuI2FydC1ibG9ja3tkaXNwbGF5Om5vbmU7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47fVxuZmlndXJle2Rpc3BsYXk6ZmxleDttYXJnaW46MjMlIDAgMjAlIDEwJTt9XG4jaW1hZ2U6aG92ZXJ7Ym94LXNoYWRvdzo0cHggOXB4IDlweCAxcHggcmdiYSgwLCAwLCAwLCAwLjYpO3RyYW5zZm9ybTpzY2FsZSgxLjgsIDEuOCk7fVxuI2dhbGxlcnktd3JhcHBlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoOTAsIDkwLCA5MCwgMC44KTt9XG5oMzpob3Zlcntib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDg1LCA4NSwgODUsIDEpO2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZmlyc3QtcGFyYWc6aG92ZXIsICNzZWNvbmQtcGFyYWc6aG92ZXIsICN0aGlyZC1wYXJhZzpob3ZlciwgI2ZvcnRoLXBhcmFnOmhvdmVyLCAjZmlmdGgtcGFyYWc6aG92ZXIsICNzaXh0aC1wYXJhZzpob3ZlciwgI3RleHQtbGVmdC1ibGFjazpob3ZlciwgI3RleHQtcmlnaHQtYmxhY2s6aG92ZXJ7Zm9udC1zaXplOjI0cHg7fVxuI3RleHQtd3JhcHBlci13aGl0ZSwgI3RleHQtd3JhcHBlci1ibGFja3thbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jbGFzdG5hbWUsICNuYW1le3RyYW5zaXRpb246NHMsIDJzLCAyczt9XG4jbGFzdG5hbWU6aG92ZXJ7Y29sb3I6cmdiKDI1LCAyNSwgMjUpO31cbiNuYW1lOmhvdmVye2NvbG9yOnJnYigxNzUsIDE3NSwgMTc1KTt9XG4ucm90YXRlOTB7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTstbW96LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1vLXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1tcy10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt9XG5Aa2V5ZnJhbWVzIHNsaWRlaW57ZnJvbXttYXJnaW4tbGVmdDoxMCU7d2lkdGg6MTAwJTt9XG50b3ttYXJnaW4tbGVmdDowJTt3aWR0aDo1MCU7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctcHVsc2V7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjI1JXtib3gtc2hhZG93OjAgMCAwIDEwcHggcmdiYSg0MCwgMTY1LCA3NSwgMC41KTt9XG41MCV7Ym94LXNoYWRvdzowIDAgMCAxNXB4IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO31cbjc1JXtib3gtc2hhZG93OjAgMCAwIDBweCByZ2JhKDE2NSwgMTA4LCA0MCwgMC4yKTt9XG4xMDAle2JveC1zaGFkb3c6MCAwIDAgMzVweCByZ2JhKDAsIDAsIDI1NSwgMCk7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctd2hpdGV7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjEwMCV7Ym94LXNoYWRvdzowIDAgMCAzNXB4IHJnYmEoMCwgMCwgMCwgMCk7fVxufSJdfQ== */\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _script_closeGallery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script/closeGallery.js */ "./src/script/closeGallery.js");
/* harmony import */ var _script_openGallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script/openGallery.js */ "./src/script/openGallery.js");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _script_imagePicker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script/imagePicker.js */ "./src/script/imagePicker.js");





window.onload = function () {
  Object(_script_closeGallery_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_script_openGallery_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_script_imagePicker_js__WEBPACK_IMPORTED_MODULE_3__["init"])();
  Object(_script_imagePicker_js__WEBPACK_IMPORTED_MODULE_3__["selectItem"])();
  Object(_script_imagePicker_js__WEBPACK_IMPORTED_MODULE_3__["galleryWrapLeft"])();
  Object(_script_imagePicker_js__WEBPACK_IMPORTED_MODULE_3__["galleryWrapRight"])();
};

/***/ }),

/***/ "./src/script/closeGallery.js":
/*!************************************!*\
  !*** ./src/script/closeGallery.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return closeGallery; });
function closeGallery() {
  var button = document.getElementsByClassName('Gallery-Button_closed')[0],
      background = document.getElementsByClassName('BodyDivisorBlack-MainGroup')[0],
      gallery = document.getElementsByClassName('Gallery')[0];

  button.onclick = function () {
    gallery.style.display = 'none';
    background.style.filter = 'none';
  };
}

/***/ }),

/***/ "./src/script/imagePicker.js":
/*!***********************************!*\
  !*** ./src/script/imagePicker.js ***!
  \***********************************/
/*! exports provided: init, galleryWrapLeft, galleryWrapRight, selectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "galleryWrapLeft", function() { return galleryWrapLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "galleryWrapRight", function() { return galleryWrapRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectItem", function() { return selectItem; });
var gallery = document.querySelector('.Gallery-SliderPreview');
var galleryItems = document.querySelectorAll('.gallery-item');
var numOfItems = gallery.children.length;
var itemWidth = 23; // percent: as set in css

var featured = document.querySelector('.featured-item');

var selectItem = function selectItem(e) {
  if (e.target.classList.contains('active')) return;
  featured.style.backgroundImage = e.target.style.backgroundImage;

  for (var i = 0; i < galleryItems.length; i++) {
    if (galleryItems[i].classList.contains('active')) galleryItems[i].classList.remove('active');
  }

  e.target.classList.add('active');
};

var galleryWrapLeft = function galleryWrapLeft() {
  var first = gallery.children[0];
  gallery.removeChild(first);
  gallery.style.left = -itemWidth + '%';
  gallery.appendChild(first);
  gallery.style.left = '0%';
};

var galleryWrapRight = function galleryWrapRight() {
  var last = gallery.children[gallery.children.length - 1];
  gallery.removeChild(last);
  gallery.insertBefore(last, gallery.children[0]);
  gallery.style.left = '-23%';
}; //Start this baby up


var init = function init() {
  var images = ['../../src/img/small/graph1.jpg', '../../src/img/small/graph2.jpg', '../../src/img/small/graph3.jpg', '../../src/img/small/graph4.jpg', '../../src/img/small/graph5.jpg', '../../src/img/small/graph6.jpg', '../../src/img/small/graph7.jpg', '../../src/img/small/graph8.jpg', '../../src/img/small/graph9.jpg', '../../src/img/small/graph10.jpg', '../../src/img/small/graph11.jpg', '../../src/img/small/graph12.jpg', '../../src/img/small/graph13.jpg', '../../src/img/small/graph14.jpg', '../../src/img/small/graph15.jpg', '../../src/img/small/graph16.jpg', '../../src/img/small/graph17.jpg', '../../src/img/small/graph18.jpg', '../../src/img/small/graph19.jpg', '../../src/img/small/graph20.jpg', '../../src/img/small/graph21.jpg', '../../src/img/small/graph22.jpg', '../../src/img/small/graph23.jpg', '../../src/img/small/graph24.jpg', '../../src/img/small/graph25.jpg', '../../src/img/small/graph26.jpg', '../../src/img/small/graph27.jpg', '../../src/img/small/graph28.jpg', '../../src/img/small/graph29.jpg', '../../src/img/small/graph30.jpg', '../../src/img/small/graph31.jpg', '../../src/img/small/graph32.jpg', '../../src/img/small/graph33.jpg', '../../src/img/small/graph34.jpg', '../../src/img/small/graph35.jpg', '../../src/img/small/graph36.jpg'];
  var featureImages = ['../../src/img/big/graphics1.jpg', '../../src/img/big/graphics2.jpg', '../../src/img/big/graphics3.jpg', '../../src/img/big/graphics4.jpg', '../../src/img/big/graphics5.jpg', '../../src/img/big/graphics6.jpg', '../../src/img/big/graphics7.jpg', '../../src/img/big/graphics8.jpg', '../../src/img/big/graphics9.jpg', '../../src/img/big/graphics10.jpg', '../../src/img/big/graphics11.jpg', '../../src/img/big/graphics12.jpg', '../../src/img/big/graphics13.jpg', '../../src/img/big/graphics14.jpg', '../../src/img/big/graphics15.jpg', '../../src/img/big/graphics16.jpg', '../../src/img/big/graphics17.jpg', '../../src/img/big/graphics18.jpg', '../../src/img/big/graphics19.jpg', '../../src/img/big/graphics20.jpg', '../../src/img/big/graphics21.jpg', '../../src/img/big/graphics22.jpg', '../../src/img/big/graphics23.jpg', '../../src/img/big/graphics24.jpg', '../../src/img/big/graphics25.jpg', '../../src/img/big/graphics26.jpg', '../../src/img/big/graphics27.jpg', '../../src/img/big/graphics28.jpg', '../../src/img/big/graphics29.jpg', '../../src/img/big/graphics30.jpg', '../../src/img/big/graphics31.jpg', '../../src/img/big/graphics32.jpg', '../../src/img/big/graphics33.jpg', '../../src/img/big/graphics34.jpg', '../../src/img/big/graphics35.jpg', '../../src/img/big/graphics36.jpg']; //Set Initial Featured Image

  featured.style.backgroundImage = 'url(' + featureImages[0] + ')'; //Set Images for Gallery and Add Event Listeners

  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
    galleryItems[i].addEventListener('click', selectItem);
  }
};



/***/ }),

/***/ "./src/script/openGallery.js":
/*!***********************************!*\
  !*** ./src/script/openGallery.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return openGallery; });
function openGallery() {
  var button = document.getElementsByClassName('Button_opened')[0],
      background = document.getElementsByClassName('BodyDivisorBlack-MainGroup')[0],
      gallery = document.getElementsByClassName('Gallery')[0];

  button.onclick = function () {
    gallery.style.display = 'flex';
    background.style.filter = 'blur(5px)';
  };
}

/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/style/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/style/style.css", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/style/style.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvY2xvc2VHYWxsZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvaW1hZ2VQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC9vcGVuR2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvc3R5bGUuY3NzP2M3MTYiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiY2xvc2VHYWxsZXJ5Iiwib3BlbkdhbGxlcnkiLCJpbml0Iiwic2VsZWN0SXRlbSIsImdhbGxlcnlXcmFwTGVmdCIsImdhbGxlcnlXcmFwUmlnaHQiLCJidXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJiYWNrZ3JvdW5kIiwiZ2FsbGVyeSIsIm9uY2xpY2siLCJzdHlsZSIsImRpc3BsYXkiLCJmaWx0ZXIiLCJxdWVyeVNlbGVjdG9yIiwiZ2FsbGVyeUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsIm51bU9mSXRlbXMiLCJjaGlsZHJlbiIsImxlbmd0aCIsIml0ZW1XaWR0aCIsImZlYXR1cmVkIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYmFja2dyb3VuZEltYWdlIiwiaSIsInJlbW92ZSIsImFkZCIsImZpcnN0IiwicmVtb3ZlQ2hpbGQiLCJsZWZ0IiwiYXBwZW5kQ2hpbGQiLCJsYXN0IiwiaW5zZXJ0QmVmb3JlIiwiaW1hZ2VzIiwiZmVhdHVyZUltYWdlcyIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtB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Q0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsS0FBSyxLQUF3QyxFQUFFLEVBRTdDOztBQUVGLFFBQVEsc0JBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDRHQUFzRDtBQUN6RSxtQkFBbUIsbUJBQU8sQ0FBQyw0R0FBc0Q7O0FBRWpGLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJjNjFlOGIwZjE2Y2VmNjllNzdiN1wiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJkZXZcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9kaXN0L2Rldi9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keXtcXG5cXHRkaXNwbGF5OmZsZXg7XFxufVxcbmh0bWwsIGJvZHkge1xcblxcdG1hcmdpbjowO1xcblxcdG92ZXJmbG93OmhpZGRlbjtcXG5cXHRwYWRkaW5nOjA7XFxufVxcbm1haW4ge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdG9wYWNpdHk6IDAuOTtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHR6LWluZGV4OiA5OTk5ODtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxuXFx0ZmxleC1mbG93OiByb3cgd3JhcFxcbn1cXG4uR2FsbGVyeS1Tb2NpYWxNZWRpYV93cmFwcGVyIHtcXG5cXHRtYXJnaW46IDAgMXZoO1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1mbG93OiBjb2x1bW47XFxuXFx0YWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG4uZmVhdHVyZSB7XFxuXFx0IGRpc3BsYXk6IGZsZXg7XFxuXFx0IG1pbi13aWR0aDogNDB2bWluO1xcblxcdCBtYXgtaGVpZ2h0OiA3MHZtaW47XFxuXFx0IHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHQgdG9wOiAyMHZoO1xcblxcdCBsZWZ0OiAxOHZoO1xcbn1cXG4uR2FsbGVyeS1TbGlkZXJQcmV2aWV3X3dyYXBwZXIge1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUsIDE1LCAxNSwgMSk7XFxuXFx0bWluLWhlaWdodDogMTN2bWluO1xcblxcdHRvcDogODV2bWluO1xcblxcdGJvcmRlci1yYWRpdXM6IDF2aDtcXG5cXHRsZWZ0OiAxOHZtaW47XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjozcztcXG5cXHRhbmltYXRpb24tZHVyYXRpb246M3M7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tbmFtZTpzbGlkZTtcXG5cXHRhbmltYXRpb24tbmFtZTpzbGlkZTtcXG5cXHRhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC42OCwgLTAuNTUsIDAuMjY1LCAxLjU1KTtcXG59XFxuLkdhbGxlcnktU2xpZGVyUHJldmlldyB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMTUsIDExNSwgMTE1LCAwLjgpO1xcblxcdG1heC13aWR0aDogOTB2bWluO1xcblxcdGJvcmRlci1yYWRpdXM6IDF2aDtcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcdG92ZXJmbG93LXg6IHNjcm9sbDtcXG5cXHRvdmVyZmxvdy15OiBoaWRkZW47XFxuXFx0YWxpZ24tY29udGVudDogY2VudGVyO1xcblxcdG1hcmdpbi1sZWZ0OiA1dmg7XFxufVxcblxcbi5mZWF0dXJlZC1pdGVtIHtcXG5cXHRtaW4taGVpZ2h0OiAzMHZtaW47XFxuXFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIHRvcDtcXG5cXHRtaW4td2lkdGg6IDQwdm1pbjtcXG5cXHRiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi54eS1jZW50ZXIge1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IDUwJTtcXG5cXHRsZWZ0OiA1MCU7XFxuXFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxufVxcblxcbi50cmFuc2l0aW9uIHtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMzUwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5yLTMtMiB7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0cGFkZGluZy1ib3R0b206IDY2LjY2NyU7XFxufVxcblxcbi5pbWFnZS1ob2xkZXIge1xcblxcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuXFx0YmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uaXRlbS13cmFwcGVyIHtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxuXFx0d2lkdGg6IDEwMCU7IC8qIGFyYml0cmFyeSB2YWx1ZSAqL1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0bWFyZ2luOiAwIDJ2aDtcXG5cXHRmbGV4LWZsb3c6IGNvbHVtbjtcXG59XFxuXFxuLmdhbGxlcnktaXRlbSB7IG9wYWNpdHk6IDAuNTsgfVxcbi5nYWxsZXJ5LWl0ZW0uYWN0aXZlIHsgb3BhY2l0eTogMTsgfVxcblxcbi5BZGp1c3RQb3NpdGlvbi1CdXR0b25fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcXG59XFxuLk1haW5Hcm91cC1BYm91dEluZm9fd3JhcHBlciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRtYXgtaGVpZ2h0OiA1MCU7XFxuXFx0bWluLXdpZHRoOiAxNSU7XFxuXFx0bWF4LXdpZHRoOiAxMDAlO1xcblxcdGZsZXgtZmxvdzogcm93IHdyYXA7XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcblxcdHdpZHRoOiAxMzB2aDtcXG5cXHRtYXJnaW4tdG9wOiAtMTV2aDtcXG59XFxuLkJvZHlEaXZpc29yX2JsYWNrIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0d2lkdGg6IDUwJTtcXG5cXHRoZWlnaHQ6IDEwMDBweDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbn1cXG4uTmF2LVNvY2lhbE1lZGlhX3dyYXBwZXIge1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHR3aWR0aDoxMDAlO1xcblxcdGhlaWdodDogM2VtO1xcblxcdGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cXG4uQm9keURpdmlzb3JCbGFjay1UZXh0SXRlbV90aXRsZSB7XFxuXFx0cG9zaXRpb246YWJzb2x1dGU7XFxuXFx0dG9wOjkyJTtcXG5cXHRsZWZ0OjElO1xcblxcdGZvbnQtc2l6ZToxNHB4O1xcblxcdGZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OjgwMDtcXG5cXHRjb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcblxcdGN1cnNvcjogdGV4dDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG59XFxuLkFib3V0SW5mby1BcnRpY2xlQmxhY2tTaWRlX3dyYXBwZXIge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0bWF4LWhlaWdodDogMjV2aDtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0bWF4LXdpZHRoOiA1MHZtaW47XFxuXFx0YWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG4uQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9sZWZ0LCAuQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9yaWdodCB7XFxuXFx0Y29sb3I6d2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC1zaXplOjEuN2VtO1xcbn1cXG4uQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9sZWZ0IHtcXG5cXHR0ZXh0LWFsaWduOnJpZ2h0O1xcblxcdG1hcmdpbi1yaWdodDoxMHB4O1xcblxcdHBhZGRpbmctcmlnaHQ6MjVweDtcXG5cXHRvdmVyZmxvdzphdXRvO1xcblxcdHdpZHRoOjUwJTtcXG5cXHRib3JkZXItcmlnaHQ6MXB4IHNvbGlkIHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbn1cXG4uQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9yaWdodCB7XFxuXFx0dGV4dC1hbGlnbjpsZWZ0O1xcblxcdG1hcmdpbi1sZWZ0OjEwcHg7XFxuXFx0b3ZlcmZsb3c6YXV0bztcXG5cXHR3aWR0aDo1MCU7XFxufVxcbi5Jbml0aWFsc0xvZ28tTmFtZSB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGZvbnQtc2l6ZTogMi41ZW07XFxuXFx0Y29sb3I6IHJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0Zm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuXFx0aGVpZ2h0OiAxZW07XFxuXFx0bWFyZ2luOiAwO1xcblxcdGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLkluaXRpYWxzTG9nby1TdXJuYW1lIHtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuXFx0Zm9udC1zaXplOiAyLjVlbTtcXG5cXHRoZWlnaHQ6IDFlbTtcXG5cXHRmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6IDMwMDtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0bWFyZ2luOiAwO1xcblxcdGxlZnQ6IDMwJTtcXG5cXHR3aWR0aDogLW1vei1maXQtY29udGVudDtcXG5cXHRtYXJnaW4tdG9wOiAxJTtcXG5cXHRjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbi5Cb2R5RGl2aXNvcl93aGl0ZSB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjozcztcXG5cXHRhbmltYXRpb24tZHVyYXRpb246M3M7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tbmFtZTpzbGlkZWluO1xcblxcdGFuaW1hdGlvbi1uYW1lOnNsaWRlaW47XFxuXFx0d2lkdGg6IDUwJTtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbn1cXG4uQWJvdXRJbmZvLUFydGljbGVXaGl0ZVNpZGVfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcblxcdGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcXG5cXHRtYXgtd2lkdGg6NDV2aDtcXG5cXHRtYXgtaGVpZ2h0OjUwdmg7XFxuXFx0b3ZlcmZsb3ctd3JhcDpicmVhay13b3JkO1xcblxcdG92ZXJmbG93OmF1dG87XFxuXFx0Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG5cXHRtYXJnaW4tbGVmdDogMTB2aDtcXG59XFxuaDIge1xcblxcdGZvbnQtc2l6ZTo0NHB4O1xcblxcdGZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OjUwMDtcXG5cXHR3aWxsLWNoYW5nZTogY29sb3I7XFxuXFx0Y29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHRtYXJnaW4tYm90dG9tOjIlO1xcblxcdHRyYW5zaXRpb24tcHJvcGVydHk6Y29sb3I7XFxuXFx0dHJhbnNpdGlvbi1kdXJhdGlvbjoxcztcXG5cXHR0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDtcXG59XFxucCB7XFxuXFx0Zm9udC1zaXplOjEuNWVtO1xcblxcdGZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OjMwMDtcXG5cXHRjb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcblxcdG1hcmdpbi1ib3R0b206MHB4O1xcblxcdHBhZGRpbmctcmlnaHQ6MTBweDtcXG59XFxuLkJvZHlEaXZpc29yV2hpdGUtUGhvdG9JdGVtX3dyYXBwZXIge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHR0b3A6IDcwJTtcXG5cXHRtYXJnaW4tbGVmdDogNzAlO1xcblxcdHotaW5kZXg6IDk5OTk4O1xcblxcdHRyYW5zaXRpb246IGFsbCAycyAyMDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSk7XFxufVxcbi5Cb2R5RGl2aXNvcldoaXRlLVBob3RvSXRlbV93cmFwcGVyOmhvdmVyIHtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwcHgpO1xcbn1cXG5pbWcge1xcblxcdG1heC13aWR0aDogMTAwJTtcXG5cXHRoZWlnaHQ6IGF1dG87XFxufVxcbi5CdXR0b25fb3BlbmVkIHtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHR3aWR0aDoxMDBweDtcXG5cXHRoZWlnaHQ6MTAwcHg7XFxuXFx0Zm9udDoxM3B4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtcXG5cXHRsZXR0ZXItc3BhY2luZzoxcHg7XFxuXFx0Y29sb3I6YmxhY2s7XFxuXFx0dGV4dC1hbGlnbjpjZW50ZXI7XFxuXFx0YmFja2dyb3VuZDpyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuXFx0Ym9yZGVyLXJhZGl1czo1MCU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb246c2hhZG93LXB1bHNlIDNzIGluZmluaXRlO1xcblxcdGFuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6NnM7XFxuXFx0YW5pbWF0aW9uLWRlbGF5OjZzO1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLkJ1dHRvbl9vcGVuZWQ6aG92ZXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO1xcbn1cXG4uR2FsbGVyeS1CdXR0b25fY2xvc2VkIHtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHR3aWR0aDoxMDBweDtcXG5cXHRoZWlnaHQ6MTAwcHg7XFxuXFx0Zm9udDoyMHB4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtcXG5cXHRsZXR0ZXItc3BhY2luZzoxcHg7XFxuXFx0Y29sb3I6d2hpdGU7XFxuXFx0dGV4dC1hbGlnbjpjZW50ZXI7XFxuXFx0YmFja2dyb3VuZDpyZ2JhKDI1LCAyNSwgMjUsIDEpO1xcblxcdGJvcmRlci1yYWRpdXM6NTAlO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uOnNoYWRvdy13aGl0ZSAxMHMgaW5maW5pdGU7XFxuXFx0YW5pbWF0aW9uOnNoYWRvdy13aGl0ZSAxMHMgaW5maW5pdGU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6MTVzO1xcblxcdGFuaW1hdGlvbi1kZWxheToxNXM7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdG1hcmdpbi1yaWdodDogNTB2bWluO1xcblxcdGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuLkdhbGxlcnkge1xcblxcdHBvc2l0aW9uOmFic29sdXRlO1xcblxcdGRpc3BsYXk6bm9uZTtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuXFx0d2lkdGg6IDEyNXZtYXg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1LCAyNSwgMjUsIDEpO1xcblxcdHotaW5kZXg6OTk5OTk7XFxufVxcbi5Jbml0aWFsc0xvZ28tU3VybmFtZSwgLkluaXRpYWxzTG9nby1OYW1lIHtcXG5cXHR0cmFuc2l0aW9uOjRzLCAycywgMnM7XFxufVxcbi5Jbml0aWFsc0xvZ28tU3VybmFtZTpob3ZlciB7XFxuXFx0Y29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG59XFxuLkluaXRpYWxzTG9nby1OYW1lOmhvdmVyIHtcXG5cXHRjb2xvcjp3aGl0ZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNsaWRlaW5cXG57XFxuXFx0ZnJvbVxcblxcdHttYXJnaW4tbGVmdDo0MCU7XFxuXFx0d2lkdGg6MTAwJTt9XFxuXFx0dG9cXG5cXHR7bWFyZ2luLWxlZnQ6MCU7XFxuXFx0d2lkdGg6NTAlO31cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIHNsaWRlIHtcXG5cXHRmcm9tIHtcXG5cXHRcXHRtYXJnaW4tbGVmdDogNzAlO1xcblxcdFxcdHdpZHRoOiA1MCU7XFxuXFx0fVxcblxcdHRvIHtcXG5cXHRcXHRtYXJnaW4tbGVmdDogMCU7XFxuXFx0XFx0d2lkdGg6IDEwMCU7XFxuXFx0fVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2hhZG93LXB1bHNle1xcbjAlIHtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcblxcdFxcdG9wYWNpdHk6IDE7XFxuXFx0fVxcbjUwJXtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDIsIDIpO1xcblxcdG9wYWNpdHk6IDAuNTtcXG5cXHR9XFxuXFx0MTAwJXtcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcblxcdFxcdG9wYWNpdHk6IDE7XFxuXFx0XFx0fVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2hhZG93LXdoaXRle1xcblxcdDAle1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuXFx0XFx0b3BhY2l0eTogMTtcXG5cXHR9XFxuICA1MCV7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSgwLjUsIDAuNSk7XFxuXFx0b3BhY2l0eTogMC41O1xcblxcdH1cXG5cXHQxMDAle1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuXFx0XFx0b3BhY2l0eTogMTtcXG5cXHRcXHR9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XFxuICAgLmxhc3RuYW1lLCAubmFtZSwgLnBob3RvLXJpZ2h0LC50ZXh0LXdyYXBwZXItYmxhY2ssIC50ZXh0LXdyYXBwZXItd2hpdGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcbiAgYm9keSB7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgcGFkZGluZy1ib3R0b206IDA7XFxuICB9XFxuICAuQm9keURpdmlzb3Jfd2hpdGUsIC5Cb2R5RGl2aXNvcl9ibGFjayB7XFxuICAgIG1pbi1oZWlnaHQ6IDc2OHB4O1xcbiAgICBtYXgtaGVpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgLk5hdi1Tb2NpYWxNZWRpYV93cmFwcGVyIHtcXG4gICAgd2lkdGg6IDIwJTtcXG4gICAgcmlnaHQ6IDQzJTtcXG4gICAgdG9wOiA5MSU7XFxuICAgIGhlaWdodDogNyU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIH1cXG4gIC5CdXR0b25fb3BlbmVkIHtcXG4gICAgdG9wOiA2JTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA3NyU7XFxuICB9XFxuICAuQWJvdXRJbmZvLUFydGljbGVCbGFja1NpZGVfd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAgIG1heC13aWR0aDogNDAlO1xcbiAgICBtaW4td2lkdGg6IDIwJTtcXG4gICAgdG9wOiAzNyU7XFxuICAgIGxlZnQ6IDJlbTtcXG4gICAgbWluLWhlaWdodDogMjAlO1xcbiAgICBtYXgtaGVpZ2h0OiAzMCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcblxcbiAgfVxcbiAgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fbGVmdCB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICAgIGJvcmRlci1yaWdodDogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcbiAgICBjb2xvcjogcmdiYSgxNDgsIDE0OCwgMTQ4LCAxKTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgcGFkZGluZy1sZWZ0OiA1JTtcXG4gICAgcGFkZGluZy1ib3R0b206IDUlO1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAycztcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogY29sb3I7XFxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXG4gIH1cXG4gIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoMTQ4LCAxNDgsIDE0OCwgMSk7XFxuICAgIHBhZGRpbmctdG9wOiAxMCU7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDUlO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDE3OCwgMTc4LCA3OCwgMSk7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDJzO1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBjb2xvcjtcXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgfVxcbiAgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fbGVmdDpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoNzgsIDc4LCA3OCwgMSk7XFxuICB9XFxuICAuQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9yaWdodDpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoNzgsIDc4LCA3OCwgMSk7XFxuICB9XFxuXFxuICAuQWJvdXRJbmZvLUFydGljbGVXaGl0ZVNpZGVfd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICAgIGxlZnQ6IDU4JTtcXG4gICAgdG9wOiAzMCU7XFxuICAgIG1pbi13aWR0aDogMjAlO1xcbiAgICBtYXgtd2lkdGg6IDM1JTtcXG4gICAgbWluLWhlaWdodDogMjAlO1xcbiAgICBtYXgtaGVpZ2h0OiA0MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxuICBoMiB7XFxuICBcXHRmb250LXNpemU6IDQ2cHg7XFxuICB9XFxuICBoMjpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogNDZweDtcXG4gIH1cXG4gIHAge1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICB9XFxuICBwOmhvdmVyIHtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgfVxcbiAgLkJpb1NlY3Rpb24tU2VjdGlvbkhlYWRlcl9maXJzdCB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuICAuSW5pdGlhbHNMb2dvLVN1cm5hbWUsIC5Jbml0aWFsc0xvZ28tTmFtZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgfVxcbiAgLkluaXRpYWxzTG9nby1OYW1lIHtcXG4gICAgbWF4LXdpZHRoOiAzMCU7XFxuICAgIG1pbi13aWR0aDogMzAlO1xcbiAgICBjb2xvcjogcmdiYSg1NSwgNTUsIDU1LCAxKTtcXG4gICAgdG9wOiAtMSU7XFxuICAgIHJpZ2h0OiA2OCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gICAgbWF4LWhlaWdodDogNSU7XFxuICB9XFxuICAuSW5pdGlhbHNMb2dvLVN1cm5hbWUge1xcbiAgICBtYXgtd2lkdGg6IDMwJTtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICAgIGxlZnQ6IDE1JTtcXG4gICAgY29sb3I6IHJnYmEoNTUsIDU1LCA1NSwgMSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgdG9wOiA1JTtcXG4gIH1cXG4gIC5Cb2R5RGl2aXNvcldoaXRlLVBob3RvSXRlbV93cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICB9XFxuICAuQm9keURpdmlzb3JCbGFjay1UZXh0SXRlbV90aXRsZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbGVmdDogNyU7XFxuICAgIGNvbG9yOiByZ2JhKDU1LCA1NSwgNTUsIDEpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gIH1cXG4gIHBhdGgge1xcbiAgICBmaWxsOiByZ2JhKDc4LCAxNzgsIDE3OCwgMSk7XFxuICB9XFxuICBwYXRoOmhvdmVyIHtcXG4gICAgZmlsbDogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICB9XFxuICAuR2FsbGVyeS1CdXR0b25fY2xvc2VkIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHRvcDogNyU7XFxuICB9XFxufVxcbi8qLiBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOMGVXeGxMbU56Y3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeExRVUZMTEdGQlFXRXNXVUZCV1N4RFFVRkRPMEZCUXk5Q0xGZEJRVmNzVTBGQlV5eG5Ra0ZCWjBJc1ZVRkJWU3hEUVVGRE8wRkJReTlETEU5QlFVOHNjVU5CUVhGRExHZENRVUZuUWl4alFVRmpMRlZCUVZVc1EwRkJRenRCUVVOeVJpeGpRVUZqTEd0Q1FVRnJRaXhQUVVGUExHRkJRV0VzVlVGQlZTeERRVUZETzBGQlF5OUVMRmRCUVZjc2EwSkJRV3RDTEZOQlFWTXNRMEZCUXp0QlFVTjJReXhYUVVGWExHdENRVUZyUWl4UlFVRlJMRU5CUVVNN1FVRkRkRU1zWTBGQll5eHJRa0ZCYTBJc1VVRkJVU3hSUVVGUkxHVkJRV1VzYVVOQlFXbERMR2RDUVVGblFpdzJRa0ZCTmtJc1EwRkJRenRCUVVNNVNTeHZRa0ZCYjBJc2EwSkJRV3RDTEdGQlFXRXNaVUZCWlN4clFrRkJhMElzWjBKQlFXZENMRkZCUVZFc1UwRkJVeXhEUVVGRE8wRkJRM1JJTEc5RFFVRnZReXhaUVVGWkxHbERRVUZwUXl4bFFVRmxMRU5CUVVNN1FVRkRha2NzYVVKQlFXbENMR2xDUVVGcFFpeDFRa0ZCZFVJc2EwSkJRV3RDTEcxQ1FVRnRRaXhqUVVGakxGVkJRVlVzTmtKQlFUWkNMRGhDUVVFNFFpeDFRa0ZCZFVJc2IwTkJRVzlETEVOQlFVTTdRVUZETjA4c2EwSkJRV3RDTEdkQ1FVRm5RaXgxUWtGQmRVSXNhVUpCUVdsQ0xHTkJRV01zVlVGQlZTdzRRa0ZCT0VJc2RVSkJRWFZDTEcxRFFVRnRReXhEUVVGRE8wRkJRek5NTEZWQlFWVXNhMEpCUVd0Q0xGRkJRVkVzVTBGQlV5eDFRa0ZCZFVJc1dVRkJXU3hsUVVGbExGbEJRVmtzV1VGQldTeHBRMEZCYVVNc2FVTkJRWGxDTEVGQlFYcENMSGxDUVVGNVFpeG5Ra0ZCWjBJc1EwRkJRenRCUVVOc1RTeFBRVUZQTEhWQ1FVRjFRaXhuUWtGQlowSXNNa0pCUVRKQ0xHZENRVUZuUWl4VlFVRlZMRGhDUVVGelFpeEJRVUYwUWl4elFrRkJjMElzSzBKQlFYVkNMRUZCUVhaQ0xIVkNRVUYxUWl4RFFVRkRPMEZCUTJwS0xHOUNRVUZ2UWl4aFFVRmhMR3RDUVVGclFpeFJRVUZSTEZOQlFWTXNjMEpCUVhOQ0xHZENRVUZuUWl4cFFrRkJhVUlzZVVKQlFYbENMR05CUVdNc05rSkJRVFpDTEVOQlFVTTdRVUZEYUUwc1IwRkJSeXhsUVVGbExHbERRVUZwUXl4blFrRkJaMElzYlVKQlFXMUNMREJDUVVFd1FpeHJRa0ZCYTBJc01FSkJRVEJDTEhWQ1FVRjFRaXh2UTBGQmIwTXNRMEZCUXp0QlFVTjRUaXh2UmtGQmIwWXNaVUZCWlN4cFEwRkJhVU1zWjBKQlFXZENMREJDUVVFd1FpeHJRa0ZCYTBJc2JVSkJRVzFDTEhWQ1FVRjFRaXc0UWtGQk9FSXNkVUpCUVhWQ0xHMURRVUZ0UXl4RFFVRkRPMEZCUTI1VkxFMUJRVTBzYTBKQlFXdENMRmRCUVZjc1ZVRkJWU3hsUVVGbExIVkNRVUYxUWl3d1FrRkJNRUlzWjBOQlFYZENMRUZCUVhoQ0xIZENRVUYzUWl4cFEwRkJhVU1zWjBKQlFXZENMRU5CUVVNN1FVRkRka3dzWVVGQllTeHJRa0ZCYTBJc1UwRkJVeXhoUVVGaExFTkJRVU03UVVGRGRFUXNVVUZCVVN4WlFVRlpMR3RDUVVGclFpeFBRVUZQTEhsQ1FVRjVRaXhaUVVGWkxHRkJRV0VzY1VOQlFYRkRMSGxDUVVGNVFpeHRRa0ZCYlVJc1dVRkJXU3hyUWtGQmEwSXNiME5CUVc5RExHdENRVUZyUWl3eVEwRkJiVU1zUVVGQmJrTXNiVU5CUVcxRExESkNRVUZ0UWl4QlFVRnVRaXh0UWtGQmJVSXNRMEZCUXp0QlFVTXpWQ3hqUVVGakxHdENRVUZyUWl4VFFVRlRMRTlCUVU4c2VVSkJRWGxDTEZsQlFWa3NZVUZCWVN4eFEwRkJjVU1zZVVKQlFYbENMRzFDUVVGdFFpeFpRVUZaTEd0Q1FVRnJRaXdyUWtGQkswSXNhMEpCUVd0Q0xESkRRVUZ0UXl4QlFVRnVReXh0UTBGQmJVTXNNa0pCUVcxQ0xFRkJRVzVDTEcxQ1FVRnRRaXhqUVVGakxFTkJRVU03UVVGRGRsVXNVMEZCVXl4clFrRkJhMElzWVVGQllTeGxRVUZsTEZkQlFWY3NXVUZCV1N4blFrRkJaMElzZFVOQlFYVkRMR05CUVdNc1EwRkJRenRCUVVOd1NpeHBRa0ZCYVVJc1ZVRkJWU3c0UWtGQk9FSXNORUpCUVRSQ0xHMURRVUZ0UXl4MVFrRkJkVUlzV1VGQldTeHRRa0ZCYlVJc2RVTkJRWFZETEd0Q1FVRnJRaXhYUVVGWExHZENRVUZuUWl4blFrRkJaMElzWjBKQlFXZENMRU5CUVVNN1FVRkRibE1zZDBKQlFYZENMR0ZCUVdFc05rSkJRVFpDTEdWQlFXVXNWVUZCVlN4dFFrRkJiVUlzV1VGQldTeHJRMEZCYTBNc2NVTkJRWEZETEdWQlFXVXNZMEZCWXl4RFFVRkRPMEZCUXk5T0xFZEJRVWNzWlVGQlpTeHRRa0ZCYlVJc2FVTkJRV2xETEdkQ1FVRm5RaXhyUWtGQmEwSXNWMEZCVnl4clFrRkJhMElzWVVGQllTeFpRVUZaTEdsQ1FVRnBRaXgxUWtGQmRVSXNiME5CUVc5RExFTkJRVU03UVVGRE0wOHNZMEZCWXl4elFrRkJjMElzUTBGQlF6dEJRVU55UXl4blFrRkJaMElzWVVGQllTeHJRa0ZCYTBJc09FSkJRVGhDTEZkQlFWY3NRMEZCUXp0QlFVTjZSaXhYUVVGWExHRkJRV0VzT0VKQlFUaENMRU5CUVVNN1FVRkRka1FzVDBGQlR5eGhRVUZoTEhGQ1FVRnhRaXhEUVVGRE8wRkJRekZETEdGQlFXRXNPRU5CUVRoRExHdERRVUV3UWl4QlFVRXhRaXd3UWtGQk1FSXNRMEZCUXp0QlFVTjBSaXgxUWtGQmRVSXNkVU5CUVhWRExFTkJRVU03UVVGREwwUXNVMEZCVXl3MFEwRkJORU1zYzBKQlFYTkNMRU5CUVVNN1FVRkROVVVzZVV0QlFYbExMR1ZCUVdVc1EwRkJRenRCUVVONlRDeDVRMEZCZVVNc09FSkJRWE5DTEVGQlFYUkNMSE5DUVVGelFpd3JRa0ZCZFVJc1FVRkJka0lzZFVKQlFYVkNMRU5CUVVNN1FVRkRka1lzYVVKQlFXbENMSE5DUVVGelFpeERRVUZETzBGQlEzaERMR2RDUVVGblFpeHpRa0ZCYzBJc1EwRkJRenRCUVVOMlF5eFpRVUZaTEhsQ1FVRjVRaXhEUVVGRE8wRkJRM1JETEZWQlFWVXNaME5CUVdkRExEWkNRVUUyUWl3eVFrRkJNa0lzTkVKQlFUUkNMRU5CUVVNN1FVRkRMMGdzTWtKQlFXMUNMRXRCUVVzc1owSkJRV2RDTEZkQlFWY3NRMEZCUXp0QlFVTndSQ3hIUVVGSExHVkJRV1VzVlVGQlZTeERRVUZETzBOQlF6VkNPMEZCUmtRc2JVSkJRVzFDTEV0QlFVc3NaMEpCUVdkQ0xGZEJRVmNzUTBGQlF6dEJRVU53UkN4SFFVRkhMR1ZCUVdVc1ZVRkJWU3hEUVVGRE8wTkJRelZDTzBGQlEwUXNaME5CUVhkQ0xFZEJRVWNzT0VOQlFUaERMRU5CUVVNN1FVRkRNVVVzU1VGQlNTdzJRMEZCTmtNc1EwRkJRenRCUVVOc1JDeEpRVUZKTERoRFFVRTRReXhEUVVGRE8wRkJRMjVFTEVsQlFVa3NOa05CUVRaRExFTkJRVU03UVVGRGJFUXNTMEZCU3l4NVEwRkJlVU1zUTBGQlF6dERRVU01UXp0QlFVeEVMSGRDUVVGM1FpeEhRVUZITERoRFFVRTRReXhEUVVGRE8wRkJRekZGTEVsQlFVa3NOa05CUVRaRExFTkJRVU03UVVGRGJFUXNTVUZCU1N3NFEwRkJPRU1zUTBGQlF6dEJRVU51UkN4SlFVRkpMRFpEUVVFMlF5eERRVUZETzBGQlEyeEVMRXRCUVVzc2VVTkJRWGxETEVOQlFVTTdRMEZET1VNN1FVRkRSQ3huUTBGQmQwSXNSMEZCUnl3NFEwRkJPRU1zUTBGQlF6dEJRVU14UlN4TFFVRkxMSFZEUVVGMVF5eERRVUZETzBOQlF6VkRPMEZCUmtRc2QwSkJRWGRDTEVkQlFVY3NPRU5CUVRoRExFTkJRVU03UVVGRE1VVXNTMEZCU3l4MVEwRkJkVU1zUTBGQlF6dERRVU0xUXlJc0ltWnBiR1VpT2lKemRIbHNaUzVqYzNNaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmliMlI1ZTJScGMzQnNZWGs2Wm14bGVEdG9aV2xuYUhRNk1UQXdKVHQ5WEc1b2RHMXNMQ0JpYjJSNWUyMWhjbWRwYmpvd08yOTJaWEptYkc5M09taHBaR1JsYmp0d1lXUmthVzVuT2pBN2ZWeHVJMkpzWVdOcmUySmhZMnRuY205MWJtUXRZMjlzYjNJNmNtZGlZU2cwTlN3Z05EVXNJRFExTENBeEtUdHRZWGd0YUdWcFoyaDBPakV3TUNVN2JXRjRMWGRwWkhSb09qVXdKVHQzYVdSMGFEbzFNQ1U3ZlZ4dUkyeHZaMjh0ZDNKaGNIQmxjbnR3YjNOcGRHbHZianBoWW5OdmJIVjBaVHQwYjNBNk1TVTdaR2x6Y0d4aGVUcG1iR1Y0TzNkcFpIUm9PalV3SlR0OVhHNGpiRzluYnkxbVlXTmxlM0J2YzJsMGFXOXVPbUZpYzI5c2RYUmxPMnhsWm5RNk9USWxPMzFjYmlOc2IyZHZMV2x1YzNSN2NHOXphWFJwYjI0NllXSnpiMngxZEdVN2JHVm1kRG94SlR0OVhHNGpZWEowYVhOMExYUnBkR3hsZTNCdmMybDBhVzl1T21GaWMyOXNkWFJsTzNSdmNEbzVNaVU3YkdWbWREb3hKVHRtYjI1MExYTnBlbVU2TVRSd2VEdG1iMjUwTFdaaGJXbHNlVG9uVW05aWIzUnZKeXdnYzJGdWN5MXpaWEpwWmp0bWIyNTBMWGRsYVdkb2REbzRNREE3WTI5c2IzSTZjbWRpWVNneU5UVXNJREkxTlN3Z01qVTFMQ0F4S1R0OVhHNGpkR1Y0ZEMxM2NtRndjR1Z5TFdKc1lXTnJlM0J2YzJsMGFXOXVPbUZpYzI5c2RYUmxPMlJwYzNCc1lYazZabXhsZUR0dFlYZ3RhR1ZwWjJoME9qSTFKVHR3YjNOcGRHbHZianB5Wld4aGRHbDJaVHR0WVhndGQybGtkR2c2TXpZd2NIZzdkRzl3T2pNM0pUdHNaV1owT2pJMUpUdDlYRzRqZEdWNGRDMXNaV1owTFdKc1lXTnJMQ0FqZEdWNGRDMXlhV2RvZEMxaWJHRmphM3RqYjJ4dmNqcDNhR2wwWlR0bWIyNTBMV1poYldsc2VUb25VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanRtYjI1MExYTnBlbVU2TXpCd2VEdDlYRzRqZEdWNGRDMXNaV1owTFdKc1lXTnJlM1JsZUhRdFlXeHBaMjQ2Y21sbmFIUTdkMmxzYkMxamFHRnVaMlU2SUdadmJuUXRjMmw2WlR0dFlYSm5hVzR0Y21sbmFIUTZNVEJ3ZUR0d1lXUmthVzVuTFhKcFoyaDBPak13Y0hnN2IzWmxjbVpzYjNjNllYVjBienQzYVdSMGFEbzFNQ1U3WW05eVpHVnlMWEpwWjJoME9qRndlQ0J6YjJ4cFpDQjNhR2wwWlR0MGNtRnVjMmwwYVc5dUxYQnliM0JsY25SNU9tWnZiblF0YzJsNlpUdDBjbUZ1YzJsMGFXOXVMV1IxY21GMGFXOXVPakZ6TzNSeVlXNXphWFJwYjI0dGRHbHRhVzVuTFdaMWJtTjBhVzl1T21WaGMyVXRiM1YwTzMxY2JpTjBaWGgwTFhKcFoyaDBMV0pzWVdOcmUzUmxlSFF0WVd4cFoyNDZiR1ZtZER0M2FXeHNMV05vWVc1blpUb2dabTl1ZEMxemFYcGxPMjFoY21kcGJpMXNaV1owT2pFd2NIZzdiM1psY21ac2IzYzZZWFYwYnp0M2FXUjBhRG8xTUNVN2RISmhibk5wZEdsdmJpMXdjbTl3WlhKMGVUcG1iMjUwTFhOcGVtVTdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam94Y3p0MGNtRnVjMmwwYVc5dUxYUnBiV2x1WnkxbWRXNWpkR2x2YmpwbFlYTmxMV2x1TzMxY2JpTnNZWE4wYm1GdFpYdHdiM05wZEdsdmJqcGhZbk52YkhWMFpUdDBiM0E2T0RNbE8yeGxablE2TkRNbE8zZHBiR3d0WTJoaGJtZGxPaUIwY21GdWMyWnZjbTA3WTI5c2IzSTZkMmhwZEdVN1ptOXVkQzF6YVhwbE9qTTJjSGc3ZDJsa2RHZzZNVFV3Y0hnN2FHVnBaMmgwT2pRd2NIZzdabTl1ZEMxbVlXMXBiSGs2SjFKdlltOTBieWNzSUhOaGJuTXRjMlZ5YVdZN2RISmhibk5tYjNKdE9uSnZkR0YwWlNndE9UQmtaV2NwTzJadmJuUXRkMlZwWjJoME9qTXdNRHQ5WEc0amQyaHBkR1Y3WW1GamEyZHliM1Z1WkMxamIyeHZjanAzYUdsMFpUdHRZWGd0ZDJsa2RHZzZPREF3Y0hnN2QybHNiQzFqYUdGdVoyVTZJSGRwWkhSb0xDQm9aV2xuYUhRN2JXRjRMV2hsYVdkb2REcGhkWFJ2TzNkcFpIUm9PalV3SlR0aGJtbHRZWFJwYjI0dFpIVnlZWFJwYjI0Nk0zTTdZVzVwYldGMGFXOXVMVzVoYldVNmMyeHBaR1ZwYmp0OVhHNGpkR1Y0ZEMxM2NtRndjR1Z5TFhkb2FYUmxlMlJwYzNCc1lYazZabXhsZUR0d2IzTnBkR2x2YmpweVpXeGhkR2wyWlR0MGIzQTZNalVsTzJ4bFpuUTZNalVsTzJac1pYZ3RaR2x5WldOMGFXOXVPbU52YkhWdGJqdHRZWGd0ZDJsa2RHZzZNelV3Y0hnN2JXRjRMV2hsYVdkb2REbzBNREJ3ZUR0dmRtVnlabXh2ZHkxM2NtRndPbUp5WldGckxYZHZjbVE3YjNabGNtWnNiM2M2WVhWMGJ6dGliM0prWlhJdGNtbG5hSFE2TVhCNElITnZiR2xrSUdKc1lXTnJPMzFjYm1neWUyWnZiblF0YzJsNlpUbzBPSEI0TzJadmJuUXRabUZ0YVd4NU9pZFNiMkp2ZEc4bkxDQnpZVzV6TFhObGNtbG1PMlp2Ym5RdGQyVnBaMmgwT2pVd01EdDNhV3hzTFdOb1lXNW5aVG9nWTI5c2IzSTdZMjlzYjNJNmNtZGlZU2c0TlN3Z09EVXNJRGcxTENBeEtUdHRZWEpuYVc0dFltOTBkRzl0T2pCd2VEdDBjbUZ1YzJsMGFXOXVMWEJ5YjNCbGNuUjVPbU52Ykc5eU8zUnlZVzV6YVhScGIyNHRaSFZ5WVhScGIyNDZNWE03ZEhKaGJuTnBkR2x2YmkxMGFXMXBibWN0Wm5WdVkzUnBiMjQ2WldGelpTMXZkWFE3ZlZ4dUkyWnBjbk4wTFhCaGNtRm5MQ0FqYzJWamIyNWtMWEJoY21GbkxDQWpkR2hwY21RdGNHRnlZV2NzSUNObWIzSjBhQzF3WVhKaFp5d2dJMlpwWm5Sb0xYQmhjbUZuTENBamMybDRkR2d0Y0dGeVlXZDdabTl1ZEMxemFYcGxPakU0Y0hnN1ptOXVkQzFtWVcxcGJIazZKMUp2WW05MGJ5Y3NJSE5oYm5NdGMyVnlhV1k3Wm05dWRDMTNaV2xuYUhRNk16QXdPMk52Ykc5eU9uSm5ZbUVvTkRVc0lEUTFMQ0EwTlN3Z01TazdiV0Z5WjJsdUxXSnZkSFJ2YlRvd2NIZzdjR0ZrWkdsdVp5MXlhV2RvZERveE1IQjRPM2RwYkd3dFkyaGhibWRsT2lCbWIyNTBMWE5wZW1VN2RISmhibk5wZEdsdmJpMXdjbTl3WlhKMGVUcG1iMjUwTFhOcGVtVTdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam94Y3p0MGNtRnVjMmwwYVc5dUxYUnBiV2x1WnkxbWRXNWpkR2x2YmpwbFlYTmxMV2x1TzMxY2JpTnVZVzFsZTNCdmMybDBhVzl1T25KbGJHRjBhWFpsTzJKdmRIUnZiVG8xTUNVN2NtbG5hSFE2TkRjbE8yWnZiblF0YzJsNlpUb3pObkI0TzNkcGJHd3RZMmhoYm1kbE9pQjBjbUZ1YzJadmNtMDdZMjlzYjNJNmNtZGlZU2c0TlN3Z09EVXNJRGcxTENBeEtUdDBjbUZ1YzJadmNtMDZjbTkwWVhSbEtEa3daR1ZuS1R0bWIyNTBMV1poYldsc2VUb25VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanRtYjI1MExYZGxhV2RvZERvek1EQTdmVnh1STNCb2IzUnZMWEpwWjJoMGUzQnZjMmwwYVc5dU9uSmxiR0YwYVhabE8yeGxablE2TmpnbE8ySnZkSFJ2YlRvdE5UQndlRHQ5WEc0alluVjBkRzl1ZTJac2IyRjBPbkpwWjJoME8zQnZjMmwwYVc5dU9uSmxiR0YwYVhabE8zUnZjRG8xSlR0dFlYSm5hVzQ2TUhCNElETXdjSGdnT0RCd2VDQXdjSGc3ZDJsa2RHZzZNVEF3Y0hnN2FHVnBaMmgwT2pFd01IQjRPMlp2Ym5RNk1UTndlQzh4TURCd2VDQW5VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanQwWlhoMExYUnlZVzV6Wm05eWJUcDFjSEJsY21OaGMyVTdiR1YwZEdWeUxYTndZV05wYm1jNk1YQjRPMk52Ykc5eU9tSnNZV05yTzNSbGVIUXRZV3hwWjI0NlkyVnVkR1Z5TzJKaFkydG5jbTkxYm1RNmNtZGlZU2d5TlRVc0lESTFOU3dnTWpVMUxDQXdMallwTzJKdmNtUmxjaTF5WVdScGRYTTZOVEFsTzJGdWFXMWhkR2x2YmpwemFHRmtiM2N0Y0hWc2MyVWdNM01nYVc1bWFXNXBkR1U3WVc1cGJXRjBhVzl1TFdSbGJHRjVPakp6TzMxY2JpTmpiRzl6WlMxaWRYUjBiMjU3Y0c5emFYUnBiMjQ2WVdKemIyeDFkR1U3YkdWbWREbzVNQ1U3ZEc5d09qVWxPMjFoY21kcGJqb3djSGdnTXpCd2VDQTRNSEI0SURCd2VEdDNhV1IwYURveE1EQndlRHRvWldsbmFIUTZNVEF3Y0hnN1ptOXVkRG95TUhCNEx6RXdNSEI0SUNkU2IySnZkRzhuTENCellXNXpMWE5sY21sbU8zUmxlSFF0ZEhKaGJuTm1iM0p0T25Wd2NHVnlZMkZ6WlR0c1pYUjBaWEl0YzNCaFkybHVaem94Y0hnN1kyOXNiM0k2ZDJocGRHVTdkR1Y0ZEMxaGJHbG5ianBqWlc1MFpYSTdZbUZqYTJkeWIzVnVaRHB5WjJKaEtEUTFMQ0EwTlN3Z05EVXNJREVwTzJKdmNtUmxjaTF5WVdScGRYTTZOVEFsTzJGdWFXMWhkR2x2YmpwemFHRmtiM2N0ZDJocGRHVWdNM01nYVc1bWFXNXBkR1U3WVc1cGJXRjBhVzl1TFdSbGJHRjVPakp6TzNvdGFXNWtaWGc2T1RrNU9UazdmVnh1STJkaGJHeGxjbmw3Y0c5emFYUnBiMjQ2WVdKemIyeDFkR1U3WkdsemNHeGhlVHB1YjI1bE8yMWhlQzEzYVdSMGFEb3hNakFsTzNkcFpIUm9PakV3TUNVN2FHVnBaMmgwT2pFeE1DVTdiV0Y0TFdobGFXZG9kRG94TVRBbE8ySmhZMnRuY205MWJtUXRZMjlzYjNJNmNtZGlZU2d5TlN3Z01qVXNJREkxTENBd0xqa3BPM290YVc1a1pYZzZPVGs1T1RrN2ZWeHVJMmRoYkd4bGNua3RkM0poY0hCbGNudDNhV1IwYURvM01DVTdkMmxzYkMxamFHRnVaMlU2SUdKaFkydG5jbTkxYm1RdFkyOXNiM0k3ZEhKaGJuTnBkR2x2YmpwaVlXTnJaM0p2ZFc1a0xXTnZiRzl5TzNSeVlXNXphWFJwYjI0dGRHbHRhVzVuTFdaMWJtTjBhVzl1T21WaGMyVXRhVzQ3ZEhKaGJuTnBkR2x2Ymkxa2RYSmhkR2x2YmpveWN6dHRZWEpuYVc0NllYVjBienRpYjNKa1pYSXRjbUZrYVhWek9qRXljSGc3WW1GamEyZHliM1Z1WkMxamIyeHZjanB5WjJKaEtEUTFMQ0EwTlN3Z05EVXNJREF1T0NrN2NHOXphWFJwYjI0NmNtVnNZWFJwZG1VN2FHVnBaMmgwT2pjd0pUdHRZWGd0YUdWcFoyaDBPakV3TUNVN2IzWmxjbVpzYjNjNmFHbGtaR1Z1TzI5MlpYSm1iRzkzTFhnNllYVjBienQ5WEc0aloyRnNiR1Z5ZVMxb1pXRmtaWEl0ZDNKaGNIQmxjbnRrYVhOd2JHRjVPbVpzWlhnN2FuVnpkR2xtZVMxamIyNTBaVzUwT25Od1lXTmxMV0Z5YjNWdVpEdHdiM05wZEdsdmJqcG1hWGhsWkR0M2FXUjBhRG8zTUNVN1ltOXlaR1Z5TFhKaFpHbDFjem94TW5CNE8yaGxhV2RvZERwaGRYUnZPMkp2Y21SbGNpMWliM1IwYjIwNmNtZGlZU2cxTlN3Z05UVXNJRFUxTENBeEtUdGlZV05yWjNKdmRXNWtMV052Ykc5eU9uSm5ZbUVvTkRVc0lEUTFMQ0EwTlN3Z01TazdiV0Y0TFdobGFXZG9kRG95TUNVN2VpMXBibVJsZURvNU9UazVPRHQ5WEc1b00zdG1iMjUwTFhOcGVtVTZNelp3ZUR0M2FXeHNMV05vWVc1blpUb2dZMjlzYjNJN1ptOXVkQzFtWVcxcGJIazZKMUp2WW05MGJ5Y3NJSE5oYm5NdGMyVnlhV1k3Wm05dWRDMTNaV2xuYUhRNk5UQXdPMlp2Ym5RdGMzUjViR1U2YVhSaGJHbGpPMkp2ZEhSdmJUb3hNQ1U3Y0c5emFYUnBiMjQ2Y21Wc1lYUnBkbVU3WkdsemNHeGhlVHBtYkdWNE8yTnZiRzl5T25kb2FYUmxPM1J5WVc1emFYUnBiMjQ2WTI5c2IzSTdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam94Y3p0MGNtRnVjMmwwYVc5dUxYUnBiV2x1WnkxbWRXNWpkR2x2YmpwbFlYTmxMVzkxZER0OVhHNHVjMlZzWldOMExXSnNiMk5yZTJOdmJHOXlPbkpuWWlnNE5Td2dPRFVzSURnMUtUdDlYRzRqWjNKaGNHaHBZM010WW14dlkydDdaR2x6Y0d4aGVUcG1iR1Y0TzNCdmMybDBhVzl1T25KbGJHRjBhWFpsTzJwMWMzUnBabmt0WTI5dWRHVnVkRHB6Y0dGalpTMWlaWFIzWldWdU8zZHBaSFJvT2pFd01DVTdmVnh1STJGeWRDMWliRzlqYTN0a2FYTndiR0Y1T201dmJtVTdhblZ6ZEdsbWVTMWpiMjUwWlc1ME9uTndZV05sTFdKbGRIZGxaVzQ3ZlZ4dVptbG5kWEpsZTJScGMzQnNZWGs2Wm14bGVEdHRZWEpuYVc0Nk1qTWxJREFnTWpBbElERXdKVHQ5WEc0amFXMWhaMlU2YUc5MlpYSjdZbTk0TFhOb1lXUnZkem8wY0hnZ09YQjRJRGx3ZUNBeGNIZ2djbWRpWVNnd0xDQXdMQ0F3TENBd0xqWXBPM1J5WVc1elptOXliVHB6WTJGc1pTZ3hMamdzSURFdU9DazdmVnh1STJkaGJHeGxjbmt0ZDNKaGNIQmxjanBvYjNabGNudGlZV05yWjNKdmRXNWtMV052Ykc5eU9uSm5ZbUVvT1RBc0lEa3dMQ0E1TUN3Z01DNDRLVHQ5WEc1b016cG9iM1psY250aWIzSmtaWEl0WW05MGRHOXRPakZ3ZUNCemIyeHBaQ0J5WjJKaEtEZzFMQ0E0TlN3Z09EVXNJREVwTzJOdmJHOXlPbkpuWWlnNE5Td2dPRFVzSURnMUtUdDlYRzRqWm1seWMzUXRjR0Z5WVdjNmFHOTJaWElzSUNOelpXTnZibVF0Y0dGeVlXYzZhRzkyWlhJc0lDTjBhR2x5WkMxd1lYSmhaenBvYjNabGNpd2dJMlp2Y25Sb0xYQmhjbUZuT21odmRtVnlMQ0FqWm1sbWRHZ3RjR0Z5WVdjNmFHOTJaWElzSUNOemFYaDBhQzF3WVhKaFp6cG9iM1psY2l3Z0kzUmxlSFF0YkdWbWRDMWliR0ZqYXpwb2IzWmxjaXdnSTNSbGVIUXRjbWxuYUhRdFlteGhZMnM2YUc5MlpYSjdabTl1ZEMxemFYcGxPakkwY0hnN2ZWeHVJM1JsZUhRdGQzSmhjSEJsY2kxM2FHbDBaU3dnSTNSbGVIUXRkM0poY0hCbGNpMWliR0ZqYTN0aGJtbHRZWFJwYjI0dFpIVnlZWFJwYjI0Nk0zTTdZVzVwYldGMGFXOXVMVzVoYldVNmMyeHBaR1ZwYmp0OVhHNGpiR0Z6ZEc1aGJXVXNJQ051WVcxbGUzUnlZVzV6YVhScGIyNDZOSE1zSURKekxDQXljenQ5WEc0amJHRnpkRzVoYldVNmFHOTJaWEo3WTI5c2IzSTZjbWRpS0RJMUxDQXlOU3dnTWpVcE8zMWNiaU51WVcxbE9taHZkbVZ5ZTJOdmJHOXlPbkpuWWlneE56VXNJREUzTlN3Z01UYzFLVHQ5WEc0dWNtOTBZWFJsT1RCN0xYZGxZbXRwZEMxMGNtRnVjMlp2Y20wNmNtOTBZWFJsS0Rrd1pHVm5LVHN0Ylc5NkxYUnlZVzV6Wm05eWJUcHliM1JoZEdVb09UQmtaV2NwT3kxdkxYUnlZVzV6Wm05eWJUcHliM1JoZEdVb09UQmtaV2NwT3kxdGN5MTBjbUZ1YzJadmNtMDZjbTkwWVhSbEtEa3daR1ZuS1R0OVhHNUFhMlY1Wm5KaGJXVnpJSE5zYVdSbGFXNTdabkp2Ylh0dFlYSm5hVzR0YkdWbWREb3hNQ1U3ZDJsa2RHZzZNVEF3SlR0OVhHNTBiM3R0WVhKbmFXNHRiR1ZtZERvd0pUdDNhV1IwYURvMU1DVTdmVnh1ZlZ4dVFHdGxlV1p5WVcxbGN5QnphR0ZrYjNjdGNIVnNjMlY3TUNWN1ltOTRMWE5vWVdSdmR6b3dJREFnTUNBd2NIZ2djbWRpWVNneU5UVXNJREkxTlN3Z01qVTFMQ0F3TGpZcE8zMWNiakkxSlh0aWIzZ3RjMmhoWkc5M09qQWdNQ0F3SURFd2NIZ2djbWRpWVNnME1Dd2dNVFkxTENBM05Td2dNQzQxS1R0OVhHNDFNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F4TlhCNElISm5ZbUVvTkRBc0lERXlOeXdnTVRZMUxDQXdMalFwTzMxY2JqYzFKWHRpYjNndGMyaGhaRzkzT2pBZ01DQXdJREJ3ZUNCeVoySmhLREUyTlN3Z01UQTRMQ0EwTUN3Z01DNHlLVHQ5WEc0eE1EQWxlMkp2ZUMxemFHRmtiM2M2TUNBd0lEQWdNelZ3ZUNCeVoySmhLREFzSURBc0lESTFOU3dnTUNrN2ZWeHVmVnh1UUd0bGVXWnlZVzFsY3lCemFHRmtiM2N0ZDJocGRHVjdNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F3Y0hnZ2NtZGlZU2d5TlRVc0lESTFOU3dnTWpVMUxDQXdMallwTzMxY2JqRXdNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F6TlhCNElISm5ZbUVvTUN3Z01Dd2dNQ3dnTUNrN2ZWeHVmU0pkZlE9PSAqL1xcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCl7XG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQsIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBwYXJlbnQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEF0LmJlZm9yZSwgdGFyZ2V0KTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRpZihvcHRpb25zLmF0dHJzLm5vbmNlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXHRcdGlmIChub25jZSkge1xuXHRcdFx0b3B0aW9ucy5hdHRycy5ub25jZSA9IG5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbmNlKCkge1xuXHRpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCA/IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpIFxuXHRcdCA6IG9wdGlvbnMudHJhbnNmb3JtLmRlZmF1bHQob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsImltcG9ydCBjbG9zZUdhbGxlcnkgZnJvbSAnLi9zY3JpcHQvY2xvc2VHYWxsZXJ5LmpzJztcbmltcG9ydCBvcGVuR2FsbGVyeSBmcm9tICcuL3NjcmlwdC9vcGVuR2FsbGVyeS5qcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCB7IGluaXQsIGdhbGxlcnlXcmFwTGVmdCwgZ2FsbGVyeVdyYXBSaWdodCwgc2VsZWN0SXRlbSB9IGZyb20gJy4vc2NyaXB0L2ltYWdlUGlja2VyLmpzJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgY2xvc2VHYWxsZXJ5KCk7XG4gIG9wZW5HYWxsZXJ5KCk7XG4gIGluaXQoKTtcbiAgc2VsZWN0SXRlbSgpO1xuICBnYWxsZXJ5V3JhcExlZnQoKTtcbiAgZ2FsbGVyeVdyYXBSaWdodCgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvc2VHYWxsZXJ5ICgpIHtcblx0bGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0dhbGxlcnktQnV0dG9uX2Nsb3NlZCcpWzBdLFxuXHRcdFx0YmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0JvZHlEaXZpc29yQmxhY2stTWFpbkdyb3VwJylbMF0sXG5cdFx0XHRnYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnR2FsbGVyeScpWzBdO1xuXHRidXR0b24ub25jbGljayA9ICgpID0+IHtcblx0XHRnYWxsZXJ5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0YmFja2dyb3VuZC5zdHlsZS5maWx0ZXIgPSAnbm9uZSc7XG5cdH1cbn1cbiIsImNvbnN0IGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuR2FsbGVyeS1TbGlkZXJQcmV2aWV3Jyk7XG5jb25zdCBnYWxsZXJ5SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeS1pdGVtJyk7XG5jb25zdCBudW1PZkl0ZW1zID0gZ2FsbGVyeS5jaGlsZHJlbi5sZW5ndGg7XG5jb25zdCBpdGVtV2lkdGggPSAyMzsgLy8gcGVyY2VudDogYXMgc2V0IGluIGNzc1xuY29uc3QgZmVhdHVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVhdHVyZWQtaXRlbScpO1xuXG5cbmNvbnN0IHNlbGVjdEl0ZW0gPSAoZSkgPT4ge1xuXHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuXG5cdGZlYXR1cmVkLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRJbWFnZTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbGxlcnlJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChnYWxsZXJ5SXRlbXNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcblx0XHRcdGdhbGxlcnlJdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0fVxuXG5cdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xufVxuXG5jb25zdCBnYWxsZXJ5V3JhcExlZnQgPSAoKSA9PiB7XG5cdGxldCBmaXJzdCA9IGdhbGxlcnkuY2hpbGRyZW5bMF07XG5cdGdhbGxlcnkucmVtb3ZlQ2hpbGQoZmlyc3QpO1xuXHRnYWxsZXJ5LnN0eWxlLmxlZnQgPSAtaXRlbVdpZHRoICsgJyUnO1xuXHRnYWxsZXJ5LmFwcGVuZENoaWxkKGZpcnN0KTtcblx0Z2FsbGVyeS5zdHlsZS5sZWZ0ID0gJzAlJztcbn1cblxuY29uc3QgZ2FsbGVyeVdyYXBSaWdodCA9ICgpID0+IHtcblx0bGV0IGxhc3QgPSBnYWxsZXJ5LmNoaWxkcmVuW2dhbGxlcnkuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG5cdGdhbGxlcnkucmVtb3ZlQ2hpbGQobGFzdCk7XG5cdGdhbGxlcnkuaW5zZXJ0QmVmb3JlKGxhc3QsIGdhbGxlcnkuY2hpbGRyZW5bMF0pO1xuXHRnYWxsZXJ5LnN0eWxlLmxlZnQgPSAnLTIzJSc7XG59XG5cblxuLy9TdGFydCB0aGlzIGJhYnkgdXBcbmNvbnN0IGluaXQgPSAoKSA9PiB7XG5cdGxldCBpbWFnZXMgPSBbXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgxLmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgyLmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgzLmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGg0LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGg1LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGg2LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGg3LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGg4LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGg5LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgxMC5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMTEuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDEyLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgxMy5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMTQuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDE1LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgxNi5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMTcuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDE4LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgxOS5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMjAuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDIxLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgyMi5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMjMuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDI0LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgyNS5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMjYuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDI3LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgyOC5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMjkuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDMwLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgzMS5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMzIuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDMzLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGgzNC5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoMzUuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaDM2LmpwZydcblx0XTtcbiAgbGV0IGZlYXR1cmVJbWFnZXMgPSBbXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMS5qcGcnLFxuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczIuanBnJyxcblx0XHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MzLmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzNC5qcGcnLFxuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczUuanBnJyxcblx0XHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3M2LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzNy5qcGcnLFxuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczguanBnJyxcblx0XHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3M5LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMTAuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MxMS5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEyLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMTMuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MxNC5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE1LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMTYuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MxNy5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE4LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMTkuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MyMC5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczIxLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMjIuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MyMy5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI0LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMjUuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MyNi5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI3LmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMjguanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MyOS5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczMwLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMzEuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MzMi5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczMzLmpwZycsXG4gICAgJy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMzQuanBnJyxcbiAgICAnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MzNS5qcGcnLFxuICAgICcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczM2LmpwZydcblx0XTtcblx0Ly9TZXQgSW5pdGlhbCBGZWF0dXJlZCBJbWFnZVxuXHRmZWF0dXJlZC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBmZWF0dXJlSW1hZ2VzWzBdICsgJyknO1xuXG5cdC8vU2V0IEltYWdlcyBmb3IgR2FsbGVyeSBhbmQgQWRkIEV2ZW50IExpc3RlbmVyc1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbGxlcnlJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdGdhbGxlcnlJdGVtc1tpXS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBpbWFnZXNbaV0gKyAnKSc7XG5cdFx0Z2FsbGVyeUl0ZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0SXRlbSk7XG5cdH1cbn07XG5leHBvcnQgeyBpbml0LCBnYWxsZXJ5V3JhcExlZnQsIGdhbGxlcnlXcmFwUmlnaHQsIHNlbGVjdEl0ZW0gfTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9wZW5HYWxsZXJ5ICgpIHtcblx0bGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0J1dHRvbl9vcGVuZWQnKVswXSxcblx0IFx0XHRiYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnQm9keURpdmlzb3JCbGFjay1NYWluR3JvdXAnKVswXSxcblx0XHRcdGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdHYWxsZXJ5JylbMF07XG5cdGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdGdhbGxlcnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRiYWNrZ3JvdW5kLnN0eWxlLmZpbHRlciA9ICdibHVyKDVweCknO1xuXHR9XG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9