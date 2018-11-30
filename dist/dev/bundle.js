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
/******/ 	var hotCurrentHash = "885a90b4f95cb8dd9750";
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
exports.push([module.i, "body{\n\tdisplay:flex;\n}\nhtml, body {\n\tmargin:0;\n\toverflow:hidden;\n\tpadding:0;\n}\nmain {\n\tdisplay: flex;\n\tposition: absolute;\n\topacity: 0.9;\n\twidth: 100%;\n\tz-index: 99998;\n\tjustify-content: space-evenly;\n\theight: 100%;\n\tflex-flow: row wrap\n}\n.Gallery-SocialMedia_wrapper {\n\tmargin: 0 1vh;\n\tdisplay: flex;\n\tflex-flow: column;\n\talign-self: center;\n}\n.feature {\n\t display: flex;\n\t min-width: 40vmin;\n\t max-height: 70vmin;\n\t position: absolute;\n\t top: 20vh;\n\t left: 18vh;\n}\n.Gallery-SliderPreview_wrapper {\n\tposition: absolute;\n\tdisplay: flex;\n\tbackground-color: rgba(65, 65, 65, 1);\n\tmin-height: 13vmin;\n\ttop: 85vmin;\n\tborder-radius: 1vh;\n\tleft: 18vmin;\n\talign-items: center;\n\twidth: 100%;\n\t-webkit-animation-duration:3s;\n\tanimation-duration:3s;\n\t-webkit-animation-name:slide;\n\tanimation-name:slide;\n\tanimation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n.Gallery-SliderPreview  {\n\tposition: relative;\n\tdisplay: flex;\n\tbackground-color: rgba(115, 115, 115, 0.8);\n\tmax-width: 90vmin;\n\tborder-radius: 1vh;\n\tbox-sizing: border-box;\n\toverflow-x: scroll;\n\toverflow-y: hidden;\n\talign-content: center;\n\tmargin-left: 5vh;\n}\n.featured-item {\n\tmin-height: 30vmin;\n\tbackground-position: center top;\n\tmin-width: 40vmin;\n\tbackground-size: 100%;\n}\n\n.xy-center {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n.transition {\n\ttransition: all 350ms ease-in-out;\n}\n\n.r-3-2 {\n\twidth: 100%;\n\tpadding-bottom: 66.667%;\n}\n\n.image-holder {\n\tbackground-repeat: no-repeat;\n\tbackground-size: 100%;\n}\n\n.item-wrapper {\n\tcursor: pointer;\n\twidth: 100%; /* arbitrary value */\n\tdisplay: flex;\n\tmargin: 0 2vh;\n\tflex-flow: column;\n\talign-items: center;\n\ttransition: background-color 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n.item-wrapper:hover {\n\tbackground-color: rgba(250, 250, 250, 1);\n}\n.gallery-item { opacity: 0.5; }\n.gallery-item.active { opacity: 1;\nbackground-color: rgba(250, 250, 250, 1); }\n\n.AdjustPosition-Button_wrapper {\n    display: flex;\n    flex-direction: row-reverse;\n}\n.MainGroup-AboutInfo_wrapper {\n\tdisplay: flex;\n\tmax-height: 50%;\n\tmin-width: 15%;\n\tmax-width: 100%;\n\tflex-flow: row wrap;\n\tjustify-content: space-between;\n\twidth: 130vh;\n\tmargin-top: -15vh;\n}\n.BodyDivisor_black {\n\tbackground-color:rgba(45, 45, 45, 1);\n\twidth: 50%;\n\theight: 1000px;\n\tdisplay: flex;\n}\n.Nav-SocialMedia_wrapper {\n\tdisplay:flex;\n\twidth:100%;\n\theight: 3em;\n\tjustify-content: space-around;\n}\n.BodyDivisorBlack-TextItem_title {\n\tposition:absolute;\n\ttop:92%;\n\tleft:1%;\n\tfont-size:14px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:800;\n\tcolor:rgba(45, 45, 45, 1);\n\tcursor: text;\n\tbackground-color: rgba(78, 178, 78, 1);\n}\n.AboutInfo-ArticleBlackSide_wrapper {\n\tdisplay: flex;\n\tmax-height: 25vh;\n\tposition: relative;\n\tmax-width: 50vmin;\n\talign-self: center;\n}\n.ArticleBlackSide-TextItem_left, .ArticleBlackSide-TextItem_right {\n\tcolor:white;\n\tfont-family:'Roboto', sans-serif;\n\tfont-size:1.7em;\n}\n.ArticleBlackSide-TextItem_left {\n\ttext-align:right;\n\tmargin-right:10px;\n\tpadding-right:25px;\n\toverflow:auto;\n\twidth:50%;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n}\n.ArticleBlackSide-TextItem_right {\n\ttext-align:left;\n\tmargin-left:10px;\n\toverflow:auto;\n\twidth:50%;\n}\n.InitialsLogo-Name {\n\tposition: relative;\n\tfont-size: 2.5em;\n\tcolor: rgba(45, 45, 45, 1);\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tbackground-color: rgba(78, 178, 78, 1);\n\theight: 1em;\n\tmargin: 0;\n\tcursor: default;\n}\n.InitialsLogo-Surname {\n\tcolor: rgba(45, 45, 45, 1);\n\tbackground-color: rgba(78, 178, 78, 1);\n\tfont-size: 2.5em;\n\theight: 1em;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tposition: relative;\n\tmargin: 0;\n\tleft: 30%;\n\twidth: -moz-fit-content;\n\tmargin-top: 1%;\n\tcursor: default;\n}\n.BodyDivisor_white {\n\tbackground-color:white;\n\t-webkit-animation-duration:3s;\n\tanimation-duration:3s;\n\t-webkit-animation-name:slidein;\n\tanimation-name:slidein;\n\twidth: 50%;\n\tdisplay: flex;\n}\n.AboutInfo-ArticleWhiteSide_wrapper {\n\tdisplay:flex;\n\tposition:relative;\n\tflex-direction:column;\n\tmax-width:45vh;\n\tmax-height:50vh;\n\toverflow-wrap:break-word;\n\toverflow:auto;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n\tmargin-left: 10vh;\n}\nh2 {\n\tfont-size:44px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:500;\n\twill-change: color;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:2%;\n\ttransition-property:color;\n\ttransition-duration:1s;\n\ttransition-timing-function:ease-out;\n}\np {\n\tfont-size:1.5em;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:300;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:0px;\n\tpadding-right:10px;\n}\n.BodyDivisorWhite-PhotoItem_wrapper {\n\tposition: relative;\n\ttop: 85vmin;\n\tmargin-left: 70%;\n\tz-index: 99998;\n\ttransition: all 2s 200ms cubic-bezier(0.86, 0, 0.07, 1);\n}\n.BodyDivisorWhite-PhotoItem_wrapper:hover {\n\ttransform: translateY(-60px);\n}\nimg {\n\tmax-width: 100%;\n\theight: auto;\n}\n.Button_opened {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:13px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:black;\n\ttext-align:center;\n\tbackground:rgba(40, 127, 165, 0.4);\n\tborder-radius:50%;\n\tcursor: pointer;\n\ttransition: all 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335);\n}\n.Button_opened:hover {\n\tbackground-color: rgba(215, 215, 215, 1);\n\ttransform: scale(1.5, 1.5);\n\topacity: 0.5;\n}\n.Gallery-Button_closed:hover {\n\tbackground-color: rgba(15, 15, 15, 1);\n\ttransform: scale(0.5, 0.5);\n\topacity: 0.5;\n}\n.Gallery-Button_closed {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:20px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:white;\n\ttext-align:center;\n\tbackground:rgba(25, 25, 25, 1);\n\tborder-radius:50%;\n\tcursor: pointer;\n\tmargin-right: 50vmin;\n\talign-self: center;\n\ttransition: all 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335);\n}\n.Gallery {\n\tposition:absolute;\n\tdisplay:none;\n\tjustify-content: space-between;\n\twidth: 125vmax;\n\tbackground-color:rgba(25, 25, 25, 1);\n\tz-index:99999;\n}\n.InitialsLogo-Surname, .InitialsLogo-Name {\n\ttransition:4s, 2s, 2s;\n}\n.InitialsLogo-Surname:hover {\n\tcolor:rgba(45, 45, 45, 1);\n}\n.InitialsLogo-Name:hover {\n\tcolor:white;\n}\n\n@-webkit-keyframes slidein\n{\n\tfrom\n\t{margin-left:40%;\n\twidth:100%;}\n\tto\n\t{margin-left:0%;\n\twidth:50%;}\n}\n@-webkit-keyframes slide {\n\tfrom {\n\t\tmargin-left: 70%;\n\t\twidth: 50%;\n\t}\n\tto {\n\t\tmargin-left: 0%;\n\t\twidth: 100%;\n\t}\n}\n@media screen and (max-width: 768px) {\n   .lastname, .name, .photo-right,.text-wrapper-black, .text-wrapper-white {\n    display: flex;\n  }\n  body {\n    overflow-x: hidden;\n    overflow-y: auto;\n    width: 100%;\n    height: auto;\n    margin-bottom: 0;\n    padding-bottom: 0;\n  }\n  .BodyDivisor_white, .BodyDivisor_black {\n    min-height: 768px;\n    max-height: auto;\n  }\n\n  .Nav-SocialMedia_wrapper {\n    width: 20%;\n    right: 43%;\n    top: 91%;\n    height: 7%;\n    position: absolute;\n  }\n  .Button_opened {\n    top: 6%;\n    position: absolute;\n    left: 77%;\n  }\n  .AboutInfo-ArticleBlackSide_wrapper {\n    position: absolute;\n    display: flex;\n    justify-content: space-around;\n    flex-flow: row wrap;\n    max-width: 40%;\n    min-width: 20%;\n    top: 37%;\n    left: 2em;\n    min-height: 20%;\n    max-height: 30%;\n    overflow: auto;\n\n  }\n  .ArticleBlackSide-TextItem_left {\n    border-left: 1px solid rgba(78, 178, 78, 1);\n    border-right: 0;\n    display: flex;\n    text-align: left;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    width: 70%;\n    padding-left: 5%;\n    padding-bottom: 5%;\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_right {\n    display: flex;\n    width: 70%;\n    text-align: right;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    padding-top: 10%;\n    padding-right: 5%;\n    border-right: 1px solid rgba(178, 178, 78, 1);\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_left:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n  .ArticleBlackSide-TextItem_right:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n\n  .AboutInfo-ArticleWhiteSide_wrapper {\n    position: absolute;\n    border-right: 1px solid rgba(78, 178, 78, 1);\n    left: 58%;\n    top: 30%;\n    min-width: 20%;\n    max-width: 35%;\n    min-height: 20%;\n    max-height: 40%;\n    display: flex;\n  }\n  h2 {\n  \tfont-size: 46px;\n  }\n  h2:hover {\n    font-size: 46px;\n  }\n  p {\n    font-size: 24px;\n  }\n  p:hover {\n    font-size: 24px;\n  }\n  .BioSection-SectionHeader_first {\n    margin-top: 0;\n  }\n  .InitialsLogo-Surname, .InitialsLogo-Name {\n    display: flex;\n    font-size: 40px;\n    position: absolute;\n  }\n  .InitialsLogo-Name {\n    max-width: 30%;\n    min-width: 30%;\n    color: rgba(55, 55, 55, 1);\n    top: -1%;\n    right: 68%;\n    transform: rotate(0deg);\n    background-color: rgba(78, 178, 78, 1);\n    max-height: 5%;\n  }\n  .InitialsLogo-Surname {\n    max-width: 30%;\n    min-width: 30%;\n    left: 15%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n    transform: rotate(0deg);\n    top: 5%;\n  }\n  .BodyDivisorWhite-PhotoItem_wrapper {\n    position: absolute;\n    width: 200px;\n  }\n  .BodyDivisorBlack-TextItem_title {\n    position: absolute;\n    display: flex;\n    left: 7%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n  }\n  path {\n    fill: rgba(78, 178, 178, 1);\n  }\n  path:hover {\n    fill: rgba(78, 178, 78, 1);\n  }\n  .Gallery-Button_closed {\n    position: absolute;\n    left: 80%;\n    top: 7%;\n  }\n}\n/*. sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLLGFBQWEsWUFBWSxDQUFDO0FBQy9CLFdBQVcsU0FBUyxnQkFBZ0IsVUFBVSxDQUFDO0FBQy9DLE9BQU8scUNBQXFDLGdCQUFnQixjQUFjLFVBQVUsQ0FBQztBQUNyRixjQUFjLGtCQUFrQixPQUFPLGFBQWEsVUFBVSxDQUFDO0FBQy9ELFdBQVcsa0JBQWtCLFNBQVMsQ0FBQztBQUN2QyxXQUFXLGtCQUFrQixRQUFRLENBQUM7QUFDdEMsY0FBYyxrQkFBa0IsUUFBUSxRQUFRLGVBQWUsaUNBQWlDLGdCQUFnQiw2QkFBNkIsQ0FBQztBQUM5SSxvQkFBb0Isa0JBQWtCLGFBQWEsZUFBZSxrQkFBa0IsZ0JBQWdCLFFBQVEsU0FBUyxDQUFDO0FBQ3RILG9DQUFvQyxZQUFZLGlDQUFpQyxlQUFlLENBQUM7QUFDakcsaUJBQWlCLGlCQUFpQix1QkFBdUIsa0JBQWtCLG1CQUFtQixjQUFjLFVBQVUsNkJBQTZCLDhCQUE4Qix1QkFBdUIsb0NBQW9DLENBQUM7QUFDN08sa0JBQWtCLGdCQUFnQix1QkFBdUIsaUJBQWlCLGNBQWMsVUFBVSw4QkFBOEIsdUJBQXVCLG1DQUFtQyxDQUFDO0FBQzNMLFVBQVUsa0JBQWtCLFFBQVEsU0FBUyx1QkFBdUIsWUFBWSxlQUFlLFlBQVksWUFBWSxpQ0FBaUMsaUNBQXlCLEFBQXpCLHlCQUF5QixnQkFBZ0IsQ0FBQztBQUNsTSxPQUFPLHVCQUF1QixnQkFBZ0IsMkJBQTJCLGdCQUFnQixVQUFVLDhCQUFzQixBQUF0QixzQkFBc0IsK0JBQXVCLEFBQXZCLHVCQUF1QixDQUFDO0FBQ2pKLG9CQUFvQixhQUFhLGtCQUFrQixRQUFRLFNBQVMsc0JBQXNCLGdCQUFnQixpQkFBaUIseUJBQXlCLGNBQWMsNkJBQTZCLENBQUM7QUFDaE0sR0FBRyxlQUFlLGlDQUFpQyxnQkFBZ0IsbUJBQW1CLDBCQUEwQixrQkFBa0IsMEJBQTBCLHVCQUF1QixvQ0FBb0MsQ0FBQztBQUN4TixvRkFBb0YsZUFBZSxpQ0FBaUMsZ0JBQWdCLDBCQUEwQixrQkFBa0IsbUJBQW1CLHVCQUF1Qiw4QkFBOEIsdUJBQXVCLG1DQUFtQyxDQUFDO0FBQ25VLE1BQU0sa0JBQWtCLFdBQVcsVUFBVSxlQUFlLHVCQUF1QiwwQkFBMEIsZ0NBQXdCLEFBQXhCLHdCQUF3QixpQ0FBaUMsZ0JBQWdCLENBQUM7QUFDdkwsYUFBYSxrQkFBa0IsU0FBUyxhQUFhLENBQUM7QUFDdEQsUUFBUSxZQUFZLGtCQUFrQixPQUFPLHlCQUF5QixZQUFZLGFBQWEscUNBQXFDLHlCQUF5QixtQkFBbUIsWUFBWSxrQkFBa0Isb0NBQW9DLGtCQUFrQiwyQ0FBbUMsQUFBbkMsbUNBQW1DLDJCQUFtQixBQUFuQixtQkFBbUIsQ0FBQztBQUMzVCxjQUFjLGtCQUFrQixTQUFTLE9BQU8seUJBQXlCLFlBQVksYUFBYSxxQ0FBcUMseUJBQXlCLG1CQUFtQixZQUFZLGtCQUFrQiwrQkFBK0Isa0JBQWtCLDJDQUFtQyxBQUFuQyxtQ0FBbUMsMkJBQW1CLEFBQW5CLG1CQUFtQixjQUFjLENBQUM7QUFDdlUsU0FBUyxrQkFBa0IsYUFBYSxlQUFlLFdBQVcsWUFBWSxnQkFBZ0IsdUNBQXVDLGNBQWMsQ0FBQztBQUNwSixpQkFBaUIsVUFBVSw4QkFBOEIsNEJBQTRCLG1DQUFtQyx1QkFBdUIsWUFBWSxtQkFBbUIsdUNBQXVDLGtCQUFrQixXQUFXLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLENBQUM7QUFDblMsd0JBQXdCLGFBQWEsNkJBQTZCLGVBQWUsVUFBVSxtQkFBbUIsWUFBWSxrQ0FBa0MscUNBQXFDLGVBQWUsY0FBYyxDQUFDO0FBQy9OLEdBQUcsZUFBZSxtQkFBbUIsaUNBQWlDLGdCQUFnQixrQkFBa0IsV0FBVyxrQkFBa0IsYUFBYSxZQUFZLGlCQUFpQix1QkFBdUIsb0NBQW9DLENBQUM7QUFDM08sY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxnQkFBZ0IsYUFBYSxrQkFBa0IsOEJBQThCLFdBQVcsQ0FBQztBQUN6RixXQUFXLGFBQWEsOEJBQThCLENBQUM7QUFDdkQsT0FBTyxhQUFhLHFCQUFxQixDQUFDO0FBQzFDLGFBQWEsOENBQThDLGtDQUEwQixBQUExQiwwQkFBMEIsQ0FBQztBQUN0Rix1QkFBdUIsdUNBQXVDLENBQUM7QUFDL0QsU0FBUyw0Q0FBNEMsc0JBQXNCLENBQUM7QUFDNUUseUtBQXlLLGVBQWUsQ0FBQztBQUN6TCx5Q0FBeUMsOEJBQXNCLEFBQXRCLHNCQUFzQiwrQkFBdUIsQUFBdkIsdUJBQXVCLENBQUM7QUFDdkYsaUJBQWlCLHNCQUFzQixDQUFDO0FBQ3hDLGdCQUFnQixzQkFBc0IsQ0FBQztBQUN2QyxZQUFZLHlCQUF5QixDQUFDO0FBQ3RDLFVBQVUsZ0NBQWdDLDZCQUE2QiwyQkFBMkIsNEJBQTRCLENBQUM7QUFDL0gsMkJBQW1CLEtBQUssZ0JBQWdCLFdBQVcsQ0FBQztBQUNwRCxHQUFHLGVBQWUsVUFBVSxDQUFDO0NBQzVCO0FBRkQsbUJBQW1CLEtBQUssZ0JBQWdCLFdBQVcsQ0FBQztBQUNwRCxHQUFHLGVBQWUsVUFBVSxDQUFDO0NBQzVCO0FBQ0QsZ0NBQXdCLEdBQUcsOENBQThDLENBQUM7QUFDMUUsSUFBSSw2Q0FBNkMsQ0FBQztBQUNsRCxJQUFJLDhDQUE4QyxDQUFDO0FBQ25ELElBQUksNkNBQTZDLENBQUM7QUFDbEQsS0FBSyx5Q0FBeUMsQ0FBQztDQUM5QztBQUxELHdCQUF3QixHQUFHLDhDQUE4QyxDQUFDO0FBQzFFLElBQUksNkNBQTZDLENBQUM7QUFDbEQsSUFBSSw4Q0FBOEMsQ0FBQztBQUNuRCxJQUFJLDZDQUE2QyxDQUFDO0FBQ2xELEtBQUsseUNBQXlDLENBQUM7Q0FDOUM7QUFDRCxnQ0FBd0IsR0FBRyw4Q0FBOEMsQ0FBQztBQUMxRSxLQUFLLHVDQUF1QyxDQUFDO0NBQzVDO0FBRkQsd0JBQXdCLEdBQUcsOENBQThDLENBQUM7QUFDMUUsS0FBSyx1Q0FBdUMsQ0FBQztDQUM1QyIsImZpbGUiOiJzdHlsZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5e2Rpc3BsYXk6ZmxleDtoZWlnaHQ6MTAwJTt9XG5odG1sLCBib2R5e21hcmdpbjowO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7fVxuI2JsYWNre2JhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTttYXgtaGVpZ2h0OjEwMCU7bWF4LXdpZHRoOjUwJTt3aWR0aDo1MCU7fVxuI2xvZ28td3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MSU7ZGlzcGxheTpmbGV4O3dpZHRoOjUwJTt9XG4jbG9nby1mYWNle3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6OTIlO31cbiNsb2dvLWluc3R7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxJTt9XG4jYXJ0aXN0LXRpdGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo5MiU7bGVmdDoxJTtmb250LXNpemU6MTRweDtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Y29sb3I6cmdiYSgyNTUsIDI1NSwgMjU1LCAxKTt9XG4jdGV4dC13cmFwcGVyLWJsYWNre3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6ZmxleDttYXgtaGVpZ2h0OjI1JTtwb3NpdGlvbjpyZWxhdGl2ZTttYXgtd2lkdGg6MzYwcHg7dG9wOjM3JTtsZWZ0OjI1JTt9XG4jdGV4dC1sZWZ0LWJsYWNrLCAjdGV4dC1yaWdodC1ibGFja3tjb2xvcjp3aGl0ZTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXNpemU6MzBweDt9XG4jdGV4dC1sZWZ0LWJsYWNre3RleHQtYWxpZ246cmlnaHQ7d2lsbC1jaGFuZ2U6IGZvbnQtc2l6ZTttYXJnaW4tcmlnaHQ6MTBweDtwYWRkaW5nLXJpZ2h0OjMwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCB3aGl0ZTt0cmFuc2l0aW9uLXByb3BlcnR5OmZvbnQtc2l6ZTt0cmFuc2l0aW9uLWR1cmF0aW9uOjFzO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O31cbiN0ZXh0LXJpZ2h0LWJsYWNre3RleHQtYWxpZ246bGVmdDt3aWxsLWNoYW5nZTogZm9udC1zaXplO21hcmdpbi1sZWZ0OjEwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNsYXN0bmFtZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6ODMlO2xlZnQ6NDMlO3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6d2hpdGU7Zm9udC1zaXplOjM2cHg7d2lkdGg6MTUwcHg7aGVpZ2h0OjQwcHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7dHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpO2ZvbnQtd2VpZ2h0OjMwMDt9XG4jd2hpdGV7YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTttYXgtd2lkdGg6ODAwcHg7d2lsbC1jaGFuZ2U6IHdpZHRoLCBoZWlnaHQ7bWF4LWhlaWdodDphdXRvO3dpZHRoOjUwJTthbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jdGV4dC13cmFwcGVyLXdoaXRle2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MjUlO2xlZnQ6MjUlO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXgtd2lkdGg6MzUwcHg7bWF4LWhlaWdodDo0MDBweDtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmQ7b3ZlcmZsb3c6YXV0bztib3JkZXItcmlnaHQ6MXB4IHNvbGlkIGJsYWNrO31cbmgye2ZvbnQtc2l6ZTo0OHB4O2ZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjUwMDt3aWxsLWNoYW5nZTogY29sb3I7Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTttYXJnaW4tYm90dG9tOjBweDt0cmFuc2l0aW9uLXByb3BlcnR5OmNvbG9yO3RyYW5zaXRpb24tZHVyYXRpb246MXM7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7fVxuI2ZpcnN0LXBhcmFnLCAjc2Vjb25kLXBhcmFnLCAjdGhpcmQtcGFyYWcsICNmb3J0aC1wYXJhZywgI2ZpZnRoLXBhcmFnLCAjc2l4dGgtcGFyYWd7Zm9udC1zaXplOjE4cHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWFyZ2luLWJvdHRvbTowcHg7cGFkZGluZy1yaWdodDoxMHB4O3dpbGwtY2hhbmdlOiBmb250LXNpemU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNuYW1le3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbTo1MCU7cmlnaHQ6NDclO2ZvbnQtc2l6ZTozNnB4O3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDozMDA7fVxuI3Bob3RvLXJpZ2h0e3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6NjglO2JvdHRvbTotNTBweDt9XG4jYnV0dG9ue2Zsb2F0OnJpZ2h0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo1JTttYXJnaW46MHB4IDMwcHggODBweCAwcHg7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O2ZvbnQ6MTNweC8xMDBweCAnUm9ib3RvJywgc2Fucy1zZXJpZjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6MXB4O2NvbG9yOmJsYWNrO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6cmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO31cbiNjbG9zZS1idXR0b257cG9zaXRpb246YWJzb2x1dGU7bGVmdDo5MCU7dG9wOjUlO21hcmdpbjowcHggMzBweCA4MHB4IDBweDt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Zm9udDoyMHB4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzoxcHg7Y29sb3I6d2hpdGU7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZDpyZ2JhKDQ1LCA0NSwgNDUsIDEpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctd2hpdGUgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnl7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO21heC13aWR0aDoxMjAlO3dpZHRoOjEwMCU7aGVpZ2h0OjExMCU7bWF4LWhlaWdodDoxMTAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNSwgMjUsIDI1LCAwLjkpO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnktd3JhcHBlcnt3aWR0aDo3MCU7d2lsbC1jaGFuZ2U6IGJhY2tncm91bmQtY29sb3I7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2UtaW47dHJhbnNpdGlvbi1kdXJhdGlvbjoyczttYXJnaW46YXV0bztib3JkZXItcmFkaXVzOjEycHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDAuOCk7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjcwJTttYXgtaGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO292ZXJmbG93LXg6YXV0bzt9XG4jZ2FsbGVyeS1oZWFkZXItd3JhcHBlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtwb3NpdGlvbjpmaXhlZDt3aWR0aDo3MCU7Ym9yZGVyLXJhZGl1czoxMnB4O2hlaWdodDphdXRvO2JvcmRlci1ib3R0b206cmdiYSg1NSwgNTUsIDU1LCAxKTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWF4LWhlaWdodDoyMCU7ei1pbmRleDo5OTk5ODt9XG5oM3tmb250LXNpemU6MzZweDt3aWxsLWNoYW5nZTogY29sb3I7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc3R5bGU6aXRhbGljO2JvdHRvbToxMCU7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2NvbG9yOndoaXRlO3RyYW5zaXRpb246Y29sb3I7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDt9XG4uc2VsZWN0LWJsb2Nre2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZ3JhcGhpY3MtYmxvY2t7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOnJlbGF0aXZlO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3dpZHRoOjEwMCU7fVxuI2FydC1ibG9ja3tkaXNwbGF5Om5vbmU7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47fVxuZmlndXJle2Rpc3BsYXk6ZmxleDttYXJnaW46MjMlIDAgMjAlIDEwJTt9XG4jaW1hZ2U6aG92ZXJ7Ym94LXNoYWRvdzo0cHggOXB4IDlweCAxcHggcmdiYSgwLCAwLCAwLCAwLjYpO3RyYW5zZm9ybTpzY2FsZSgxLjgsIDEuOCk7fVxuI2dhbGxlcnktd3JhcHBlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoOTAsIDkwLCA5MCwgMC44KTt9XG5oMzpob3Zlcntib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDg1LCA4NSwgODUsIDEpO2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZmlyc3QtcGFyYWc6aG92ZXIsICNzZWNvbmQtcGFyYWc6aG92ZXIsICN0aGlyZC1wYXJhZzpob3ZlciwgI2ZvcnRoLXBhcmFnOmhvdmVyLCAjZmlmdGgtcGFyYWc6aG92ZXIsICNzaXh0aC1wYXJhZzpob3ZlciwgI3RleHQtbGVmdC1ibGFjazpob3ZlciwgI3RleHQtcmlnaHQtYmxhY2s6aG92ZXJ7Zm9udC1zaXplOjI0cHg7fVxuI3RleHQtd3JhcHBlci13aGl0ZSwgI3RleHQtd3JhcHBlci1ibGFja3thbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jbGFzdG5hbWUsICNuYW1le3RyYW5zaXRpb246NHMsIDJzLCAyczt9XG4jbGFzdG5hbWU6aG92ZXJ7Y29sb3I6cmdiKDI1LCAyNSwgMjUpO31cbiNuYW1lOmhvdmVye2NvbG9yOnJnYigxNzUsIDE3NSwgMTc1KTt9XG4ucm90YXRlOTB7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTstbW96LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1vLXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1tcy10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt9XG5Aa2V5ZnJhbWVzIHNsaWRlaW57ZnJvbXttYXJnaW4tbGVmdDoxMCU7d2lkdGg6MTAwJTt9XG50b3ttYXJnaW4tbGVmdDowJTt3aWR0aDo1MCU7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctcHVsc2V7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjI1JXtib3gtc2hhZG93OjAgMCAwIDEwcHggcmdiYSg0MCwgMTY1LCA3NSwgMC41KTt9XG41MCV7Ym94LXNoYWRvdzowIDAgMCAxNXB4IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO31cbjc1JXtib3gtc2hhZG93OjAgMCAwIDBweCByZ2JhKDE2NSwgMTA4LCA0MCwgMC4yKTt9XG4xMDAle2JveC1zaGFkb3c6MCAwIDAgMzVweCByZ2JhKDAsIDAsIDI1NSwgMCk7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctd2hpdGV7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjEwMCV7Ym94LXNoYWRvdzowIDAgMCAzNXB4IHJnYmEoMCwgMCwgMCwgMCk7fVxufSJdfQ== */\n", ""]);

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
/*! exports provided: init, selectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectItem", function() { return selectItem; });
var gallery = document.querySelector('.Gallery-SliderPreview');
var galleryItems = document.querySelectorAll('.gallery-item');
var numOfItems = gallery.children.length;
var itemWidth = 23; // percent: as set in css

var featured = document.querySelector('.featured-item');
var featureImages = ['../../src/img/big/graphics1.jpg', '../../src/img/big/graphics2.jpg', '../../src/img/big/graphics3.jpg', '../../src/img/big/graphics4.jpg', '../../src/img/big/graphics5.jpg', '../../src/img/big/graphics6.jpg', '../../src/img/big/graphics7.jpg', '../../src/img/big/graphics8.jpg', '../../src/img/big/graphics9.jpg', '../../src/img/big/graphics10.jpg', '../../src/img/big/graphics11.jpg', '../../src/img/big/graphics12.jpg', '../../src/img/big/graphics13.jpg', '../../src/img/big/graphics14.jpg', '../../src/img/big/graphics15.jpg', '../../src/img/big/graphics16.jpg', '../../src/img/big/graphics17.jpg', '../../src/img/big/graphics18.jpg', '../../src/img/big/graphics19.jpg', '../../src/img/big/graphics20.jpg', '../../src/img/big/graphics21.jpg', '../../src/img/big/graphics22.jpg', '../../src/img/big/graphics23.jpg', '../../src/img/big/graphics24.jpg', '../../src/img/big/graphics25.jpg', '../../src/img/big/graphics26.jpg', '../../src/img/big/graphics27.jpg', '../../src/img/big/graphics28.jpg', '../../src/img/big/graphics29.jpg', '../../src/img/big/graphics30.jpg', '../../src/img/big/graphics31.jpg', '../../src/img/big/graphics32.jpg', '../../src/img/big/graphics33.jpg', '../../src/img/big/graphics34.jpg', '../../src/img/big/graphics35.jpg', '../../src/img/big/graphics36.jpg', '../../src/img/big/graphics37.jpg', '../../src/img/big/graphics38.jpg'];
var images = ['../../src/img/small/graphics1.jpg', '../../src/img/small/graphics2.jpg', '../../src/img/small/graphics3.jpg', '../../src/img/small/graphics4.jpg', '../../src/img/small/graphics5.jpg', '../../src/img/small/graphics6.jpg', '../../src/img/small/graphics7.jpg', '../../src/img/small/graphics8.jpg', '../../src/img/small/graphics9.jpg', '../../src/img/small/graphics10.jpg', '../../src/img/small/graphics11.jpg', '../../src/img/small/graphics12.jpg', '../../src/img/small/graphics13.jpg', '../../src/img/small/graphics14.jpg', '../../src/img/small/graphics15.jpg', '../../src/img/small/graphics16.jpg', '../../src/img/small/graphics17.jpg', '../../src/img/small/graphics18.jpg', '../../src/img/small/graphics19.jpg', '../../src/img/small/graphics20.jpg', '../../src/img/small/graphics21.jpg', '../../src/img/small/graphics22.jpg', '../../src/img/small/graphics23.jpg', '../../src/img/small/graphics24.jpg', '../../src/img/small/graphics25.jpg', '../../src/img/small/graphics26.jpg', '../../src/img/small/graphics27.jpg', '../../src/img/small/graphics28.jpg', '../../src/img/small/graphics29.jpg', '../../src/img/small/graphics30.jpg', '../../src/img/small/graphics31.jpg', '../../src/img/small/graphics32.jpg', '../../src/img/small/graphics33.jpg', '../../src/img/small/graphics34.jpg', '../../src/img/small/graphics35.jpg', '../../src/img/small/graphics36.jpg', '../../src/img/small/graphics37.jpg', '../../src/img/small/graphics38.jpg'];
var imagesHandMade = ['../../src/img/small/handMade1.jpg', '../../src/img/small/handMade2.jpg', '../../src/img/small/handMade3.jpg', '../../src/img/small/handMade4.jpg', '../../src/img/small/handMade5.jpg', '../../src/img/small/handMade6.jpg', '../../src/img/small/handMade7.jpg', '../../src/img/small/handMade8.jpg', '../../src/img/small/handMade9.jpg', '../../src/img/small/handMade10.jpg', '../../src/img/small/handMade11.jpg', '../../src/img/small/handMade12.jpg', '../../src/img/small/handMade13.jpg', '../../src/img/small/handMade14.jpg', '../../src/img/small/handMade15.jpg', '../../src/img/small/handMade16.jpg', '../../src/img/small/handMade17.jpg', '../../src/img/small/handMade18.jpg', '../../src/img/small/handMade19.jpg', '../../src/img/small/handMade20.jpg'];
var featureImagesHandMade = ['../../src/img/big/handMade1.jpg', '../../src/img/big/handMade2.jpg', '../../src/img/big/handMade3.jpg', '../../src/img/big/handMade4.jpg', '../../src/img/big/handMade5.jpg', '../../src/img/big/handMade6.jpg', '../../src/img/big/handMade7.jpg', '../../src/img/big/handMade8.jpg', '../../src/img/big/handMade9.jpg', '../../src/img/big/handMade10.jpg', '../../src/img/big/handMade11.jpg', '../../src/img/big/handMade12.jpg', '../../src/img/big/handMade13.jpg', '../../src/img/big/handMade14.jpg', '../../src/img/big/handMade15.jpg', '../../src/img/big/handMade16.jpg', '../../src/img/big/handMade17.jpg', '../../src/img/big/handMade18.jpg', '../../src/img/big/handMade19.jpg', '../../src/img/big/handMade20.jpg'];

var selectItem = function selectItem(e) {
  if (e.target.classList.contains('active')) return;
  featured.style.backgroundImage = e.target.style.backgroundImage.replace("/small/", "/big/");

  for (var i = 0; i < galleryItems.length; i++) {
    if (galleryItems[i].classList.contains('active')) galleryItems[i].classList.remove('active');
  }

  e.target.classList.add('active');
}; //Start this baby up


var init = function init() {
  //Set Initial Featured Image
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvY2xvc2VHYWxsZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvaW1hZ2VQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC9vcGVuR2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvc3R5bGUuY3NzP2M3MTYiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiY2xvc2VHYWxsZXJ5Iiwib3BlbkdhbGxlcnkiLCJpbml0Iiwic2VsZWN0SXRlbSIsImJ1dHRvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImJhY2tncm91bmQiLCJnYWxsZXJ5Iiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsImZpbHRlciIsInF1ZXJ5U2VsZWN0b3IiLCJnYWxsZXJ5SXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibnVtT2ZJdGVtcyIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaXRlbVdpZHRoIiwiZmVhdHVyZWQiLCJmZWF0dXJlSW1hZ2VzIiwiaW1hZ2VzIiwiaW1hZ2VzSGFuZE1hZGUiLCJmZWF0dXJlSW1hZ2VzSGFuZE1hZGUiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJyZXBsYWNlIiwiaSIsInJlbW92ZSIsImFkZCIsImFkZEV2ZW50TGlzdGVu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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiODg1YTkwYjRmOTVjYjhkZDk3NTBcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiZGV2XCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODAvZGlzdC9kZXYvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHl7XFxuXFx0ZGlzcGxheTpmbGV4O1xcbn1cXG5odG1sLCBib2R5IHtcXG5cXHRtYXJnaW46MDtcXG5cXHRvdmVyZmxvdzpoaWRkZW47XFxuXFx0cGFkZGluZzowO1xcbn1cXG5tYWluIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRvcGFjaXR5OiAwLjk7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0ei1pbmRleDogOTk5OTg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGZsZXgtZmxvdzogcm93IHdyYXBcXG59XFxuLkdhbGxlcnktU29jaWFsTWVkaWFfd3JhcHBlciB7XFxuXFx0bWFyZ2luOiAwIDF2aDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZmxvdzogY29sdW1uO1xcblxcdGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuLmZlYXR1cmUge1xcblxcdCBkaXNwbGF5OiBmbGV4O1xcblxcdCBtaW4td2lkdGg6IDQwdm1pbjtcXG5cXHQgbWF4LWhlaWdodDogNzB2bWluO1xcblxcdCBwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0IHRvcDogMjB2aDtcXG5cXHQgbGVmdDogMTh2aDtcXG59XFxuLkdhbGxlcnktU2xpZGVyUHJldmlld193cmFwcGVyIHtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDY1LCA2NSwgNjUsIDEpO1xcblxcdG1pbi1oZWlnaHQ6IDEzdm1pbjtcXG5cXHR0b3A6IDg1dm1pbjtcXG5cXHRib3JkZXItcmFkaXVzOiAxdmg7XFxuXFx0bGVmdDogMTh2bWluO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246M3M7XFxuXFx0YW5pbWF0aW9uLWR1cmF0aW9uOjNzO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6c2xpZGU7XFxuXFx0YW5pbWF0aW9uLW5hbWU6c2xpZGU7XFxuXFx0YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNjgsIC0wLjU1LCAwLjI2NSwgMS41NSk7XFxufVxcbi5HYWxsZXJ5LVNsaWRlclByZXZpZXcgIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNSwgMTE1LCAxMTUsIDAuOCk7XFxuXFx0bWF4LXdpZHRoOiA5MHZtaW47XFxuXFx0Ym9yZGVyLXJhZGl1czogMXZoO1xcblxcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0b3ZlcmZsb3cteDogc2Nyb2xsO1xcblxcdG92ZXJmbG93LXk6IGhpZGRlbjtcXG5cXHRhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuXFx0bWFyZ2luLWxlZnQ6IDV2aDtcXG59XFxuLmZlYXR1cmVkLWl0ZW0ge1xcblxcdG1pbi1oZWlnaHQ6IDMwdm1pbjtcXG5cXHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgdG9wO1xcblxcdG1pbi13aWR0aDogNDB2bWluO1xcblxcdGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnh5LWNlbnRlciB7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogNTAlO1xcblxcdGxlZnQ6IDUwJTtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLnRyYW5zaXRpb24ge1xcblxcdHRyYW5zaXRpb246IGFsbCAzNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnItMy0yIHtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRwYWRkaW5nLWJvdHRvbTogNjYuNjY3JTtcXG59XFxuXFxuLmltYWdlLWhvbGRlciB7XFxuXFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG5cXHRiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5pdGVtLXdyYXBwZXIge1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG5cXHR3aWR0aDogMTAwJTsgLyogYXJiaXRyYXJ5IHZhbHVlICovXFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRtYXJnaW46IDAgMnZoO1xcblxcdGZsZXgtZmxvdzogY29sdW1uO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0dHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciA2MDBtcyBjdWJpYy1iZXppZXIoMC42OCwgLTAuNTUsIDAuMjY1LCAxLjU1KTtcXG59XFxuLml0ZW0td3JhcHBlcjpob3ZlciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAxKTtcXG59XFxuLmdhbGxlcnktaXRlbSB7IG9wYWNpdHk6IDAuNTsgfVxcbi5nYWxsZXJ5LWl0ZW0uYWN0aXZlIHsgb3BhY2l0eTogMTtcXG5iYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDEpOyB9XFxuXFxuLkFkanVzdFBvc2l0aW9uLUJ1dHRvbl93cmFwcGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbn1cXG4uTWFpbkdyb3VwLUFib3V0SW5mb193cmFwcGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdG1heC1oZWlnaHQ6IDUwJTtcXG5cXHRtaW4td2lkdGg6IDE1JTtcXG5cXHRtYXgtd2lkdGg6IDEwMCU7XFxuXFx0ZmxleC1mbG93OiByb3cgd3JhcDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuXFx0d2lkdGg6IDEzMHZoO1xcblxcdG1hcmdpbi10b3A6IC0xNXZoO1xcbn1cXG4uQm9keURpdmlzb3JfYmxhY2sge1xcblxcdGJhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHR3aWR0aDogNTAlO1xcblxcdGhlaWdodDogMTAwMHB4O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcbi5OYXYtU29jaWFsTWVkaWFfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0aGVpZ2h0OiAzZW07XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcbi5Cb2R5RGl2aXNvckJsYWNrLVRleHRJdGVtX3RpdGxlIHtcXG5cXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHR0b3A6OTIlO1xcblxcdGxlZnQ6MSU7XFxuXFx0Zm9udC1zaXplOjE0cHg7XFxuXFx0Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6ODAwO1xcblxcdGNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0Y3Vyc29yOiB0ZXh0O1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbn1cXG4uQWJvdXRJbmZvLUFydGljbGVCbGFja1NpZGVfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRtYXgtaGVpZ2h0OiAyNXZoO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRtYXgtd2lkdGg6IDUwdm1pbjtcXG5cXHRhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcbi5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX2xlZnQsIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0IHtcXG5cXHRjb2xvcjp3aGl0ZTtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6MS43ZW07XFxufVxcbi5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX2xlZnQge1xcblxcdHRleHQtYWxpZ246cmlnaHQ7XFxuXFx0bWFyZ2luLXJpZ2h0OjEwcHg7XFxuXFx0cGFkZGluZy1yaWdodDoyNXB4O1xcblxcdG92ZXJmbG93OmF1dG87XFxuXFx0d2lkdGg6NTAlO1xcblxcdGJvcmRlci1yaWdodDoxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxufVxcbi5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0IHtcXG5cXHR0ZXh0LWFsaWduOmxlZnQ7XFxuXFx0bWFyZ2luLWxlZnQ6MTBweDtcXG5cXHRvdmVyZmxvdzphdXRvO1xcblxcdHdpZHRoOjUwJTtcXG59XFxuLkluaXRpYWxzTG9nby1OYW1lIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0Zm9udC1zaXplOiAyLjVlbTtcXG5cXHRjb2xvcjogcmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHRmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6IDMwMDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG5cXHRoZWlnaHQ6IDFlbTtcXG5cXHRtYXJnaW46IDA7XFxuXFx0Y3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4uSW5pdGlhbHNMb2dvLVN1cm5hbWUge1xcblxcdGNvbG9yOiByZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcblxcdGZvbnQtc2l6ZTogMi41ZW07XFxuXFx0aGVpZ2h0OiAxZW07XFxuXFx0Zm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdG1hcmdpbjogMDtcXG5cXHRsZWZ0OiAzMCU7XFxuXFx0d2lkdGg6IC1tb3otZml0LWNvbnRlbnQ7XFxuXFx0bWFyZ2luLXRvcDogMSU7XFxuXFx0Y3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4uQm9keURpdmlzb3Jfd2hpdGUge1xcblxcdGJhY2tncm91bmQtY29sb3I6d2hpdGU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246M3M7XFxuXFx0YW5pbWF0aW9uLWR1cmF0aW9uOjNzO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6c2xpZGVpbjtcXG5cXHRhbmltYXRpb24tbmFtZTpzbGlkZWluO1xcblxcdHdpZHRoOiA1MCU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG59XFxuLkFib3V0SW5mby1BcnRpY2xlV2hpdGVTaWRlX3dyYXBwZXIge1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHRmbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuXFx0bWF4LXdpZHRoOjQ1dmg7XFxuXFx0bWF4LWhlaWdodDo1MHZoO1xcblxcdG92ZXJmbG93LXdyYXA6YnJlYWstd29yZDtcXG5cXHRvdmVyZmxvdzphdXRvO1xcblxcdGJvcmRlci1yaWdodDoxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuXFx0bWFyZ2luLWxlZnQ6IDEwdmg7XFxufVxcbmgyIHtcXG5cXHRmb250LXNpemU6NDRweDtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDo1MDA7XFxuXFx0d2lsbC1jaGFuZ2U6IGNvbG9yO1xcblxcdGNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0bWFyZ2luLWJvdHRvbToyJTtcXG5cXHR0cmFuc2l0aW9uLXByb3BlcnR5OmNvbG9yO1xcblxcdHRyYW5zaXRpb24tZHVyYXRpb246MXM7XFxuXFx0dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7XFxufVxcbnAge1xcblxcdGZvbnQtc2l6ZToxLjVlbTtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDozMDA7XFxuXFx0Y29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHRtYXJnaW4tYm90dG9tOjBweDtcXG5cXHRwYWRkaW5nLXJpZ2h0OjEwcHg7XFxufVxcbi5Cb2R5RGl2aXNvcldoaXRlLVBob3RvSXRlbV93cmFwcGVyIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0dG9wOiA4NXZtaW47XFxuXFx0bWFyZ2luLWxlZnQ6IDcwJTtcXG5cXHR6LWluZGV4OiA5OTk5ODtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMnMgMjAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpO1xcbn1cXG4uQm9keURpdmlzb3JXaGl0ZS1QaG90b0l0ZW1fd3JhcHBlcjpob3ZlciB7XFxuXFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MHB4KTtcXG59XFxuaW1nIHtcXG5cXHRtYXgtd2lkdGg6IDEwMCU7XFxuXFx0aGVpZ2h0OiBhdXRvO1xcbn1cXG4uQnV0dG9uX29wZW5lZCB7XFxuXFx0cG9zaXRpb246cmVsYXRpdmU7XFxuXFx0d2lkdGg6MTAwcHg7XFxuXFx0aGVpZ2h0OjEwMHB4O1xcblxcdGZvbnQ6MTNweC8xMDBweCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHR0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7XFxuXFx0bGV0dGVyLXNwYWNpbmc6MXB4O1xcblxcdGNvbG9yOmJsYWNrO1xcblxcdHRleHQtYWxpZ246Y2VudGVyO1xcblxcdGJhY2tncm91bmQ6cmdiYSg0MCwgMTI3LCAxNjUsIDAuNCk7XFxuXFx0Ym9yZGVyLXJhZGl1czo1MCU7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdHRyYW5zaXRpb246IGFsbCA2MDBtcyBjdWJpYy1iZXppZXIoMC42LCAwLjA0LCAwLjk4LCAwLjMzNSk7XFxufVxcbi5CdXR0b25fb3BlbmVkOmhvdmVyIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxNSwgMjE1LCAyMTUsIDEpO1xcblxcdHRyYW5zZm9ybTogc2NhbGUoMS41LCAxLjUpO1xcblxcdG9wYWNpdHk6IDAuNTtcXG59XFxuLkdhbGxlcnktQnV0dG9uX2Nsb3NlZDpob3ZlciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNSwgMTUsIDE1LCAxKTtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDAuNSwgMC41KTtcXG5cXHRvcGFjaXR5OiAwLjU7XFxufVxcbi5HYWxsZXJ5LUJ1dHRvbl9jbG9zZWQge1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcblxcdHdpZHRoOjEwMHB4O1xcblxcdGhlaWdodDoxMDBweDtcXG5cXHRmb250OjIwcHgvMTAwcHggJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO1xcblxcdGxldHRlci1zcGFjaW5nOjFweDtcXG5cXHRjb2xvcjp3aGl0ZTtcXG5cXHR0ZXh0LWFsaWduOmNlbnRlcjtcXG5cXHRiYWNrZ3JvdW5kOnJnYmEoMjUsIDI1LCAyNSwgMSk7XFxuXFx0Ym9yZGVyLXJhZGl1czo1MCU7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdG1hcmdpbi1yaWdodDogNTB2bWluO1xcblxcdGFsaWduLXNlbGY6IGNlbnRlcjtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgNjAwbXMgY3ViaWMtYmV6aWVyKDAuNiwgMC4wNCwgMC45OCwgMC4zMzUpO1xcbn1cXG4uR2FsbGVyeSB7XFxuXFx0cG9zaXRpb246YWJzb2x1dGU7XFxuXFx0ZGlzcGxheTpub25lO1xcblxcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG5cXHR3aWR0aDogMTI1dm1heDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjUsIDI1LCAyNSwgMSk7XFxuXFx0ei1pbmRleDo5OTk5OTtcXG59XFxuLkluaXRpYWxzTG9nby1TdXJuYW1lLCAuSW5pdGlhbHNMb2dvLU5hbWUge1xcblxcdHRyYW5zaXRpb246NHMsIDJzLCAycztcXG59XFxuLkluaXRpYWxzTG9nby1TdXJuYW1lOmhvdmVyIHtcXG5cXHRjb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcbn1cXG4uSW5pdGlhbHNMb2dvLU5hbWU6aG92ZXIge1xcblxcdGNvbG9yOndoaXRlO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2xpZGVpblxcbntcXG5cXHRmcm9tXFxuXFx0e21hcmdpbi1sZWZ0OjQwJTtcXG5cXHR3aWR0aDoxMDAlO31cXG5cXHR0b1xcblxcdHttYXJnaW4tbGVmdDowJTtcXG5cXHR3aWR0aDo1MCU7fVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2xpZGUge1xcblxcdGZyb20ge1xcblxcdFxcdG1hcmdpbi1sZWZ0OiA3MCU7XFxuXFx0XFx0d2lkdGg6IDUwJTtcXG5cXHR9XFxuXFx0dG8ge1xcblxcdFxcdG1hcmdpbi1sZWZ0OiAwJTtcXG5cXHRcXHR3aWR0aDogMTAwJTtcXG5cXHR9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XFxuICAgLmxhc3RuYW1lLCAubmFtZSwgLnBob3RvLXJpZ2h0LC50ZXh0LXdyYXBwZXItYmxhY2ssIC50ZXh0LXdyYXBwZXItd2hpdGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcbiAgYm9keSB7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgcGFkZGluZy1ib3R0b206IDA7XFxuICB9XFxuICAuQm9keURpdmlzb3Jfd2hpdGUsIC5Cb2R5RGl2aXNvcl9ibGFjayB7XFxuICAgIG1pbi1oZWlnaHQ6IDc2OHB4O1xcbiAgICBtYXgtaGVpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgLk5hdi1Tb2NpYWxNZWRpYV93cmFwcGVyIHtcXG4gICAgd2lkdGg6IDIwJTtcXG4gICAgcmlnaHQ6IDQzJTtcXG4gICAgdG9wOiA5MSU7XFxuICAgIGhlaWdodDogNyU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIH1cXG4gIC5CdXR0b25fb3BlbmVkIHtcXG4gICAgdG9wOiA2JTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA3NyU7XFxuICB9XFxuICAuQWJvdXRJbmZvLUFydGljbGVCbGFja1NpZGVfd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAgIG1heC13aWR0aDogNDAlO1xcbiAgICBtaW4td2lkdGg6IDIwJTtcXG4gICAgdG9wOiAzNyU7XFxuICAgIGxlZnQ6IDJlbTtcXG4gICAgbWluLWhlaWdodDogMjAlO1xcbiAgICBtYXgtaGVpZ2h0OiAzMCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcblxcbiAgfVxcbiAgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fbGVmdCB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICAgIGJvcmRlci1yaWdodDogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcbiAgICBjb2xvcjogcmdiYSgxNDgsIDE0OCwgMTQ4LCAxKTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgcGFkZGluZy1sZWZ0OiA1JTtcXG4gICAgcGFkZGluZy1ib3R0b206IDUlO1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAycztcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogY29sb3I7XFxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXG4gIH1cXG4gIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoMTQ4LCAxNDgsIDE0OCwgMSk7XFxuICAgIHBhZGRpbmctdG9wOiAxMCU7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDUlO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDE3OCwgMTc4LCA3OCwgMSk7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDJzO1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBjb2xvcjtcXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgfVxcbiAgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fbGVmdDpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoNzgsIDc4LCA3OCwgMSk7XFxuICB9XFxuICAuQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9yaWdodDpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoNzgsIDc4LCA3OCwgMSk7XFxuICB9XFxuXFxuICAuQWJvdXRJbmZvLUFydGljbGVXaGl0ZVNpZGVfd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICAgIGxlZnQ6IDU4JTtcXG4gICAgdG9wOiAzMCU7XFxuICAgIG1pbi13aWR0aDogMjAlO1xcbiAgICBtYXgtd2lkdGg6IDM1JTtcXG4gICAgbWluLWhlaWdodDogMjAlO1xcbiAgICBtYXgtaGVpZ2h0OiA0MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxuICBoMiB7XFxuICBcXHRmb250LXNpemU6IDQ2cHg7XFxuICB9XFxuICBoMjpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogNDZweDtcXG4gIH1cXG4gIHAge1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICB9XFxuICBwOmhvdmVyIHtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgfVxcbiAgLkJpb1NlY3Rpb24tU2VjdGlvbkhlYWRlcl9maXJzdCB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuICAuSW5pdGlhbHNMb2dvLVN1cm5hbWUsIC5Jbml0aWFsc0xvZ28tTmFtZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgfVxcbiAgLkluaXRpYWxzTG9nby1OYW1lIHtcXG4gICAgbWF4LXdpZHRoOiAzMCU7XFxuICAgIG1pbi13aWR0aDogMzAlO1xcbiAgICBjb2xvcjogcmdiYSg1NSwgNTUsIDU1LCAxKTtcXG4gICAgdG9wOiAtMSU7XFxuICAgIHJpZ2h0OiA2OCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gICAgbWF4LWhlaWdodDogNSU7XFxuICB9XFxuICAuSW5pdGlhbHNMb2dvLVN1cm5hbWUge1xcbiAgICBtYXgtd2lkdGg6IDMwJTtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICAgIGxlZnQ6IDE1JTtcXG4gICAgY29sb3I6IHJnYmEoNTUsIDU1LCA1NSwgMSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgdG9wOiA1JTtcXG4gIH1cXG4gIC5Cb2R5RGl2aXNvcldoaXRlLVBob3RvSXRlbV93cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICB9XFxuICAuQm9keURpdmlzb3JCbGFjay1UZXh0SXRlbV90aXRsZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbGVmdDogNyU7XFxuICAgIGNvbG9yOiByZ2JhKDU1LCA1NSwgNTUsIDEpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gIH1cXG4gIHBhdGgge1xcbiAgICBmaWxsOiByZ2JhKDc4LCAxNzgsIDE3OCwgMSk7XFxuICB9XFxuICBwYXRoOmhvdmVyIHtcXG4gICAgZmlsbDogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICB9XFxuICAuR2FsbGVyeS1CdXR0b25fY2xvc2VkIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHRvcDogNyU7XFxuICB9XFxufVxcbi8qLiBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOMGVXeGxMbU56Y3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeExRVUZMTEdGQlFXRXNXVUZCV1N4RFFVRkRPMEZCUXk5Q0xGZEJRVmNzVTBGQlV5eG5Ra0ZCWjBJc1ZVRkJWU3hEUVVGRE8wRkJReTlETEU5QlFVOHNjVU5CUVhGRExHZENRVUZuUWl4alFVRmpMRlZCUVZVc1EwRkJRenRCUVVOeVJpeGpRVUZqTEd0Q1FVRnJRaXhQUVVGUExHRkJRV0VzVlVGQlZTeERRVUZETzBGQlF5OUVMRmRCUVZjc2EwSkJRV3RDTEZOQlFWTXNRMEZCUXp0QlFVTjJReXhYUVVGWExHdENRVUZyUWl4UlFVRlJMRU5CUVVNN1FVRkRkRU1zWTBGQll5eHJRa0ZCYTBJc1VVRkJVU3hSUVVGUkxHVkJRV1VzYVVOQlFXbERMR2RDUVVGblFpdzJRa0ZCTmtJc1EwRkJRenRCUVVNNVNTeHZRa0ZCYjBJc2EwSkJRV3RDTEdGQlFXRXNaVUZCWlN4clFrRkJhMElzWjBKQlFXZENMRkZCUVZFc1UwRkJVeXhEUVVGRE8wRkJRM1JJTEc5RFFVRnZReXhaUVVGWkxHbERRVUZwUXl4bFFVRmxMRU5CUVVNN1FVRkRha2NzYVVKQlFXbENMR2xDUVVGcFFpeDFRa0ZCZFVJc2EwSkJRV3RDTEcxQ1FVRnRRaXhqUVVGakxGVkJRVlVzTmtKQlFUWkNMRGhDUVVFNFFpeDFRa0ZCZFVJc2IwTkJRVzlETEVOQlFVTTdRVUZETjA4c2EwSkJRV3RDTEdkQ1FVRm5RaXgxUWtGQmRVSXNhVUpCUVdsQ0xHTkJRV01zVlVGQlZTdzRRa0ZCT0VJc2RVSkJRWFZDTEcxRFFVRnRReXhEUVVGRE8wRkJRek5NTEZWQlFWVXNhMEpCUVd0Q0xGRkJRVkVzVTBGQlV5eDFRa0ZCZFVJc1dVRkJXU3hsUVVGbExGbEJRVmtzV1VGQldTeHBRMEZCYVVNc2FVTkJRWGxDTEVGQlFYcENMSGxDUVVGNVFpeG5Ra0ZCWjBJc1EwRkJRenRCUVVOc1RTeFBRVUZQTEhWQ1FVRjFRaXhuUWtGQlowSXNNa0pCUVRKQ0xHZENRVUZuUWl4VlFVRlZMRGhDUVVGelFpeEJRVUYwUWl4elFrRkJjMElzSzBKQlFYVkNMRUZCUVhaQ0xIVkNRVUYxUWl4RFFVRkRPMEZCUTJwS0xHOUNRVUZ2UWl4aFFVRmhMR3RDUVVGclFpeFJRVUZSTEZOQlFWTXNjMEpCUVhOQ0xHZENRVUZuUWl4cFFrRkJhVUlzZVVKQlFYbENMR05CUVdNc05rSkJRVFpDTEVOQlFVTTdRVUZEYUUwc1IwRkJSeXhsUVVGbExHbERRVUZwUXl4blFrRkJaMElzYlVKQlFXMUNMREJDUVVFd1FpeHJRa0ZCYTBJc01FSkJRVEJDTEhWQ1FVRjFRaXh2UTBGQmIwTXNRMEZCUXp0QlFVTjRUaXh2UmtGQmIwWXNaVUZCWlN4cFEwRkJhVU1zWjBKQlFXZENMREJDUVVFd1FpeHJRa0ZCYTBJc2JVSkJRVzFDTEhWQ1FVRjFRaXc0UWtGQk9FSXNkVUpCUVhWQ0xHMURRVUZ0UXl4RFFVRkRPMEZCUTI1VkxFMUJRVTBzYTBKQlFXdENMRmRCUVZjc1ZVRkJWU3hsUVVGbExIVkNRVUYxUWl3d1FrRkJNRUlzWjBOQlFYZENMRUZCUVhoQ0xIZENRVUYzUWl4cFEwRkJhVU1zWjBKQlFXZENMRU5CUVVNN1FVRkRka3dzWVVGQllTeHJRa0ZCYTBJc1UwRkJVeXhoUVVGaExFTkJRVU03UVVGRGRFUXNVVUZCVVN4WlFVRlpMR3RDUVVGclFpeFBRVUZQTEhsQ1FVRjVRaXhaUVVGWkxHRkJRV0VzY1VOQlFYRkRMSGxDUVVGNVFpeHRRa0ZCYlVJc1dVRkJXU3hyUWtGQmEwSXNiME5CUVc5RExHdENRVUZyUWl3eVEwRkJiVU1zUVVGQmJrTXNiVU5CUVcxRExESkNRVUZ0UWl4QlFVRnVRaXh0UWtGQmJVSXNRMEZCUXp0QlFVTXpWQ3hqUVVGakxHdENRVUZyUWl4VFFVRlRMRTlCUVU4c2VVSkJRWGxDTEZsQlFWa3NZVUZCWVN4eFEwRkJjVU1zZVVKQlFYbENMRzFDUVVGdFFpeFpRVUZaTEd0Q1FVRnJRaXdyUWtGQkswSXNhMEpCUVd0Q0xESkRRVUZ0UXl4QlFVRnVReXh0UTBGQmJVTXNNa0pCUVcxQ0xFRkJRVzVDTEcxQ1FVRnRRaXhqUVVGakxFTkJRVU03UVVGRGRsVXNVMEZCVXl4clFrRkJhMElzWVVGQllTeGxRVUZsTEZkQlFWY3NXVUZCV1N4blFrRkJaMElzZFVOQlFYVkRMR05CUVdNc1EwRkJRenRCUVVOd1NpeHBRa0ZCYVVJc1ZVRkJWU3c0UWtGQk9FSXNORUpCUVRSQ0xHMURRVUZ0UXl4MVFrRkJkVUlzV1VGQldTeHRRa0ZCYlVJc2RVTkJRWFZETEd0Q1FVRnJRaXhYUVVGWExHZENRVUZuUWl4blFrRkJaMElzWjBKQlFXZENMRU5CUVVNN1FVRkRibE1zZDBKQlFYZENMR0ZCUVdFc05rSkJRVFpDTEdWQlFXVXNWVUZCVlN4dFFrRkJiVUlzV1VGQldTeHJRMEZCYTBNc2NVTkJRWEZETEdWQlFXVXNZMEZCWXl4RFFVRkRPMEZCUXk5T0xFZEJRVWNzWlVGQlpTeHRRa0ZCYlVJc2FVTkJRV2xETEdkQ1FVRm5RaXhyUWtGQmEwSXNWMEZCVnl4clFrRkJhMElzWVVGQllTeFpRVUZaTEdsQ1FVRnBRaXgxUWtGQmRVSXNiME5CUVc5RExFTkJRVU03UVVGRE0wOHNZMEZCWXl4elFrRkJjMElzUTBGQlF6dEJRVU55UXl4blFrRkJaMElzWVVGQllTeHJRa0ZCYTBJc09FSkJRVGhDTEZkQlFWY3NRMEZCUXp0QlFVTjZSaXhYUVVGWExHRkJRV0VzT0VKQlFUaENMRU5CUVVNN1FVRkRka1FzVDBGQlR5eGhRVUZoTEhGQ1FVRnhRaXhEUVVGRE8wRkJRekZETEdGQlFXRXNPRU5CUVRoRExHdERRVUV3UWl4QlFVRXhRaXd3UWtGQk1FSXNRMEZCUXp0QlFVTjBSaXgxUWtGQmRVSXNkVU5CUVhWRExFTkJRVU03UVVGREwwUXNVMEZCVXl3MFEwRkJORU1zYzBKQlFYTkNMRU5CUVVNN1FVRkROVVVzZVV0QlFYbExMR1ZCUVdVc1EwRkJRenRCUVVONlRDeDVRMEZCZVVNc09FSkJRWE5DTEVGQlFYUkNMSE5DUVVGelFpd3JRa0ZCZFVJc1FVRkJka0lzZFVKQlFYVkNMRU5CUVVNN1FVRkRka1lzYVVKQlFXbENMSE5DUVVGelFpeERRVUZETzBGQlEzaERMR2RDUVVGblFpeHpRa0ZCYzBJc1EwRkJRenRCUVVOMlF5eFpRVUZaTEhsQ1FVRjVRaXhEUVVGRE8wRkJRM1JETEZWQlFWVXNaME5CUVdkRExEWkNRVUUyUWl3eVFrRkJNa0lzTkVKQlFUUkNMRU5CUVVNN1FVRkRMMGdzTWtKQlFXMUNMRXRCUVVzc1owSkJRV2RDTEZkQlFWY3NRMEZCUXp0QlFVTndSQ3hIUVVGSExHVkJRV1VzVlVGQlZTeERRVUZETzBOQlF6VkNPMEZCUmtRc2JVSkJRVzFDTEV0QlFVc3NaMEpCUVdkQ0xGZEJRVmNzUTBGQlF6dEJRVU53UkN4SFFVRkhMR1ZCUVdVc1ZVRkJWU3hEUVVGRE8wTkJRelZDTzBGQlEwUXNaME5CUVhkQ0xFZEJRVWNzT0VOQlFUaERMRU5CUVVNN1FVRkRNVVVzU1VGQlNTdzJRMEZCTmtNc1EwRkJRenRCUVVOc1JDeEpRVUZKTERoRFFVRTRReXhEUVVGRE8wRkJRMjVFTEVsQlFVa3NOa05CUVRaRExFTkJRVU03UVVGRGJFUXNTMEZCU3l4NVEwRkJlVU1zUTBGQlF6dERRVU01UXp0QlFVeEVMSGRDUVVGM1FpeEhRVUZITERoRFFVRTRReXhEUVVGRE8wRkJRekZGTEVsQlFVa3NOa05CUVRaRExFTkJRVU03UVVGRGJFUXNTVUZCU1N3NFEwRkJPRU1zUTBGQlF6dEJRVU51UkN4SlFVRkpMRFpEUVVFMlF5eERRVUZETzBGQlEyeEVMRXRCUVVzc2VVTkJRWGxETEVOQlFVTTdRMEZET1VNN1FVRkRSQ3huUTBGQmQwSXNSMEZCUnl3NFEwRkJPRU1zUTBGQlF6dEJRVU14UlN4TFFVRkxMSFZEUVVGMVF5eERRVUZETzBOQlF6VkRPMEZCUmtRc2QwSkJRWGRDTEVkQlFVY3NPRU5CUVRoRExFTkJRVU03UVVGRE1VVXNTMEZCU3l4MVEwRkJkVU1zUTBGQlF6dERRVU0xUXlJc0ltWnBiR1VpT2lKemRIbHNaUzVqYzNNaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmliMlI1ZTJScGMzQnNZWGs2Wm14bGVEdG9aV2xuYUhRNk1UQXdKVHQ5WEc1b2RHMXNMQ0JpYjJSNWUyMWhjbWRwYmpvd08yOTJaWEptYkc5M09taHBaR1JsYmp0d1lXUmthVzVuT2pBN2ZWeHVJMkpzWVdOcmUySmhZMnRuY205MWJtUXRZMjlzYjNJNmNtZGlZU2cwTlN3Z05EVXNJRFExTENBeEtUdHRZWGd0YUdWcFoyaDBPakV3TUNVN2JXRjRMWGRwWkhSb09qVXdKVHQzYVdSMGFEbzFNQ1U3ZlZ4dUkyeHZaMjh0ZDNKaGNIQmxjbnR3YjNOcGRHbHZianBoWW5OdmJIVjBaVHQwYjNBNk1TVTdaR2x6Y0d4aGVUcG1iR1Y0TzNkcFpIUm9PalV3SlR0OVhHNGpiRzluYnkxbVlXTmxlM0J2YzJsMGFXOXVPbUZpYzI5c2RYUmxPMnhsWm5RNk9USWxPMzFjYmlOc2IyZHZMV2x1YzNSN2NHOXphWFJwYjI0NllXSnpiMngxZEdVN2JHVm1kRG94SlR0OVhHNGpZWEowYVhOMExYUnBkR3hsZTNCdmMybDBhVzl1T21GaWMyOXNkWFJsTzNSdmNEbzVNaVU3YkdWbWREb3hKVHRtYjI1MExYTnBlbVU2TVRSd2VEdG1iMjUwTFdaaGJXbHNlVG9uVW05aWIzUnZKeXdnYzJGdWN5MXpaWEpwWmp0bWIyNTBMWGRsYVdkb2REbzRNREE3WTI5c2IzSTZjbWRpWVNneU5UVXNJREkxTlN3Z01qVTFMQ0F4S1R0OVhHNGpkR1Y0ZEMxM2NtRndjR1Z5TFdKc1lXTnJlM0J2YzJsMGFXOXVPbUZpYzI5c2RYUmxPMlJwYzNCc1lYazZabXhsZUR0dFlYZ3RhR1ZwWjJoME9qSTFKVHR3YjNOcGRHbHZianB5Wld4aGRHbDJaVHR0WVhndGQybGtkR2c2TXpZd2NIZzdkRzl3T2pNM0pUdHNaV1owT2pJMUpUdDlYRzRqZEdWNGRDMXNaV1owTFdKc1lXTnJMQ0FqZEdWNGRDMXlhV2RvZEMxaWJHRmphM3RqYjJ4dmNqcDNhR2wwWlR0bWIyNTBMV1poYldsc2VUb25VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanRtYjI1MExYTnBlbVU2TXpCd2VEdDlYRzRqZEdWNGRDMXNaV1owTFdKc1lXTnJlM1JsZUhRdFlXeHBaMjQ2Y21sbmFIUTdkMmxzYkMxamFHRnVaMlU2SUdadmJuUXRjMmw2WlR0dFlYSm5hVzR0Y21sbmFIUTZNVEJ3ZUR0d1lXUmthVzVuTFhKcFoyaDBPak13Y0hnN2IzWmxjbVpzYjNjNllYVjBienQzYVdSMGFEbzFNQ1U3WW05eVpHVnlMWEpwWjJoME9qRndlQ0J6YjJ4cFpDQjNhR2wwWlR0MGNtRnVjMmwwYVc5dUxYQnliM0JsY25SNU9tWnZiblF0YzJsNlpUdDBjbUZ1YzJsMGFXOXVMV1IxY21GMGFXOXVPakZ6TzNSeVlXNXphWFJwYjI0dGRHbHRhVzVuTFdaMWJtTjBhVzl1T21WaGMyVXRiM1YwTzMxY2JpTjBaWGgwTFhKcFoyaDBMV0pzWVdOcmUzUmxlSFF0WVd4cFoyNDZiR1ZtZER0M2FXeHNMV05vWVc1blpUb2dabTl1ZEMxemFYcGxPMjFoY21kcGJpMXNaV1owT2pFd2NIZzdiM1psY21ac2IzYzZZWFYwYnp0M2FXUjBhRG8xTUNVN2RISmhibk5wZEdsdmJpMXdjbTl3WlhKMGVUcG1iMjUwTFhOcGVtVTdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam94Y3p0MGNtRnVjMmwwYVc5dUxYUnBiV2x1WnkxbWRXNWpkR2x2YmpwbFlYTmxMV2x1TzMxY2JpTnNZWE4wYm1GdFpYdHdiM05wZEdsdmJqcGhZbk52YkhWMFpUdDBiM0E2T0RNbE8yeGxablE2TkRNbE8zZHBiR3d0WTJoaGJtZGxPaUIwY21GdWMyWnZjbTA3WTI5c2IzSTZkMmhwZEdVN1ptOXVkQzF6YVhwbE9qTTJjSGc3ZDJsa2RHZzZNVFV3Y0hnN2FHVnBaMmgwT2pRd2NIZzdabTl1ZEMxbVlXMXBiSGs2SjFKdlltOTBieWNzSUhOaGJuTXRjMlZ5YVdZN2RISmhibk5tYjNKdE9uSnZkR0YwWlNndE9UQmtaV2NwTzJadmJuUXRkMlZwWjJoME9qTXdNRHQ5WEc0amQyaHBkR1Y3WW1GamEyZHliM1Z1WkMxamIyeHZjanAzYUdsMFpUdHRZWGd0ZDJsa2RHZzZPREF3Y0hnN2QybHNiQzFqYUdGdVoyVTZJSGRwWkhSb0xDQm9aV2xuYUhRN2JXRjRMV2hsYVdkb2REcGhkWFJ2TzNkcFpIUm9PalV3SlR0aGJtbHRZWFJwYjI0dFpIVnlZWFJwYjI0Nk0zTTdZVzVwYldGMGFXOXVMVzVoYldVNmMyeHBaR1ZwYmp0OVhHNGpkR1Y0ZEMxM2NtRndjR1Z5TFhkb2FYUmxlMlJwYzNCc1lYazZabXhsZUR0d2IzTnBkR2x2YmpweVpXeGhkR2wyWlR0MGIzQTZNalVsTzJ4bFpuUTZNalVsTzJac1pYZ3RaR2x5WldOMGFXOXVPbU52YkhWdGJqdHRZWGd0ZDJsa2RHZzZNelV3Y0hnN2JXRjRMV2hsYVdkb2REbzBNREJ3ZUR0dmRtVnlabXh2ZHkxM2NtRndPbUp5WldGckxYZHZjbVE3YjNabGNtWnNiM2M2WVhWMGJ6dGliM0prWlhJdGNtbG5hSFE2TVhCNElITnZiR2xrSUdKc1lXTnJPMzFjYm1neWUyWnZiblF0YzJsNlpUbzBPSEI0TzJadmJuUXRabUZ0YVd4NU9pZFNiMkp2ZEc4bkxDQnpZVzV6TFhObGNtbG1PMlp2Ym5RdGQyVnBaMmgwT2pVd01EdDNhV3hzTFdOb1lXNW5aVG9nWTI5c2IzSTdZMjlzYjNJNmNtZGlZU2c0TlN3Z09EVXNJRGcxTENBeEtUdHRZWEpuYVc0dFltOTBkRzl0T2pCd2VEdDBjbUZ1YzJsMGFXOXVMWEJ5YjNCbGNuUjVPbU52Ykc5eU8zUnlZVzV6YVhScGIyNHRaSFZ5WVhScGIyNDZNWE03ZEhKaGJuTnBkR2x2YmkxMGFXMXBibWN0Wm5WdVkzUnBiMjQ2WldGelpTMXZkWFE3ZlZ4dUkyWnBjbk4wTFhCaGNtRm5MQ0FqYzJWamIyNWtMWEJoY21GbkxDQWpkR2hwY21RdGNHRnlZV2NzSUNObWIzSjBhQzF3WVhKaFp5d2dJMlpwWm5Sb0xYQmhjbUZuTENBamMybDRkR2d0Y0dGeVlXZDdabTl1ZEMxemFYcGxPakU0Y0hnN1ptOXVkQzFtWVcxcGJIazZKMUp2WW05MGJ5Y3NJSE5oYm5NdGMyVnlhV1k3Wm05dWRDMTNaV2xuYUhRNk16QXdPMk52Ykc5eU9uSm5ZbUVvTkRVc0lEUTFMQ0EwTlN3Z01TazdiV0Z5WjJsdUxXSnZkSFJ2YlRvd2NIZzdjR0ZrWkdsdVp5MXlhV2RvZERveE1IQjRPM2RwYkd3dFkyaGhibWRsT2lCbWIyNTBMWE5wZW1VN2RISmhibk5wZEdsdmJpMXdjbTl3WlhKMGVUcG1iMjUwTFhOcGVtVTdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam94Y3p0MGNtRnVjMmwwYVc5dUxYUnBiV2x1WnkxbWRXNWpkR2x2YmpwbFlYTmxMV2x1TzMxY2JpTnVZVzFsZTNCdmMybDBhVzl1T25KbGJHRjBhWFpsTzJKdmRIUnZiVG8xTUNVN2NtbG5hSFE2TkRjbE8yWnZiblF0YzJsNlpUb3pObkI0TzNkcGJHd3RZMmhoYm1kbE9pQjBjbUZ1YzJadmNtMDdZMjlzYjNJNmNtZGlZU2c0TlN3Z09EVXNJRGcxTENBeEtUdDBjbUZ1YzJadmNtMDZjbTkwWVhSbEtEa3daR1ZuS1R0bWIyNTBMV1poYldsc2VUb25VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanRtYjI1MExYZGxhV2RvZERvek1EQTdmVnh1STNCb2IzUnZMWEpwWjJoMGUzQnZjMmwwYVc5dU9uSmxiR0YwYVhabE8yeGxablE2TmpnbE8ySnZkSFJ2YlRvdE5UQndlRHQ5WEc0alluVjBkRzl1ZTJac2IyRjBPbkpwWjJoME8zQnZjMmwwYVc5dU9uSmxiR0YwYVhabE8zUnZjRG8xSlR0dFlYSm5hVzQ2TUhCNElETXdjSGdnT0RCd2VDQXdjSGc3ZDJsa2RHZzZNVEF3Y0hnN2FHVnBaMmgwT2pFd01IQjRPMlp2Ym5RNk1UTndlQzh4TURCd2VDQW5VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanQwWlhoMExYUnlZVzV6Wm05eWJUcDFjSEJsY21OaGMyVTdiR1YwZEdWeUxYTndZV05wYm1jNk1YQjRPMk52Ykc5eU9tSnNZV05yTzNSbGVIUXRZV3hwWjI0NlkyVnVkR1Z5TzJKaFkydG5jbTkxYm1RNmNtZGlZU2d5TlRVc0lESTFOU3dnTWpVMUxDQXdMallwTzJKdmNtUmxjaTF5WVdScGRYTTZOVEFsTzJGdWFXMWhkR2x2YmpwemFHRmtiM2N0Y0hWc2MyVWdNM01nYVc1bWFXNXBkR1U3WVc1cGJXRjBhVzl1TFdSbGJHRjVPakp6TzMxY2JpTmpiRzl6WlMxaWRYUjBiMjU3Y0c5emFYUnBiMjQ2WVdKemIyeDFkR1U3YkdWbWREbzVNQ1U3ZEc5d09qVWxPMjFoY21kcGJqb3djSGdnTXpCd2VDQTRNSEI0SURCd2VEdDNhV1IwYURveE1EQndlRHRvWldsbmFIUTZNVEF3Y0hnN1ptOXVkRG95TUhCNEx6RXdNSEI0SUNkU2IySnZkRzhuTENCellXNXpMWE5sY21sbU8zUmxlSFF0ZEhKaGJuTm1iM0p0T25Wd2NHVnlZMkZ6WlR0c1pYUjBaWEl0YzNCaFkybHVaem94Y0hnN1kyOXNiM0k2ZDJocGRHVTdkR1Y0ZEMxaGJHbG5ianBqWlc1MFpYSTdZbUZqYTJkeWIzVnVaRHB5WjJKaEtEUTFMQ0EwTlN3Z05EVXNJREVwTzJKdmNtUmxjaTF5WVdScGRYTTZOVEFsTzJGdWFXMWhkR2x2YmpwemFHRmtiM2N0ZDJocGRHVWdNM01nYVc1bWFXNXBkR1U3WVc1cGJXRjBhVzl1TFdSbGJHRjVPakp6TzNvdGFXNWtaWGc2T1RrNU9UazdmVnh1STJkaGJHeGxjbmw3Y0c5emFYUnBiMjQ2WVdKemIyeDFkR1U3WkdsemNHeGhlVHB1YjI1bE8yMWhlQzEzYVdSMGFEb3hNakFsTzNkcFpIUm9PakV3TUNVN2FHVnBaMmgwT2pFeE1DVTdiV0Y0TFdobGFXZG9kRG94TVRBbE8ySmhZMnRuY205MWJtUXRZMjlzYjNJNmNtZGlZU2d5TlN3Z01qVXNJREkxTENBd0xqa3BPM290YVc1a1pYZzZPVGs1T1RrN2ZWeHVJMmRoYkd4bGNua3RkM0poY0hCbGNudDNhV1IwYURvM01DVTdkMmxzYkMxamFHRnVaMlU2SUdKaFkydG5jbTkxYm1RdFkyOXNiM0k3ZEhKaGJuTnBkR2x2YmpwaVlXTnJaM0p2ZFc1a0xXTnZiRzl5TzNSeVlXNXphWFJwYjI0dGRHbHRhVzVuTFdaMWJtTjBhVzl1T21WaGMyVXRhVzQ3ZEhKaGJuTnBkR2x2Ymkxa2RYSmhkR2x2YmpveWN6dHRZWEpuYVc0NllYVjBienRpYjNKa1pYSXRjbUZrYVhWek9qRXljSGc3WW1GamEyZHliM1Z1WkMxamIyeHZjanB5WjJKaEtEUTFMQ0EwTlN3Z05EVXNJREF1T0NrN2NHOXphWFJwYjI0NmNtVnNZWFJwZG1VN2FHVnBaMmgwT2pjd0pUdHRZWGd0YUdWcFoyaDBPakV3TUNVN2IzWmxjbVpzYjNjNmFHbGtaR1Z1TzI5MlpYSm1iRzkzTFhnNllYVjBienQ5WEc0aloyRnNiR1Z5ZVMxb1pXRmtaWEl0ZDNKaGNIQmxjbnRrYVhOd2JHRjVPbVpzWlhnN2FuVnpkR2xtZVMxamIyNTBaVzUwT25Od1lXTmxMV0Z5YjNWdVpEdHdiM05wZEdsdmJqcG1hWGhsWkR0M2FXUjBhRG8zTUNVN1ltOXlaR1Z5TFhKaFpHbDFjem94TW5CNE8yaGxhV2RvZERwaGRYUnZPMkp2Y21SbGNpMWliM1IwYjIwNmNtZGlZU2cxTlN3Z05UVXNJRFUxTENBeEtUdGlZV05yWjNKdmRXNWtMV052Ykc5eU9uSm5ZbUVvTkRVc0lEUTFMQ0EwTlN3Z01TazdiV0Y0TFdobGFXZG9kRG95TUNVN2VpMXBibVJsZURvNU9UazVPRHQ5WEc1b00zdG1iMjUwTFhOcGVtVTZNelp3ZUR0M2FXeHNMV05vWVc1blpUb2dZMjlzYjNJN1ptOXVkQzFtWVcxcGJIazZKMUp2WW05MGJ5Y3NJSE5oYm5NdGMyVnlhV1k3Wm05dWRDMTNaV2xuYUhRNk5UQXdPMlp2Ym5RdGMzUjViR1U2YVhSaGJHbGpPMkp2ZEhSdmJUb3hNQ1U3Y0c5emFYUnBiMjQ2Y21Wc1lYUnBkbVU3WkdsemNHeGhlVHBtYkdWNE8yTnZiRzl5T25kb2FYUmxPM1J5WVc1emFYUnBiMjQ2WTI5c2IzSTdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam94Y3p0MGNtRnVjMmwwYVc5dUxYUnBiV2x1WnkxbWRXNWpkR2x2YmpwbFlYTmxMVzkxZER0OVhHNHVjMlZzWldOMExXSnNiMk5yZTJOdmJHOXlPbkpuWWlnNE5Td2dPRFVzSURnMUtUdDlYRzRqWjNKaGNHaHBZM010WW14dlkydDdaR2x6Y0d4aGVUcG1iR1Y0TzNCdmMybDBhVzl1T25KbGJHRjBhWFpsTzJwMWMzUnBabmt0WTI5dWRHVnVkRHB6Y0dGalpTMWlaWFIzWldWdU8zZHBaSFJvT2pFd01DVTdmVnh1STJGeWRDMWliRzlqYTN0a2FYTndiR0Y1T201dmJtVTdhblZ6ZEdsbWVTMWpiMjUwWlc1ME9uTndZV05sTFdKbGRIZGxaVzQ3ZlZ4dVptbG5kWEpsZTJScGMzQnNZWGs2Wm14bGVEdHRZWEpuYVc0Nk1qTWxJREFnTWpBbElERXdKVHQ5WEc0amFXMWhaMlU2YUc5MlpYSjdZbTk0TFhOb1lXUnZkem8wY0hnZ09YQjRJRGx3ZUNBeGNIZ2djbWRpWVNnd0xDQXdMQ0F3TENBd0xqWXBPM1J5WVc1elptOXliVHB6WTJGc1pTZ3hMamdzSURFdU9DazdmVnh1STJkaGJHeGxjbmt0ZDNKaGNIQmxjanBvYjNabGNudGlZV05yWjNKdmRXNWtMV052Ykc5eU9uSm5ZbUVvT1RBc0lEa3dMQ0E1TUN3Z01DNDRLVHQ5WEc1b016cG9iM1psY250aWIzSmtaWEl0WW05MGRHOXRPakZ3ZUNCemIyeHBaQ0J5WjJKaEtEZzFMQ0E0TlN3Z09EVXNJREVwTzJOdmJHOXlPbkpuWWlnNE5Td2dPRFVzSURnMUtUdDlYRzRqWm1seWMzUXRjR0Z5WVdjNmFHOTJaWElzSUNOelpXTnZibVF0Y0dGeVlXYzZhRzkyWlhJc0lDTjBhR2x5WkMxd1lYSmhaenBvYjNabGNpd2dJMlp2Y25Sb0xYQmhjbUZuT21odmRtVnlMQ0FqWm1sbWRHZ3RjR0Z5WVdjNmFHOTJaWElzSUNOemFYaDBhQzF3WVhKaFp6cG9iM1psY2l3Z0kzUmxlSFF0YkdWbWRDMWliR0ZqYXpwb2IzWmxjaXdnSTNSbGVIUXRjbWxuYUhRdFlteGhZMnM2YUc5MlpYSjdabTl1ZEMxemFYcGxPakkwY0hnN2ZWeHVJM1JsZUhRdGQzSmhjSEJsY2kxM2FHbDBaU3dnSTNSbGVIUXRkM0poY0hCbGNpMWliR0ZqYTN0aGJtbHRZWFJwYjI0dFpIVnlZWFJwYjI0Nk0zTTdZVzVwYldGMGFXOXVMVzVoYldVNmMyeHBaR1ZwYmp0OVhHNGpiR0Z6ZEc1aGJXVXNJQ051WVcxbGUzUnlZVzV6YVhScGIyNDZOSE1zSURKekxDQXljenQ5WEc0amJHRnpkRzVoYldVNmFHOTJaWEo3WTI5c2IzSTZjbWRpS0RJMUxDQXlOU3dnTWpVcE8zMWNiaU51WVcxbE9taHZkbVZ5ZTJOdmJHOXlPbkpuWWlneE56VXNJREUzTlN3Z01UYzFLVHQ5WEc0dWNtOTBZWFJsT1RCN0xYZGxZbXRwZEMxMGNtRnVjMlp2Y20wNmNtOTBZWFJsS0Rrd1pHVm5LVHN0Ylc5NkxYUnlZVzV6Wm05eWJUcHliM1JoZEdVb09UQmtaV2NwT3kxdkxYUnlZVzV6Wm05eWJUcHliM1JoZEdVb09UQmtaV2NwT3kxdGN5MTBjbUZ1YzJadmNtMDZjbTkwWVhSbEtEa3daR1ZuS1R0OVhHNUFhMlY1Wm5KaGJXVnpJSE5zYVdSbGFXNTdabkp2Ylh0dFlYSm5hVzR0YkdWbWREb3hNQ1U3ZDJsa2RHZzZNVEF3SlR0OVhHNTBiM3R0WVhKbmFXNHRiR1ZtZERvd0pUdDNhV1IwYURvMU1DVTdmVnh1ZlZ4dVFHdGxlV1p5WVcxbGN5QnphR0ZrYjNjdGNIVnNjMlY3TUNWN1ltOTRMWE5vWVdSdmR6b3dJREFnTUNBd2NIZ2djbWRpWVNneU5UVXNJREkxTlN3Z01qVTFMQ0F3TGpZcE8zMWNiakkxSlh0aWIzZ3RjMmhoWkc5M09qQWdNQ0F3SURFd2NIZ2djbWRpWVNnME1Dd2dNVFkxTENBM05Td2dNQzQxS1R0OVhHNDFNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F4TlhCNElISm5ZbUVvTkRBc0lERXlOeXdnTVRZMUxDQXdMalFwTzMxY2JqYzFKWHRpYjNndGMyaGhaRzkzT2pBZ01DQXdJREJ3ZUNCeVoySmhLREUyTlN3Z01UQTRMQ0EwTUN3Z01DNHlLVHQ5WEc0eE1EQWxlMkp2ZUMxemFHRmtiM2M2TUNBd0lEQWdNelZ3ZUNCeVoySmhLREFzSURBc0lESTFOU3dnTUNrN2ZWeHVmVnh1UUd0bGVXWnlZVzFsY3lCemFHRmtiM2N0ZDJocGRHVjdNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F3Y0hnZ2NtZGlZU2d5TlRVc0lESTFOU3dnTWpVMUxDQXdMallwTzMxY2JqRXdNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F6TlhCNElISm5ZbUVvTUN3Z01Dd2dNQ3dnTUNrN2ZWeHVmU0pkZlE9PSAqL1xcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCl7XG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQsIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBwYXJlbnQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEF0LmJlZm9yZSwgdGFyZ2V0KTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRpZihvcHRpb25zLmF0dHJzLm5vbmNlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXHRcdGlmIChub25jZSkge1xuXHRcdFx0b3B0aW9ucy5hdHRycy5ub25jZSA9IG5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbmNlKCkge1xuXHRpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCA/IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpIFxuXHRcdCA6IG9wdGlvbnMudHJhbnNmb3JtLmRlZmF1bHQob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsImltcG9ydCBjbG9zZUdhbGxlcnkgZnJvbSAnLi9zY3JpcHQvY2xvc2VHYWxsZXJ5LmpzJztcbmltcG9ydCBvcGVuR2FsbGVyeSBmcm9tICcuL3NjcmlwdC9vcGVuR2FsbGVyeS5qcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCB7IGluaXQsIHNlbGVjdEl0ZW0gfSBmcm9tICcuL3NjcmlwdC9pbWFnZVBpY2tlci5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNsb3NlR2FsbGVyeSgpO1xuICBvcGVuR2FsbGVyeSgpO1xuICBpbml0KCk7XG4gIHNlbGVjdEl0ZW0oKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb3NlR2FsbGVyeSAoKSB7XG5cdGxldCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdHYWxsZXJ5LUJ1dHRvbl9jbG9zZWQnKVswXSxcblx0XHRcdGJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdCb2R5RGl2aXNvckJsYWNrLU1haW5Hcm91cCcpWzBdLFxuXHRcdFx0Z2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0dhbGxlcnknKVswXTtcblx0YnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG5cdFx0Z2FsbGVyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGJhY2tncm91bmQuc3R5bGUuZmlsdGVyID0gJ25vbmUnO1xuXHR9XG59XG4iLCJjb25zdCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkdhbGxlcnktU2xpZGVyUHJldmlldycpO1xuY29uc3QgZ2FsbGVyeUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnktaXRlbScpO1xuY29uc3QgbnVtT2ZJdGVtcyA9IGdhbGxlcnkuY2hpbGRyZW4ubGVuZ3RoO1xuY29uc3QgaXRlbVdpZHRoID0gMjM7IC8vIHBlcmNlbnQ6IGFzIHNldCBpbiBjc3NcbmNvbnN0IGZlYXR1cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlYXR1cmVkLWl0ZW0nKTtcbmNvbnN0IGZlYXR1cmVJbWFnZXMgPSBbXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMi5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczQuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzNS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3M2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczcuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzOC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3M5LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEwLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczExLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEyLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE0LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE1LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE3LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE4LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczE5LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczIwLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczIxLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczIyLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczIzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI0LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI1LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI3LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI4LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczI5LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczMwLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczMxLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczMyLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczMzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczM0LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczM1LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczM2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczM3LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczM4LmpwZydcbl07XG5jb25zdCBpbWFnZXMgPSBbXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczIuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzNC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczUuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3M2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzNy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczguanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3M5LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMTAuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MxMS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczEyLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMTMuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MxNC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczE1LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMTYuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MxNy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczE4LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMTkuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MyMC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczIxLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMjIuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MyMy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczI0LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMjUuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MyNi5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczI3LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMjguanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MyOS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczMwLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMzEuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MzMi5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczMzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMzQuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MzNS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9ncmFwaGljczM2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2dyYXBoaWNzMzcuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvZ3JhcGhpY3MzOC5qcGcnXG5dO1xuY29uc3QgaW1hZ2VzSGFuZE1hZGUgPSBbXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlMS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9oYW5kTWFkZTIuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGUzLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlNC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9oYW5kTWFkZTUuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGU2LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlNy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9oYW5kTWFkZTguanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGU5LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlMTAuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGUxMS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9oYW5kTWFkZTEyLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlMTMuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGUxNC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9oYW5kTWFkZTE1LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlMTYuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGUxNy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9zbWFsbC9oYW5kTWFkZTE4LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL3NtYWxsL2hhbmRNYWRlMTkuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvc21hbGwvaGFuZE1hZGUyMC5qcGcnXG5dO1xuY29uc3QgZmVhdHVyZUltYWdlc0hhbmRNYWRlID0gW1xuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxLmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9oYW5kTWFkZTIuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvYmlnL2hhbmRNYWRlMy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGU0LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9oYW5kTWFkZTUuanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvYmlnL2hhbmRNYWRlNi5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGU3LmpwZycsXG5cdCcuLi8uLi9zcmMvaW1nL2JpZy9oYW5kTWFkZTguanBnJyxcblx0Jy4uLy4uL3NyYy9pbWcvYmlnL2hhbmRNYWRlOS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxMC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxMS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxMi5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxMy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxNC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxNS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxNi5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxNy5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxOC5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUxOS5qcGcnLFxuXHQnLi4vLi4vc3JjL2ltZy9iaWcvaGFuZE1hZGUyMC5qcGcnXG5dO1xuXG5jb25zdCBzZWxlY3RJdGVtID0gKGUpID0+IHtcblx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcblxuXHRmZWF0dXJlZC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UucmVwbGFjZShcIi9zbWFsbC9cIiwgXCIvYmlnL1wiKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbGxlcnlJdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChnYWxsZXJ5SXRlbXNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcblx0XHRcdGdhbGxlcnlJdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0fVxuXHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbn1cblxuLy9TdGFydCB0aGlzIGJhYnkgdXBcbmNvbnN0IGluaXQgPSAoKSA9PiB7XG5cdC8vU2V0IEluaXRpYWwgRmVhdHVyZWQgSW1hZ2Vcblx0ZmVhdHVyZWQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgZmVhdHVyZUltYWdlc1swXSArICcpJztcblx0Ly9TZXQgSW1hZ2VzIGZvciBHYWxsZXJ5IGFuZCBBZGQgRXZlbnQgTGlzdGVuZXJzXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FsbGVyeUl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0Z2FsbGVyeUl0ZW1zW2ldLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGltYWdlc1tpXSArICcpJztcblx0XHRnYWxsZXJ5SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RJdGVtKTtcblx0fVxufTtcbmV4cG9ydCB7IGluaXQsIHNlbGVjdEl0ZW0gfTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9wZW5HYWxsZXJ5ICgpIHtcblx0bGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0J1dHRvbl9vcGVuZWQnKVswXSxcblx0IFx0XHRiYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnQm9keURpdmlzb3JCbGFjay1NYWluR3JvdXAnKVswXSxcblx0XHRcdGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdHYWxsZXJ5JylbMF07XG5cdGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdGdhbGxlcnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRiYWNrZ3JvdW5kLnN0eWxlLmZpbHRlciA9ICdibHVyKDVweCknO1xuXHR9XG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9