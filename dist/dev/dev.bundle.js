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
/******/ 	var hotCurrentHash = "347acec3b28318b7bb8d";
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
/******/ 	__webpack_require__.p = "";
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
exports.push([module.i, "\nbody{\n\tdisplay:flex;\n}\nhtml, body {\n\tmargin:0;\n\toverflow:hidden;\n\tpadding:0;\n}\nmain {\n\tdisplay: flex;\n\tposition: absolute;\n\topacity: 0.9;\n\twidth: 100%;\n\tz-index: 99998;\n\tjustify-content: space-evenly;\n\theight: 100%;\n\tflex-flow: row wrap;\n}\n.AdjustPosition-Button_wrapper {\n    display: flex;\n    flex-direction: row-reverse;\n}\n.MainGroup-AboutInfo_wrapper {\n\tdisplay: flex;\n\tmax-height: 50%;\n\tmin-width: 15%;\n\tmax-width: 100%;\n\tflex-flow: row wrap;\n\tjustify-content: space-between;\n\twidth: 130vh;\n\tmargin-top: -15vh;\n}\n.BodyDivisor_black {\n\tbackground-color:rgba(45, 45, 45, 1);\n\twidth: 50%;\n\theight: 1000px;\n\tdisplay: flex;\n}\n.Nav-SocialMedia_wrapper {\n\tdisplay:flex;\n\twidth:100%;\n\theight: 3em;\n\tjustify-content: space-around;\n}\n.BodyDivisorBlack-TextItem_title {\n\tposition:absolute;\n\ttop:92%;\n\tleft:1%;\n\tfont-size:14px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:800;\n\tcolor:rgba(255, 255, 255, 1);\n\tcursor: text;\n}\n.AboutInfo-ArticleBlackSide_wrapper {\n\tdisplay: flex;\n\tmax-height: 25vh;\n\tposition: relative;\n\tmax-width: 360px;\n\talign-self: center;\n}\n.ArticleBlackSide-TextItem_left, .ArticleBlackSide-TextItem_right {\n\tcolor:white;\n\tfont-family:'Roboto', sans-serif;\n\tfont-size:1.7em;\n}\n.ArticleBlackSide-TextItem_left {\n\ttext-align:right;\n\tmargin-right:10px;\n\tpadding-right:25px;\n\toverflow:auto;\n\twidth:50%;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n}\n.ArticleBlackSide-TextItem_right {\n\ttext-align:left;\n\tmargin-left:10px;\n\toverflow:auto;\n\twidth:50%;\n}\n.InitialsLogo-Name {\n\tposition: relative;\n\tfont-size: 2.5em;\n\tcolor: rgba(45, 45, 45, 1);\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tbackground-color: rgba(78, 178, 78, 1);\n\theight: 1em;\n\tmargin: 0;\n\tcursor: default;\n}\n.InitialsLogo-Surname {\n\tcolor: white;\n\tbackground-color: rgba(78, 178, 78, 1);\n\tfont-size: 2.5em;\n\theight: 1em;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tposition: relative;\n\tmargin: 0;\n\tleft: 30%;\n\twidth: -moz-fit-content;\n\tmargin-top: 1%;\n\tcursor: default;\n}\n.BodyDivisor_white {\n\tbackground-color:white;\n\t-webkit-animation-duration:3s;\n\tanimation-duration:3s;\n\t-webkit-animation-name:slidein;\n\tanimation-name:slidein;\n\twidth: 50%;\n\tdisplay: flex;\n}\n.AboutInfo-ArticleWhiteSide_wrapper {\n\tdisplay:flex;\n\tposition:relative;\n\tflex-direction:column;\n\tmax-width:45vh;\n\tmax-height:50vh;\n\toverflow-wrap:break-word;\n\toverflow:auto;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n\tmargin-left: 10vh;\n}\nh2 {\n\tfont-size:44px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:500;\n\twill-change: color;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:2%;\n\ttransition-property:color;\n\ttransition-duration:1s;\n\ttransition-timing-function:ease-out;\n}\np {\n\tfont-size:1.5em;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:300;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:0px;\n\tpadding-right:10px;\n}\n.BodyDivisorWhite-PhotoItem_wrapper {\n\tposition: absolute;\n\ttop: 85%;\n\tleft: 85%;\n\tz-index: 99998;\n\ttransition: all 2s 200ms cubic-bezier(0.86, 0, 0.07, 1);\n}\n.BodyDivisorWhite-PhotoItem_wrapper:hover {\n\ttransform: translateY(-60px);\n}\nimg {\n\tmax-width: 100%;\n\theight: auto;\n}\n.Button_opened {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:13px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:black;\n\ttext-align:center;\n\tbackground:rgba(255, 255, 255, 0.6);\n\tborder-radius:50%;\n\t-webkit-animation:shadow-pulse 3s infinite;\n\tanimation:shadow-pulse 3s infinite;\n\t-webkit-animation-delay:2s;\n\tanimation-delay:2s;\n\ttransition: all 5s cubic-bezier(0.785, 0.135, 0.15, 0.86);\n\tcursor: pointer;\n}\n.Button_opened:hover {\n\tcolor: rgba(165, 108, 40, 0.8);\n\tbackground-color: rgba(40, 127, 165, 0.4);\n}\n.Gallery-Button_closed {\n\tposition:absolute;\n\tleft:90%;\n\ttop:5%;\n\tmargin:0px 30px 80px 0px;\n\twidth:100px;\n\theight:100px;\n\tfont:20px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:white;\n\ttext-align:center;\n\tbackground:rgba(45, 45, 45, 1);\n\tborder-radius:50%;\n\t-webkit-animation:shadow-white 3s infinite;\n\tanimation:shadow-white 3s infinite;\n\t-webkit-animation-delay:2s;\n\tanimation-delay:2s;\n\tz-index:99999;\n\tcursor: pointer;\n}\n.Gallery {\n\tposition:absolute;\n\tdisplay:none;\n\tmax-width:120%;\n\twidth:100%;\n\theight:110%;\n\tmax-height:110%;\n\tbackground-color:rgba(25, 25, 25, 0.9);\n\tz-index:99999;\n}\n.Gallery-GalleryWrapper {\n\twidth:70%;\n\twill-change: background-color;\n\ttransition:background-color;\n\ttransition-timing-function:ease-in;\n\ttransition-duration:2s;\n\tmargin:auto;\n\tborder-radius:12px;\n\tbackground-color:rgba(45, 45, 45, 0.8);\n\tposition:relative;\n\theight:70%;\n\tmax-height:100%;\n\toverflow:hidden;\n\toverflow-x:auto;\n}\n.GalleryWrapper-Nav {\n\tdisplay:flex;\n\tjustify-content:space-around;\n\tposition:fixed;\n\twidth:70%;\n\tborder-radius:12px;\n\theight:auto;\n\tborder-bottom:rgba(55, 55, 55, 1);\n\tbackground-color:rgba(45, 45, 45, 1);\n\tmax-height:20%;\n\tz-index:99998;\n}\nh3 {\n\tfont-size:36px;\n\twill-change: color;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:500;\n\tbottom:10%;\n\tposition:relative;\n\tdisplay:flex;\n\tcolor:white;\n\ttransition:color;\n\ttransition-duration:1s;\n\ttransition-timing-function:ease-out;\n\tcursor: pointer;\n}\n.select-block {\n\tcolor:rgb(85, 85, 85);\n}\n.GalleryWrapper-ItemGraphics {\n\tdisplay:flex;\n\ttop: -10%;\n\tposition:relative;\n\tjustify-content:space-around;\n\twidth:100%;\n}\n.GalleryWrapper-ItemArt {\n\tdisplay:none;\n\tjustify-content:space-between;\n}\n.GalleryWrapper-ItemImage_graphics:hover, .GalleryWrapper-ItemImage_handMade:hover {\n\tbox-shadow:4px 9px 9px 1px rgba(0, 0, 0, 0.6);\n\t-webkit-transform:scale(1.8, 1.8);\n\ttransform:scale(1.8, 1.8);\n}\n.Gallery-GalleryWrapper:hover {\n\tbackground-color:rgba(90, 90, 90, 0.8);\n}\nh3:hover {\n\tborder-bottom:1px solid rgba(85, 85, 85, 1);\n\tcolor:rgb(85, 85, 85);\n}\n.InitialsLogo-Surname, .InitialsLogo-Name {\n\ttransition:4s, 2s, 2s;\n}\n.InitialsLogo-Surname:hover {\n\tcolor:rgba(45, 45, 45, 1);\n}\n.InitialsLogo-Name:hover {\n\tcolor:white;\n}\n@-webkit-keyframes slidein\n{\n\tfrom\n\t{margin-left:40%;\n\twidth:100%;}\n\tto\n\t{margin-left:0%;\n\twidth:50%;}\n}\n@-webkit-keyframes shadow-pulse{0%{box-shadow:0 0 0 0px rgba(255, 255, 255, 0.6);}\n25%{box-shadow:0 0 0 10px rgba(40, 165, 75, 0.5);}\n50%{box-shadow:0 0 0 15px rgba(40, 127, 165, 0.4);}\n75%{box-shadow:0 0 0 0px rgba(165, 108, 40, 0.2);}\n100%{box-shadow:0 0 0 35px rgba(0, 0, 255, 0);}\n}\n@-webkit-keyframes shadow-white{0%{box-shadow:0 0 0 0px rgba(255, 255, 255, 0.6);}\n100%{box-shadow:0 0 0 35px rgba(0, 0, 0, 0);}\n}\n@media screen and (max-width: 768px) {\n   .lastname, .name, .photo-right,.text-wrapper-black, .text-wrapper-white {\n    display: flex;\n  }\n  body {\n    overflow-x: hidden;\n    overflow-y: auto;\n    width: 100%;\n    height: auto;\n    margin-bottom: 0;\n    padding-bottom: 0;\n  }\n  .BodyDivisor_white, .BodyDivisor_black {\n    min-height: 768px;\n    max-height: auto;\n  }\n\n  .Nav-SocialMedia_wrapper {\n    width: 20%;\n    right: 43%;\n    top: 91%;\n    height: 7%;\n    position: absolute;\n  }\n  .Button_opened {\n    top: 6%;\n    position: absolute;\n    left: 77%;\n  }\n  .AboutInfo-ArticleBlackSide_wrapper {\n    position: absolute;\n    display: flex;\n    justify-content: space-around;\n    flex-flow: row wrap;\n    max-width: 40%;\n    min-width: 20%;\n    top: 37%;\n    left: 2em;\n    min-height: 20%;\n    max-height: 30%;\n    overflow: auto;\n\n  }\n  .ArticleBlackSide-TextItem_left {\n    border-left: 1px solid rgba(78, 178, 78, 1);\n    border-right: 0;\n    display: flex;\n    text-align: left;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    width: 70%;\n    padding-left: 5%;\n    padding-bottom: 5%;\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_right {\n    display: flex;\n    width: 70%;\n    text-align: right;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    padding-top: 10%;\n    padding-right: 5%;\n    border-right: 1px solid rgba(178, 178, 78, 1);\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_left:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n  .ArticleBlackSide-TextItem_right:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n\n  .AboutInfo-ArticleWhiteSide_wrapper {\n    position: absolute;\n    border-right: 1px solid rgba(78, 178, 78, 1);\n    left: 58%;\n    top: 30%;\n    min-width: 20%;\n    max-width: 35%;\n    min-height: 20%;\n    max-height: 40%;\n    display: flex;\n  }\n  h2 {\n  \tfont-size: 46px;\n  }\n  h2:hover {\n    font-size: 46px;\n  }\n  p {\n    font-size: 24px;\n  }\n  p:hover {\n    font-size: 24px;\n  }\n  .BioSection-SectionHeader_first {\n    margin-top: 0;\n  }\n  .InitialsLogo-Surname, .InitialsLogo-Name {\n    display: flex;\n    font-size: 40px;\n    position: absolute;\n  }\n  .InitialsLogo-Name {\n    max-width: 30%;\n    min-width: 30%;\n    color: rgba(55, 55, 55, 1);\n    top: -1%;\n    right: 68%;\n    transform: rotate(0deg);\n    background-color: rgba(78, 178, 78, 1);\n    max-height: 5%;\n  }\n  .InitialsLogo-Surname {\n    max-width: 30%;\n    min-width: 30%;\n    left: 15%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n    transform: rotate(0deg);\n    top: 5%;\n  }\n  .BodyDivisorWhite-PhotoItem_wrapper {\n    position: absolute;\n    width: 200px;\n  }\n  .BodyDivisorBlack-TextItem_title {\n    position: absolute;\n    display: flex;\n    left: 7%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n  }\n  path {\n    fill: rgba(78, 178, 178, 1);\n  }\n  path:hover {\n    fill: rgba(78, 178, 78, 1);\n  }\n  .Gallery-Button_closed {\n    position: absolute;\n    left: 80%;\n    top: 7%;\n  }\n}\n/*. sourceMappingURL=data:application/json;base64,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aHQ6MTAwJTt9XG5odG1sLCBib2R5e21hcmdpbjowO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7fVxuI2JsYWNre2JhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTttYXgtaGVpZ2h0OjEwMCU7bWF4LXdpZHRoOjUwJTt3aWR0aDo1MCU7fVxuI2xvZ28td3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MSU7ZGlzcGxheTpmbGV4O3dpZHRoOjUwJTt9XG4jbG9nby1mYWNle3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6OTIlO31cbiNsb2dvLWluc3R7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxJTt9XG4jYXJ0aXN0LXRpdGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo5MiU7bGVmdDoxJTtmb250LXNpemU6MTRweDtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Y29sb3I6cmdiYSgyNTUsIDI1NSwgMjU1LCAxKTt9XG4jdGV4dC13cmFwcGVyLWJsYWNre3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6ZmxleDttYXgtaGVpZ2h0OjI1JTtwb3NpdGlvbjpyZWxhdGl2ZTttYXgtd2lkdGg6MzYwcHg7dG9wOjM3JTtsZWZ0OjI1JTt9XG4jdGV4dC1sZWZ0LWJsYWNrLCAjdGV4dC1yaWdodC1ibGFja3tjb2xvcjp3aGl0ZTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXNpemU6MzBweDt9XG4jdGV4dC1sZWZ0LWJsYWNre3RleHQtYWxpZ246cmlnaHQ7d2lsbC1jaGFuZ2U6IGZvbnQtc2l6ZTttYXJnaW4tcmlnaHQ6MTBweDtwYWRkaW5nLXJpZ2h0OjMwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCB3aGl0ZTt0cmFuc2l0aW9uLXByb3BlcnR5OmZvbnQtc2l6ZTt0cmFuc2l0aW9uLWR1cmF0aW9uOjFzO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O31cbiN0ZXh0LXJpZ2h0LWJsYWNre3RleHQtYWxpZ246bGVmdDt3aWxsLWNoYW5nZTogZm9udC1zaXplO21hcmdpbi1sZWZ0OjEwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNsYXN0bmFtZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6ODMlO2xlZnQ6NDMlO3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6d2hpdGU7Zm9udC1zaXplOjM2cHg7d2lkdGg6MTUwcHg7aGVpZ2h0OjQwcHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7dHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpO2ZvbnQtd2VpZ2h0OjMwMDt9XG4jd2hpdGV7YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTttYXgtd2lkdGg6ODAwcHg7d2lsbC1jaGFuZ2U6IHdpZHRoLCBoZWlnaHQ7bWF4LWhlaWdodDphdXRvO3dpZHRoOjUwJTthbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jdGV4dC13cmFwcGVyLXdoaXRle2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MjUlO2xlZnQ6MjUlO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXgtd2lkdGg6MzUwcHg7bWF4LWhlaWdodDo0MDBweDtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmQ7b3ZlcmZsb3c6YXV0bztib3JkZXItcmlnaHQ6MXB4IHNvbGlkIGJsYWNrO31cbmgye2ZvbnQtc2l6ZTo0OHB4O2ZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjUwMDt3aWxsLWNoYW5nZTogY29sb3I7Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTttYXJnaW4tYm90dG9tOjBweDt0cmFuc2l0aW9uLXByb3BlcnR5OmNvbG9yO3RyYW5zaXRpb24tZHVyYXRpb246MXM7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7fVxuI2ZpcnN0LXBhcmFnLCAjc2Vjb25kLXBhcmFnLCAjdGhpcmQtcGFyYWcsICNmb3J0aC1wYXJhZywgI2ZpZnRoLXBhcmFnLCAjc2l4dGgtcGFyYWd7Zm9udC1zaXplOjE4cHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWFyZ2luLWJvdHRvbTowcHg7cGFkZGluZy1yaWdodDoxMHB4O3dpbGwtY2hhbmdlOiBmb250LXNpemU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNuYW1le3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbTo1MCU7cmlnaHQ6NDclO2ZvbnQtc2l6ZTozNnB4O3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDozMDA7fVxuI3Bob3RvLXJpZ2h0e3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6NjglO2JvdHRvbTotNTBweDt9XG4jYnV0dG9ue2Zsb2F0OnJpZ2h0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo1JTttYXJnaW46MHB4IDMwcHggODBweCAwcHg7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O2ZvbnQ6MTNweC8xMDBweCAnUm9ib3RvJywgc2Fucy1zZXJpZjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6MXB4O2NvbG9yOmJsYWNrO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6cmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO31cbiNjbG9zZS1idXR0b257cG9zaXRpb246YWJzb2x1dGU7bGVmdDo5MCU7dG9wOjUlO21hcmdpbjowcHggMzBweCA4MHB4IDBweDt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Zm9udDoyMHB4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzoxcHg7Y29sb3I6d2hpdGU7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZDpyZ2JhKDQ1LCA0NSwgNDUsIDEpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctd2hpdGUgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnl7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO21heC13aWR0aDoxMjAlO3dpZHRoOjEwMCU7aGVpZ2h0OjExMCU7bWF4LWhlaWdodDoxMTAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNSwgMjUsIDI1LCAwLjkpO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnktd3JhcHBlcnt3aWR0aDo3MCU7d2lsbC1jaGFuZ2U6IGJhY2tncm91bmQtY29sb3I7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2UtaW47dHJhbnNpdGlvbi1kdXJhdGlvbjoyczttYXJnaW46YXV0bztib3JkZXItcmFkaXVzOjEycHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDAuOCk7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjcwJTttYXgtaGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO292ZXJmbG93LXg6YXV0bzt9XG4jZ2FsbGVyeS1oZWFkZXItd3JhcHBlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtwb3NpdGlvbjpmaXhlZDt3aWR0aDo3MCU7Ym9yZGVyLXJhZGl1czoxMnB4O2hlaWdodDphdXRvO2JvcmRlci1ib3R0b206cmdiYSg1NSwgNTUsIDU1LCAxKTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWF4LWhlaWdodDoyMCU7ei1pbmRleDo5OTk5ODt9XG5oM3tmb250LXNpemU6MzZweDt3aWxsLWNoYW5nZTogY29sb3I7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc3R5bGU6aXRhbGljO2JvdHRvbToxMCU7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2NvbG9yOndoaXRlO3RyYW5zaXRpb246Y29sb3I7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDt9XG4uc2VsZWN0LWJsb2Nre2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZ3JhcGhpY3MtYmxvY2t7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOnJlbGF0aXZlO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3dpZHRoOjEwMCU7fVxuI2FydC1ibG9ja3tkaXNwbGF5Om5vbmU7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47fVxuZmlndXJle2Rpc3BsYXk6ZmxleDttYXJnaW46MjMlIDAgMjAlIDEwJTt9XG4jaW1hZ2U6aG92ZXJ7Ym94LXNoYWRvdzo0cHggOXB4IDlweCAxcHggcmdiYSgwLCAwLCAwLCAwLjYpO3RyYW5zZm9ybTpzY2FsZSgxLjgsIDEuOCk7fVxuI2dhbGxlcnktd3JhcHBlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoOTAsIDkwLCA5MCwgMC44KTt9XG5oMzpob3Zlcntib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDg1LCA4NSwgODUsIDEpO2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZmlyc3QtcGFyYWc6aG92ZXIsICNzZWNvbmQtcGFyYWc6aG92ZXIsICN0aGlyZC1wYXJhZzpob3ZlciwgI2ZvcnRoLXBhcmFnOmhvdmVyLCAjZmlmdGgtcGFyYWc6aG92ZXIsICNzaXh0aC1wYXJhZzpob3ZlciwgI3RleHQtbGVmdC1ibGFjazpob3ZlciwgI3RleHQtcmlnaHQtYmxhY2s6aG92ZXJ7Zm9udC1zaXplOjI0cHg7fVxuI3RleHQtd3JhcHBlci13aGl0ZSwgI3RleHQtd3JhcHBlci1ibGFja3thbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jbGFzdG5hbWUsICNuYW1le3RyYW5zaXRpb246NHMsIDJzLCAyczt9XG4jbGFzdG5hbWU6aG92ZXJ7Y29sb3I6cmdiKDI1LCAyNSwgMjUpO31cbiNuYW1lOmhvdmVye2NvbG9yOnJnYigxNzUsIDE3NSwgMTc1KTt9XG4ucm90YXRlOTB7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTstbW96LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1vLXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1tcy10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt9XG5Aa2V5ZnJhbWVzIHNsaWRlaW57ZnJvbXttYXJnaW4tbGVmdDoxMCU7d2lkdGg6MTAwJTt9XG50b3ttYXJnaW4tbGVmdDowJTt3aWR0aDo1MCU7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctcHVsc2V7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjI1JXtib3gtc2hhZG93OjAgMCAwIDEwcHggcmdiYSg0MCwgMTY1LCA3NSwgMC41KTt9XG41MCV7Ym94LXNoYWRvdzowIDAgMCAxNXB4IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO31cbjc1JXtib3gtc2hhZG93OjAgMCAwIDBweCByZ2JhKDE2NSwgMTA4LCA0MCwgMC4yKTt9XG4xMDAle2JveC1zaGFkb3c6MCAwIDAgMzVweCByZ2JhKDAsIDAsIDI1NSwgMCk7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctd2hpdGV7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjEwMCV7Ym94LXNoYWRvdzowIDAgMCAzNXB4IHJnYmEoMCwgMCwgMCwgMCk7fVxufSJdfQ== */\n", ""]);

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
/* harmony import */ var _script_pickerWheel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script/pickerWheel.js */ "./src/script/pickerWheel.js");
/* harmony import */ var _script_imagePicker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script/imagePicker.js */ "./src/script/imagePicker.js");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_4__);






window.onload = function () {
  Object(_script_closeGallery_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_script_openGallery_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_script_pickerWheel_js__WEBPACK_IMPORTED_MODULE_2__["default"])(); //imagePicker();
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
  var button = document.getElementsByClassName('Gallery-Button_closed')[0];

  button.onclick = function () {
    document.getElementsByClassName('Gallery')[0].style.display = 'none';
  };
}

/***/ }),

/***/ "./src/script/imagePicker.js":
/*!***********************************!*\
  !*** ./src/script/imagePicker.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return imagePicker; });
function imagePicker() {
  var img = document.getElementsByTagName("image")[0];
  var att = document.createAttribute("class");
  att.value = "image";

  img.onclick = function () {
    img.setAttributeNode(att);
  };
}

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
  var button = document.getElementsByClassName('Button_opened')[0];

  button.onclick = function () {
    document.getElementsByClassName('Gallery')[0].style.display = 'flex';
  };
}

/***/ }),

/***/ "./src/script/pickerWheel.js":
/*!***********************************!*\
  !*** ./src/script/pickerWheel.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pickerWheel; });
function pickerWheel() {
  var art = document.getElementsByClassName('Nav-ItemArt')[0],
      oil = document.getElementsByClassName('Nav-ItemOil')[0],
      graph = document.getElementsByClassName('Nav-ItemGraphics')[0];
  graph.setAttribute("class", "select-block");

  art.onclick = function () {
    document.getElementsByClassName('GalleryWrapper-ItemGraphics')[0].style.display = 'none';
    document.getElementsByClassName('GalleryWrapper-ItemArt')[0].style.display = 'flex';
    graph.removeAttribute("class", "select-block");
    art.setAttribute("class", "select-block");
  };

  graph.onclick = function () {
    document.getElementsByClassName('GalleryWrapper-ItemGraphics')[0].style.display = 'flex';
    document.getElementsByClassName('GalleryWrapper-ItemArt')[0].style.display = 'none';
    graph.setAttribute("class", "select-block");
    art.removeAttribute("class", "select-block");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvY2xvc2VHYWxsZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvaW1hZ2VQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC9vcGVuR2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0L3BpY2tlcldoZWVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9zdHlsZS5jc3M/YzcxNiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJvbmxvYWQiLCJjbG9zZUdhbGxlcnkiLCJvcGVuR2FsbGVyeSIsInBpY2tlcldoZWVsIiwiYnV0dG9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsImltYWdlUGlja2VyIiwiaW1nIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhdHQiLCJjcmVhdGVBdHRyaWJ1dGUiLCJ2YWx1ZSIsInNldEF0dHJpYnV0ZU5vZGUiLCJhcnQiLCJvaWwiLCJncmFwaCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUssQ0FBQ1osT0FBTixHQUFnQixZQUFNO0FBQ3JCRixZQUFRLENBQUNDLHNCQUFULENBQWdDLDZCQUFoQyxFQUErRCxDQUEvRCxFQUFrRUUsS0FBbEUsQ0FBd0VDLE9BQXhFLEdBQWtGLE1BQWxGO0FBQ0FKLFlBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0Msd0JBQWhDLEVBQTBELENBQTFELEVBQTZERSxLQUE3RCxDQUFtRUMsT0FBbkUsR0FBNkUsTUFBN0U7QUFDQVUsU0FBSyxDQUFDQyxZQUFOLENBQW1CLE9BQW5CLEVBQTRCLGNBQTVCO0FBQ0FILE9BQUcsQ0FBQ0ksZUFBSixDQUFvQixPQUFwQixFQUE2QixjQUE3QjtBQUNBLEdBTEQ7QUFNQSxDOzs7Ozs7Ozs7Ozs7QUNoQkQsY0FBYyxtQkFBTyxDQUFDLDRHQUFzRDs7QUFFNUUsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDRHQUFzRDtBQUN6RSxtQkFBbUIsbUJBQU8sQ0FBQyw0R0FBc0Q7O0FBRWpGLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDIiwiZmlsZSI6ImRldi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMzQ3YWNlYzNiMjgzMThiN2JiOGRcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiZGV2XCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuYm9keXtcXG5cXHRkaXNwbGF5OmZsZXg7XFxufVxcbmh0bWwsIGJvZHkge1xcblxcdG1hcmdpbjowO1xcblxcdG92ZXJmbG93OmhpZGRlbjtcXG5cXHRwYWRkaW5nOjA7XFxufVxcbm1haW4ge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdG9wYWNpdHk6IDAuOTtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHR6LWluZGV4OiA5OTk5ODtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxuXFx0ZmxleC1mbG93OiByb3cgd3JhcDtcXG59XFxuLkFkanVzdFBvc2l0aW9uLUJ1dHRvbl93cmFwcGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbn1cXG4uTWFpbkdyb3VwLUFib3V0SW5mb193cmFwcGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdG1heC1oZWlnaHQ6IDUwJTtcXG5cXHRtaW4td2lkdGg6IDE1JTtcXG5cXHRtYXgtd2lkdGg6IDEwMCU7XFxuXFx0ZmxleC1mbG93OiByb3cgd3JhcDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuXFx0d2lkdGg6IDEzMHZoO1xcblxcdG1hcmdpbi10b3A6IC0xNXZoO1xcbn1cXG4uQm9keURpdmlzb3JfYmxhY2sge1xcblxcdGJhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHR3aWR0aDogNTAlO1xcblxcdGhlaWdodDogMTAwMHB4O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcbi5OYXYtU29jaWFsTWVkaWFfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0aGVpZ2h0OiAzZW07XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcbi5Cb2R5RGl2aXNvckJsYWNrLVRleHRJdGVtX3RpdGxlIHtcXG5cXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHR0b3A6OTIlO1xcblxcdGxlZnQ6MSU7XFxuXFx0Zm9udC1zaXplOjE0cHg7XFxuXFx0Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6ODAwO1xcblxcdGNvbG9yOnJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XFxuXFx0Y3Vyc29yOiB0ZXh0O1xcbn1cXG4uQWJvdXRJbmZvLUFydGljbGVCbGFja1NpZGVfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRtYXgtaGVpZ2h0OiAyNXZoO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRtYXgtd2lkdGg6IDM2MHB4O1xcblxcdGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fbGVmdCwgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fcmlnaHQge1xcblxcdGNvbG9yOndoaXRlO1xcblxcdGZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtc2l6ZToxLjdlbTtcXG59XFxuLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fbGVmdCB7XFxuXFx0dGV4dC1hbGlnbjpyaWdodDtcXG5cXHRtYXJnaW4tcmlnaHQ6MTBweDtcXG5cXHRwYWRkaW5nLXJpZ2h0OjI1cHg7XFxuXFx0b3ZlcmZsb3c6YXV0bztcXG5cXHR3aWR0aDo1MCU7XFxuXFx0Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG59XFxuLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fcmlnaHQge1xcblxcdHRleHQtYWxpZ246bGVmdDtcXG5cXHRtYXJnaW4tbGVmdDoxMHB4O1xcblxcdG92ZXJmbG93OmF1dG87XFxuXFx0d2lkdGg6NTAlO1xcbn1cXG4uSW5pdGlhbHNMb2dvLU5hbWUge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRmb250LXNpemU6IDIuNWVtO1xcblxcdGNvbG9yOiByZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcblxcdGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcblxcdGhlaWdodDogMWVtO1xcblxcdG1hcmdpbjogMDtcXG5cXHRjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbi5Jbml0aWFsc0xvZ28tU3VybmFtZSB7XFxuXFx0Y29sb3I6IHdoaXRlO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcblxcdGZvbnQtc2l6ZTogMi41ZW07XFxuXFx0aGVpZ2h0OiAxZW07XFxuXFx0Zm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdG1hcmdpbjogMDtcXG5cXHRsZWZ0OiAzMCU7XFxuXFx0d2lkdGg6IC1tb3otZml0LWNvbnRlbnQ7XFxuXFx0bWFyZ2luLXRvcDogMSU7XFxuXFx0Y3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4uQm9keURpdmlzb3Jfd2hpdGUge1xcblxcdGJhY2tncm91bmQtY29sb3I6d2hpdGU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246M3M7XFxuXFx0YW5pbWF0aW9uLWR1cmF0aW9uOjNzO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6c2xpZGVpbjtcXG5cXHRhbmltYXRpb24tbmFtZTpzbGlkZWluO1xcblxcdHdpZHRoOiA1MCU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG59XFxuLkFib3V0SW5mby1BcnRpY2xlV2hpdGVTaWRlX3dyYXBwZXIge1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHRmbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuXFx0bWF4LXdpZHRoOjQ1dmg7XFxuXFx0bWF4LWhlaWdodDo1MHZoO1xcblxcdG92ZXJmbG93LXdyYXA6YnJlYWstd29yZDtcXG5cXHRvdmVyZmxvdzphdXRvO1xcblxcdGJvcmRlci1yaWdodDoxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuXFx0bWFyZ2luLWxlZnQ6IDEwdmg7XFxufVxcbmgyIHtcXG5cXHRmb250LXNpemU6NDRweDtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDo1MDA7XFxuXFx0d2lsbC1jaGFuZ2U6IGNvbG9yO1xcblxcdGNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0bWFyZ2luLWJvdHRvbToyJTtcXG5cXHR0cmFuc2l0aW9uLXByb3BlcnR5OmNvbG9yO1xcblxcdHRyYW5zaXRpb24tZHVyYXRpb246MXM7XFxuXFx0dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7XFxufVxcbnAge1xcblxcdGZvbnQtc2l6ZToxLjVlbTtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDozMDA7XFxuXFx0Y29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHRtYXJnaW4tYm90dG9tOjBweDtcXG5cXHRwYWRkaW5nLXJpZ2h0OjEwcHg7XFxufVxcbi5Cb2R5RGl2aXNvcldoaXRlLVBob3RvSXRlbV93cmFwcGVyIHtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiA4NSU7XFxuXFx0bGVmdDogODUlO1xcblxcdHotaW5kZXg6IDk5OTk4O1xcblxcdHRyYW5zaXRpb246IGFsbCAycyAyMDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSk7XFxufVxcbi5Cb2R5RGl2aXNvcldoaXRlLVBob3RvSXRlbV93cmFwcGVyOmhvdmVyIHtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwcHgpO1xcbn1cXG5pbWcge1xcblxcdG1heC13aWR0aDogMTAwJTtcXG5cXHRoZWlnaHQ6IGF1dG87XFxufVxcbi5CdXR0b25fb3BlbmVkIHtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHR3aWR0aDoxMDBweDtcXG5cXHRoZWlnaHQ6MTAwcHg7XFxuXFx0Zm9udDoxM3B4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtcXG5cXHRsZXR0ZXItc3BhY2luZzoxcHg7XFxuXFx0Y29sb3I6YmxhY2s7XFxuXFx0dGV4dC1hbGlnbjpjZW50ZXI7XFxuXFx0YmFja2dyb3VuZDpyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuXFx0Ym9yZGVyLXJhZGl1czo1MCU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb246c2hhZG93LXB1bHNlIDNzIGluZmluaXRlO1xcblxcdGFuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7XFxuXFx0LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6MnM7XFxuXFx0YW5pbWF0aW9uLWRlbGF5OjJzO1xcblxcdHRyYW5zaXRpb246IGFsbCA1cyBjdWJpYy1iZXppZXIoMC43ODUsIDAuMTM1LCAwLjE1LCAwLjg2KTtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5CdXR0b25fb3BlbmVkOmhvdmVyIHtcXG5cXHRjb2xvcjogcmdiYSgxNjUsIDEwOCwgNDAsIDAuOCk7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MCwgMTI3LCAxNjUsIDAuNCk7XFxufVxcbi5HYWxsZXJ5LUJ1dHRvbl9jbG9zZWQge1xcblxcdHBvc2l0aW9uOmFic29sdXRlO1xcblxcdGxlZnQ6OTAlO1xcblxcdHRvcDo1JTtcXG5cXHRtYXJnaW46MHB4IDMwcHggODBweCAwcHg7XFxuXFx0d2lkdGg6MTAwcHg7XFxuXFx0aGVpZ2h0OjEwMHB4O1xcblxcdGZvbnQ6MjBweC8xMDBweCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHR0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7XFxuXFx0bGV0dGVyLXNwYWNpbmc6MXB4O1xcblxcdGNvbG9yOndoaXRlO1xcblxcdHRleHQtYWxpZ246Y2VudGVyO1xcblxcdGJhY2tncm91bmQ6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHRib3JkZXItcmFkaXVzOjUwJTtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbjpzaGFkb3ctd2hpdGUgM3MgaW5maW5pdGU7XFxuXFx0YW5pbWF0aW9uOnNoYWRvdy13aGl0ZSAzcyBpbmZpbml0ZTtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbi1kZWxheToycztcXG5cXHRhbmltYXRpb24tZGVsYXk6MnM7XFxuXFx0ei1pbmRleDo5OTk5OTtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5HYWxsZXJ5IHtcXG5cXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHRkaXNwbGF5Om5vbmU7XFxuXFx0bWF4LXdpZHRoOjEyMCU7XFxuXFx0d2lkdGg6MTAwJTtcXG5cXHRoZWlnaHQ6MTEwJTtcXG5cXHRtYXgtaGVpZ2h0OjExMCU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1LCAyNSwgMjUsIDAuOSk7XFxuXFx0ei1pbmRleDo5OTk5OTtcXG59XFxuLkdhbGxlcnktR2FsbGVyeVdyYXBwZXIge1xcblxcdHdpZHRoOjcwJTtcXG5cXHR3aWxsLWNoYW5nZTogYmFja2dyb3VuZC1jb2xvcjtcXG5cXHR0cmFuc2l0aW9uOmJhY2tncm91bmQtY29sb3I7XFxuXFx0dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbjtcXG5cXHR0cmFuc2l0aW9uLWR1cmF0aW9uOjJzO1xcblxcdG1hcmdpbjphdXRvO1xcblxcdGJvcmRlci1yYWRpdXM6MTJweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMC44KTtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHRoZWlnaHQ6NzAlO1xcblxcdG1heC1oZWlnaHQ6MTAwJTtcXG5cXHRvdmVyZmxvdzpoaWRkZW47XFxuXFx0b3ZlcmZsb3cteDphdXRvO1xcbn1cXG4uR2FsbGVyeVdyYXBwZXItTmF2IHtcXG5cXHRkaXNwbGF5OmZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtcXG5cXHRwb3NpdGlvbjpmaXhlZDtcXG5cXHR3aWR0aDo3MCU7XFxuXFx0Ym9yZGVyLXJhZGl1czoxMnB4O1xcblxcdGhlaWdodDphdXRvO1xcblxcdGJvcmRlci1ib3R0b206cmdiYSg1NSwgNTUsIDU1LCAxKTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0bWF4LWhlaWdodDoyMCU7XFxuXFx0ei1pbmRleDo5OTk5ODtcXG59XFxuaDMge1xcblxcdGZvbnQtc2l6ZTozNnB4O1xcblxcdHdpbGwtY2hhbmdlOiBjb2xvcjtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDo1MDA7XFxuXFx0Ym90dG9tOjEwJTtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHRkaXNwbGF5OmZsZXg7XFxuXFx0Y29sb3I6d2hpdGU7XFxuXFx0dHJhbnNpdGlvbjpjb2xvcjtcXG5cXHR0cmFuc2l0aW9uLWR1cmF0aW9uOjFzO1xcblxcdHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnNlbGVjdC1ibG9jayB7XFxuXFx0Y29sb3I6cmdiKDg1LCA4NSwgODUpO1xcbn1cXG4uR2FsbGVyeVdyYXBwZXItSXRlbUdyYXBoaWNzIHtcXG5cXHRkaXNwbGF5OmZsZXg7XFxuXFx0dG9wOiAtMTAlO1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcblxcdGp1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQ7XFxuXFx0d2lkdGg6MTAwJTtcXG59XFxuLkdhbGxlcnlXcmFwcGVyLUl0ZW1BcnQge1xcblxcdGRpc3BsYXk6bm9uZTtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtcXG59XFxuLkdhbGxlcnlXcmFwcGVyLUl0ZW1JbWFnZV9ncmFwaGljczpob3ZlciwgLkdhbGxlcnlXcmFwcGVyLUl0ZW1JbWFnZV9oYW5kTWFkZTpob3ZlciB7XFxuXFx0Ym94LXNoYWRvdzo0cHggOXB4IDlweCAxcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcblxcdC13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuOCwgMS44KTtcXG5cXHR0cmFuc2Zvcm06c2NhbGUoMS44LCAxLjgpO1xcbn1cXG4uR2FsbGVyeS1HYWxsZXJ5V3JhcHBlcjpob3ZlciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDkwLCA5MCwgOTAsIDAuOCk7XFxufVxcbmgzOmhvdmVyIHtcXG5cXHRib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDg1LCA4NSwgODUsIDEpO1xcblxcdGNvbG9yOnJnYig4NSwgODUsIDg1KTtcXG59XFxuLkluaXRpYWxzTG9nby1TdXJuYW1lLCAuSW5pdGlhbHNMb2dvLU5hbWUge1xcblxcdHRyYW5zaXRpb246NHMsIDJzLCAycztcXG59XFxuLkluaXRpYWxzTG9nby1TdXJuYW1lOmhvdmVyIHtcXG5cXHRjb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcbn1cXG4uSW5pdGlhbHNMb2dvLU5hbWU6aG92ZXIge1xcblxcdGNvbG9yOndoaXRlO1xcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2xpZGVpblxcbntcXG5cXHRmcm9tXFxuXFx0e21hcmdpbi1sZWZ0OjQwJTtcXG5cXHR3aWR0aDoxMDAlO31cXG5cXHR0b1xcblxcdHttYXJnaW4tbGVmdDowJTtcXG5cXHR3aWR0aDo1MCU7fVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2hhZG93LXB1bHNlezAle2JveC1zaGFkb3c6MCAwIDAgMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTt9XFxuMjUle2JveC1zaGFkb3c6MCAwIDAgMTBweCByZ2JhKDQwLCAxNjUsIDc1LCAwLjUpO31cXG41MCV7Ym94LXNoYWRvdzowIDAgMCAxNXB4IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO31cXG43NSV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgxNjUsIDEwOCwgNDAsIDAuMik7fVxcbjEwMCV7Ym94LXNoYWRvdzowIDAgMCAzNXB4IHJnYmEoMCwgMCwgMjU1LCAwKTt9XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBzaGFkb3ctd2hpdGV7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cXG4xMDAle2JveC1zaGFkb3c6MCAwIDAgMzVweCByZ2JhKDAsIDAsIDAsIDApO31cXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcXG4gICAubGFzdG5hbWUsIC5uYW1lLCAucGhvdG8tcmlnaHQsLnRleHQtd3JhcHBlci1ibGFjaywgLnRleHQtd3JhcHBlci13aGl0ZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxuICBib2R5IHtcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcXG4gIH1cXG4gIC5Cb2R5RGl2aXNvcl93aGl0ZSwgLkJvZHlEaXZpc29yX2JsYWNrIHtcXG4gICAgbWluLWhlaWdodDogNzY4cHg7XFxuICAgIG1heC1oZWlnaHQ6IGF1dG87XFxuICB9XFxuXFxuICAuTmF2LVNvY2lhbE1lZGlhX3dyYXBwZXIge1xcbiAgICB3aWR0aDogMjAlO1xcbiAgICByaWdodDogNDMlO1xcbiAgICB0b3A6IDkxJTtcXG4gICAgaGVpZ2h0OiA3JTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgfVxcbiAgLkJ1dHRvbl9vcGVuZWQge1xcbiAgICB0b3A6IDYlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDc3JTtcXG4gIH1cXG4gIC5BYm91dEluZm8tQXJ0aWNsZUJsYWNrU2lkZV93cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gICAgbWF4LXdpZHRoOiA0MCU7XFxuICAgIG1pbi13aWR0aDogMjAlO1xcbiAgICB0b3A6IDM3JTtcXG4gICAgbGVmdDogMmVtO1xcbiAgICBtaW4taGVpZ2h0OiAyMCU7XFxuICAgIG1heC1oZWlnaHQ6IDMwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuXFxuICB9XFxuICAuQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9sZWZ0IHtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGNvbG9yOiByZ2JhKDE0OCwgMTQ4LCAxNDgsIDEpO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDUlO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogNSU7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDJzO1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBjb2xvcjtcXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xcbiAgfVxcbiAgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fcmlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcbiAgICBjb2xvcjogcmdiYSgxNDgsIDE0OCwgMTQ4LCAxKTtcXG4gICAgcGFkZGluZy10b3A6IDEwJTtcXG4gICAgcGFkZGluZy1yaWdodDogNSU7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMTc4LCAxNzgsIDc4LCAxKTtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMnM7XFxuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yO1xcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XFxuICB9XFxuICAuQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9sZWZ0OmhvdmVyIHtcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcbiAgICBjb2xvcjogcmdiYSg3OCwgNzgsIDc4LCAxKTtcXG4gIH1cXG4gIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0OmhvdmVyIHtcXG4gICAgZm9udC1zaXplOiAzNnB4O1xcbiAgICBjb2xvcjogcmdiYSg3OCwgNzgsIDc4LCAxKTtcXG4gIH1cXG5cXG4gIC5BYm91dEluZm8tQXJ0aWNsZVdoaXRlU2lkZV93cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gICAgbGVmdDogNTglO1xcbiAgICB0b3A6IDMwJTtcXG4gICAgbWluLXdpZHRoOiAyMCU7XFxuICAgIG1heC13aWR0aDogMzUlO1xcbiAgICBtaW4taGVpZ2h0OiAyMCU7XFxuICAgIG1heC1oZWlnaHQ6IDQwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gIH1cXG4gIGgyIHtcXG4gIFxcdGZvbnQtc2l6ZTogNDZweDtcXG4gIH1cXG4gIGgyOmhvdmVyIHtcXG4gICAgZm9udC1zaXplOiA0NnB4O1xcbiAgfVxcbiAgcCB7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gIH1cXG4gIHA6aG92ZXIge1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICB9XFxuICAuQmlvU2VjdGlvbi1TZWN0aW9uSGVhZGVyX2ZpcnN0IHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG4gIC5Jbml0aWFsc0xvZ28tU3VybmFtZSwgLkluaXRpYWxzTG9nby1OYW1lIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB9XFxuICAuSW5pdGlhbHNMb2dvLU5hbWUge1xcbiAgICBtYXgtd2lkdGg6IDMwJTtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICAgIGNvbG9yOiByZ2JhKDU1LCA1NSwgNTUsIDEpO1xcbiAgICB0b3A6IC0xJTtcXG4gICAgcmlnaHQ6IDY4JTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgICBtYXgtaGVpZ2h0OiA1JTtcXG4gIH1cXG4gIC5Jbml0aWFsc0xvZ28tU3VybmFtZSB7XFxuICAgIG1heC13aWR0aDogMzAlO1xcbiAgICBtaW4td2lkdGg6IDMwJTtcXG4gICAgbGVmdDogMTUlO1xcbiAgICBjb2xvcjogcmdiYSg1NSwgNTUsIDU1LCAxKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB0b3A6IDUlO1xcbiAgfVxcbiAgLkJvZHlEaXZpc29yV2hpdGUtUGhvdG9JdGVtX3dyYXBwZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gIH1cXG4gIC5Cb2R5RGl2aXNvckJsYWNrLVRleHRJdGVtX3RpdGxlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBsZWZ0OiA3JTtcXG4gICAgY29sb3I6IHJnYmEoNTUsIDU1LCA1NSwgMSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgfVxcbiAgcGF0aCB7XFxuICAgIGZpbGw6IHJnYmEoNzgsIDE3OCwgMTc4LCAxKTtcXG4gIH1cXG4gIHBhdGg6aG92ZXIge1xcbiAgICBmaWxsOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gIH1cXG4gIC5HYWxsZXJ5LUJ1dHRvbl9jbG9zZWQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgdG9wOiA3JTtcXG4gIH1cXG59XFxuLyouIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMM04wZVd4bExtTnpjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4TFFVRkxMR0ZCUVdFc1dVRkJXU3hEUVVGRE8wRkJReTlDTEZkQlFWY3NVMEZCVXl4blFrRkJaMElzVlVGQlZTeERRVUZETzBGQlF5OURMRTlCUVU4c2NVTkJRWEZETEdkQ1FVRm5RaXhqUVVGakxGVkJRVlVzUTBGQlF6dEJRVU55Uml4alFVRmpMR3RDUVVGclFpeFBRVUZQTEdGQlFXRXNWVUZCVlN4RFFVRkRPMEZCUXk5RUxGZEJRVmNzYTBKQlFXdENMRk5CUVZNc1EwRkJRenRCUVVOMlF5eFhRVUZYTEd0Q1FVRnJRaXhSUVVGUkxFTkJRVU03UVVGRGRFTXNZMEZCWXl4clFrRkJhMElzVVVGQlVTeFJRVUZSTEdWQlFXVXNhVU5CUVdsRExHZENRVUZuUWl3MlFrRkJOa0lzUTBGQlF6dEJRVU01U1N4dlFrRkJiMElzYTBKQlFXdENMR0ZCUVdFc1pVRkJaU3hyUWtGQmEwSXNaMEpCUVdkQ0xGRkJRVkVzVTBGQlV5eERRVUZETzBGQlEzUklMRzlEUVVGdlF5eFpRVUZaTEdsRFFVRnBReXhsUVVGbExFTkJRVU03UVVGRGFrY3NhVUpCUVdsQ0xHbENRVUZwUWl4MVFrRkJkVUlzYTBKQlFXdENMRzFDUVVGdFFpeGpRVUZqTEZWQlFWVXNOa0pCUVRaQ0xEaENRVUU0UWl4MVFrRkJkVUlzYjBOQlFXOURMRU5CUVVNN1FVRkROMDhzYTBKQlFXdENMR2RDUVVGblFpeDFRa0ZCZFVJc2FVSkJRV2xDTEdOQlFXTXNWVUZCVlN3NFFrRkJPRUlzZFVKQlFYVkNMRzFEUVVGdFF5eERRVUZETzBGQlF6Tk1MRlZCUVZVc2EwSkJRV3RDTEZGQlFWRXNVMEZCVXl4MVFrRkJkVUlzV1VGQldTeGxRVUZsTEZsQlFWa3NXVUZCV1N4cFEwRkJhVU1zYVVOQlFYbENMRUZCUVhwQ0xIbENRVUY1UWl4blFrRkJaMElzUTBGQlF6dEJRVU5zVFN4UFFVRlBMSFZDUVVGMVFpeG5Ra0ZCWjBJc01rSkJRVEpDTEdkQ1FVRm5RaXhWUVVGVkxEaENRVUZ6UWl4QlFVRjBRaXh6UWtGQmMwSXNLMEpCUVhWQ0xFRkJRWFpDTEhWQ1FVRjFRaXhEUVVGRE8wRkJRMnBLTEc5Q1FVRnZRaXhoUVVGaExHdENRVUZyUWl4UlFVRlJMRk5CUVZNc2MwSkJRWE5DTEdkQ1FVRm5RaXhwUWtGQmFVSXNlVUpCUVhsQ0xHTkJRV01zTmtKQlFUWkNMRU5CUVVNN1FVRkRhRTBzUjBGQlJ5eGxRVUZsTEdsRFFVRnBReXhuUWtGQlowSXNiVUpCUVcxQ0xEQkNRVUV3UWl4clFrRkJhMElzTUVKQlFUQkNMSFZDUVVGMVFpeHZRMEZCYjBNc1EwRkJRenRCUVVONFRpeHZSa0ZCYjBZc1pVRkJaU3hwUTBGQmFVTXNaMEpCUVdkQ0xEQkNRVUV3UWl4clFrRkJhMElzYlVKQlFXMUNMSFZDUVVGMVFpdzRRa0ZCT0VJc2RVSkJRWFZDTEcxRFFVRnRReXhEUVVGRE8wRkJRMjVWTEUxQlFVMHNhMEpCUVd0Q0xGZEJRVmNzVlVGQlZTeGxRVUZsTEhWQ1FVRjFRaXd3UWtGQk1FSXNaME5CUVhkQ0xFRkJRWGhDTEhkQ1FVRjNRaXhwUTBGQmFVTXNaMEpCUVdkQ0xFTkJRVU03UVVGRGRrd3NZVUZCWVN4clFrRkJhMElzVTBGQlV5eGhRVUZoTEVOQlFVTTdRVUZEZEVRc1VVRkJVU3haUVVGWkxHdENRVUZyUWl4UFFVRlBMSGxDUVVGNVFpeFpRVUZaTEdGQlFXRXNjVU5CUVhGRExIbENRVUY1UWl4dFFrRkJiVUlzV1VGQldTeHJRa0ZCYTBJc2IwTkJRVzlETEd0Q1FVRnJRaXd5UTBGQmJVTXNRVUZCYmtNc2JVTkJRVzFETERKQ1FVRnRRaXhCUVVGdVFpeHRRa0ZCYlVJc1EwRkJRenRCUVVNelZDeGpRVUZqTEd0Q1FVRnJRaXhUUVVGVExFOUJRVThzZVVKQlFYbENMRmxCUVZrc1lVRkJZU3h4UTBGQmNVTXNlVUpCUVhsQ0xHMUNRVUZ0UWl4WlFVRlpMR3RDUVVGclFpd3JRa0ZCSzBJc2EwSkJRV3RDTERKRFFVRnRReXhCUVVGdVF5eHRRMEZCYlVNc01rSkJRVzFDTEVGQlFXNUNMRzFDUVVGdFFpeGpRVUZqTEVOQlFVTTdRVUZEZGxVc1UwRkJVeXhyUWtGQmEwSXNZVUZCWVN4bFFVRmxMRmRCUVZjc1dVRkJXU3huUWtGQlowSXNkVU5CUVhWRExHTkJRV01zUTBGQlF6dEJRVU53U2l4cFFrRkJhVUlzVlVGQlZTdzRRa0ZCT0VJc05FSkJRVFJDTEcxRFFVRnRReXgxUWtGQmRVSXNXVUZCV1N4dFFrRkJiVUlzZFVOQlFYVkRMR3RDUVVGclFpeFhRVUZYTEdkQ1FVRm5RaXhuUWtGQlowSXNaMEpCUVdkQ0xFTkJRVU03UVVGRGJsTXNkMEpCUVhkQ0xHRkJRV0VzTmtKQlFUWkNMR1ZCUVdVc1ZVRkJWU3h0UWtGQmJVSXNXVUZCV1N4clEwRkJhME1zY1VOQlFYRkRMR1ZCUVdVc1kwRkJZeXhEUVVGRE8wRkJReTlPTEVkQlFVY3NaVUZCWlN4dFFrRkJiVUlzYVVOQlFXbERMR2RDUVVGblFpeHJRa0ZCYTBJc1YwRkJWeXhyUWtGQmEwSXNZVUZCWVN4WlFVRlpMR2xDUVVGcFFpeDFRa0ZCZFVJc2IwTkJRVzlETEVOQlFVTTdRVUZETTA4c1kwRkJZeXh6UWtGQmMwSXNRMEZCUXp0QlFVTnlReXhuUWtGQlowSXNZVUZCWVN4clFrRkJhMElzT0VKQlFUaENMRmRCUVZjc1EwRkJRenRCUVVONlJpeFhRVUZYTEdGQlFXRXNPRUpCUVRoQ0xFTkJRVU03UVVGRGRrUXNUMEZCVHl4aFFVRmhMSEZDUVVGeFFpeERRVUZETzBGQlF6RkRMR0ZCUVdFc09FTkJRVGhETEd0RFFVRXdRaXhCUVVFeFFpd3dRa0ZCTUVJc1EwRkJRenRCUVVOMFJpeDFRa0ZCZFVJc2RVTkJRWFZETEVOQlFVTTdRVUZETDBRc1UwRkJVeXcwUTBGQk5FTXNjMEpCUVhOQ0xFTkJRVU03UVVGRE5VVXNlVXRCUVhsTExHVkJRV1VzUTBGQlF6dEJRVU42VEN4NVEwRkJlVU1zT0VKQlFYTkNMRUZCUVhSQ0xITkNRVUZ6UWl3clFrRkJkVUlzUVVGQmRrSXNkVUpCUVhWQ0xFTkJRVU03UVVGRGRrWXNhVUpCUVdsQ0xITkNRVUZ6UWl4RFFVRkRPMEZCUTNoRExHZENRVUZuUWl4elFrRkJjMElzUTBGQlF6dEJRVU4yUXl4WlFVRlpMSGxDUVVGNVFpeERRVUZETzBGQlEzUkRMRlZCUVZVc1owTkJRV2RETERaQ1FVRTJRaXd5UWtGQk1rSXNORUpCUVRSQ0xFTkJRVU03UVVGREwwZ3NNa0pCUVcxQ0xFdEJRVXNzWjBKQlFXZENMRmRCUVZjc1EwRkJRenRCUVVOd1JDeEhRVUZITEdWQlFXVXNWVUZCVlN4RFFVRkRPME5CUXpWQ08wRkJSa1FzYlVKQlFXMUNMRXRCUVVzc1owSkJRV2RDTEZkQlFWY3NRMEZCUXp0QlFVTndSQ3hIUVVGSExHVkJRV1VzVlVGQlZTeERRVUZETzBOQlF6VkNPMEZCUTBRc1owTkJRWGRDTEVkQlFVY3NPRU5CUVRoRExFTkJRVU03UVVGRE1VVXNTVUZCU1N3MlEwRkJOa01zUTBGQlF6dEJRVU5zUkN4SlFVRkpMRGhEUVVFNFF5eERRVUZETzBGQlEyNUVMRWxCUVVrc05rTkJRVFpETEVOQlFVTTdRVUZEYkVRc1MwRkJTeXg1UTBGQmVVTXNRMEZCUXp0RFFVTTVRenRCUVV4RUxIZENRVUYzUWl4SFFVRkhMRGhEUVVFNFF5eERRVUZETzBGQlF6RkZMRWxCUVVrc05rTkJRVFpETEVOQlFVTTdRVUZEYkVRc1NVRkJTU3c0UTBGQk9FTXNRMEZCUXp0QlFVTnVSQ3hKUVVGSkxEWkRRVUUyUXl4RFFVRkRPMEZCUTJ4RUxFdEJRVXNzZVVOQlFYbERMRU5CUVVNN1EwRkRPVU03UVVGRFJDeG5RMEZCZDBJc1IwRkJSeXc0UTBGQk9FTXNRMEZCUXp0QlFVTXhSU3hMUVVGTExIVkRRVUYxUXl4RFFVRkRPME5CUXpWRE8wRkJSa1FzZDBKQlFYZENMRWRCUVVjc09FTkJRVGhETEVOQlFVTTdRVUZETVVVc1MwRkJTeXgxUTBGQmRVTXNRMEZCUXp0RFFVTTFReUlzSW1acGJHVWlPaUp6ZEhsc1pTNWpjM01pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKaWIyUjVlMlJwYzNCc1lYazZabXhsZUR0b1pXbG5hSFE2TVRBd0pUdDlYRzVvZEcxc0xDQmliMlI1ZTIxaGNtZHBiam93TzI5MlpYSm1iRzkzT21ocFpHUmxianR3WVdSa2FXNW5PakE3ZlZ4dUkySnNZV05yZTJKaFkydG5jbTkxYm1RdFkyOXNiM0k2Y21kaVlTZzBOU3dnTkRVc0lEUTFMQ0F4S1R0dFlYZ3RhR1ZwWjJoME9qRXdNQ1U3YldGNExYZHBaSFJvT2pVd0pUdDNhV1IwYURvMU1DVTdmVnh1STJ4dloyOHRkM0poY0hCbGNudHdiM05wZEdsdmJqcGhZbk52YkhWMFpUdDBiM0E2TVNVN1pHbHpjR3hoZVRwbWJHVjRPM2RwWkhSb09qVXdKVHQ5WEc0amJHOW5ieTFtWVdObGUzQnZjMmwwYVc5dU9tRmljMjlzZFhSbE8yeGxablE2T1RJbE8zMWNiaU5zYjJkdkxXbHVjM1I3Y0c5emFYUnBiMjQ2WVdKemIyeDFkR1U3YkdWbWREb3hKVHQ5WEc0allYSjBhWE4wTFhScGRHeGxlM0J2YzJsMGFXOXVPbUZpYzI5c2RYUmxPM1J2Y0RvNU1pVTdiR1ZtZERveEpUdG1iMjUwTFhOcGVtVTZNVFJ3ZUR0bWIyNTBMV1poYldsc2VUb25VbTlpYjNSdkp5d2djMkZ1Y3kxelpYSnBaanRtYjI1MExYZGxhV2RvZERvNE1EQTdZMjlzYjNJNmNtZGlZU2d5TlRVc0lESTFOU3dnTWpVMUxDQXhLVHQ5WEc0amRHVjRkQzEzY21Gd2NHVnlMV0pzWVdOcmUzQnZjMmwwYVc5dU9tRmljMjlzZFhSbE8yUnBjM0JzWVhrNlpteGxlRHR0WVhndGFHVnBaMmgwT2pJMUpUdHdiM05wZEdsdmJqcHlaV3hoZEdsMlpUdHRZWGd0ZDJsa2RHZzZNell3Y0hnN2RHOXdPak0zSlR0c1pXWjBPakkxSlR0OVhHNGpkR1Y0ZEMxc1pXWjBMV0pzWVdOckxDQWpkR1Y0ZEMxeWFXZG9kQzFpYkdGamEzdGpiMnh2Y2pwM2FHbDBaVHRtYjI1MExXWmhiV2xzZVRvblVtOWliM1J2Snl3Z2MyRnVjeTF6WlhKcFpqdG1iMjUwTFhOcGVtVTZNekJ3ZUR0OVhHNGpkR1Y0ZEMxc1pXWjBMV0pzWVdOcmUzUmxlSFF0WVd4cFoyNDZjbWxuYUhRN2QybHNiQzFqYUdGdVoyVTZJR1p2Ym5RdGMybDZaVHR0WVhKbmFXNHRjbWxuYUhRNk1UQndlRHR3WVdSa2FXNW5MWEpwWjJoME9qTXdjSGc3YjNabGNtWnNiM2M2WVhWMGJ6dDNhV1IwYURvMU1DVTdZbTl5WkdWeUxYSnBaMmgwT2pGd2VDQnpiMnhwWkNCM2FHbDBaVHQwY21GdWMybDBhVzl1TFhCeWIzQmxjblI1T21admJuUXRjMmw2WlR0MGNtRnVjMmwwYVc5dUxXUjFjbUYwYVc5dU9qRnpPM1J5WVc1emFYUnBiMjR0ZEdsdGFXNW5MV1oxYm1OMGFXOXVPbVZoYzJVdGIzVjBPMzFjYmlOMFpYaDBMWEpwWjJoMExXSnNZV05yZTNSbGVIUXRZV3hwWjI0NmJHVm1kRHQzYVd4c0xXTm9ZVzVuWlRvZ1ptOXVkQzF6YVhwbE8yMWhjbWRwYmkxc1pXWjBPakV3Y0hnN2IzWmxjbVpzYjNjNllYVjBienQzYVdSMGFEbzFNQ1U3ZEhKaGJuTnBkR2x2Ymkxd2NtOXdaWEowZVRwbWIyNTBMWE5wZW1VN2RISmhibk5wZEdsdmJpMWtkWEpoZEdsdmJqb3hjenQwY21GdWMybDBhVzl1TFhScGJXbHVaeTFtZFc1amRHbHZianBsWVhObExXbHVPMzFjYmlOc1lYTjBibUZ0Wlh0d2IzTnBkR2x2YmpwaFluTnZiSFYwWlR0MGIzQTZPRE1sTzJ4bFpuUTZORE1sTzNkcGJHd3RZMmhoYm1kbE9pQjBjbUZ1YzJadmNtMDdZMjlzYjNJNmQyaHBkR1U3Wm05dWRDMXphWHBsT2pNMmNIZzdkMmxrZEdnNk1UVXdjSGc3YUdWcFoyaDBPalF3Y0hnN1ptOXVkQzFtWVcxcGJIazZKMUp2WW05MGJ5Y3NJSE5oYm5NdGMyVnlhV1k3ZEhKaGJuTm1iM0p0T25KdmRHRjBaU2d0T1RCa1pXY3BPMlp2Ym5RdGQyVnBaMmgwT2pNd01EdDlYRzRqZDJocGRHVjdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqcDNhR2wwWlR0dFlYZ3RkMmxrZEdnNk9EQXdjSGc3ZDJsc2JDMWphR0Z1WjJVNklIZHBaSFJvTENCb1pXbG5hSFE3YldGNExXaGxhV2RvZERwaGRYUnZPM2RwWkhSb09qVXdKVHRoYm1sdFlYUnBiMjR0WkhWeVlYUnBiMjQ2TTNNN1lXNXBiV0YwYVc5dUxXNWhiV1U2YzJ4cFpHVnBianQ5WEc0amRHVjRkQzEzY21Gd2NHVnlMWGRvYVhSbGUyUnBjM0JzWVhrNlpteGxlRHR3YjNOcGRHbHZianB5Wld4aGRHbDJaVHQwYjNBNk1qVWxPMnhsWm5RNk1qVWxPMlpzWlhndFpHbHlaV04wYVc5dU9tTnZiSFZ0Ymp0dFlYZ3RkMmxrZEdnNk16VXdjSGc3YldGNExXaGxhV2RvZERvME1EQndlRHR2ZG1WeVpteHZkeTEzY21Gd09tSnlaV0ZyTFhkdmNtUTdiM1psY21ac2IzYzZZWFYwYnp0aWIzSmtaWEl0Y21sbmFIUTZNWEI0SUhOdmJHbGtJR0pzWVdOck8zMWNibWd5ZTJadmJuUXRjMmw2WlRvME9IQjRPMlp2Ym5RdFptRnRhV3g1T2lkU2IySnZkRzhuTENCellXNXpMWE5sY21sbU8yWnZiblF0ZDJWcFoyaDBPalV3TUR0M2FXeHNMV05vWVc1blpUb2dZMjlzYjNJN1kyOXNiM0k2Y21kaVlTZzROU3dnT0RVc0lEZzFMQ0F4S1R0dFlYSm5hVzR0WW05MGRHOXRPakJ3ZUR0MGNtRnVjMmwwYVc5dUxYQnliM0JsY25SNU9tTnZiRzl5TzNSeVlXNXphWFJwYjI0dFpIVnlZWFJwYjI0Nk1YTTdkSEpoYm5OcGRHbHZiaTEwYVcxcGJtY3RablZ1WTNScGIyNDZaV0Z6WlMxdmRYUTdmVnh1STJacGNuTjBMWEJoY21GbkxDQWpjMlZqYjI1a0xYQmhjbUZuTENBamRHaHBjbVF0Y0dGeVlXY3NJQ05tYjNKMGFDMXdZWEpoWnl3Z0kyWnBablJvTFhCaGNtRm5MQ0FqYzJsNGRHZ3RjR0Z5WVdkN1ptOXVkQzF6YVhwbE9qRTRjSGc3Wm05dWRDMW1ZVzFwYkhrNkoxSnZZbTkwYnljc0lITmhibk10YzJWeWFXWTdabTl1ZEMxM1pXbG5hSFE2TXpBd08yTnZiRzl5T25KblltRW9ORFVzSURRMUxDQTBOU3dnTVNrN2JXRnlaMmx1TFdKdmRIUnZiVG93Y0hnN2NHRmtaR2x1WnkxeWFXZG9kRG94TUhCNE8zZHBiR3d0WTJoaGJtZGxPaUJtYjI1MExYTnBlbVU3ZEhKaGJuTnBkR2x2Ymkxd2NtOXdaWEowZVRwbWIyNTBMWE5wZW1VN2RISmhibk5wZEdsdmJpMWtkWEpoZEdsdmJqb3hjenQwY21GdWMybDBhVzl1TFhScGJXbHVaeTFtZFc1amRHbHZianBsWVhObExXbHVPMzFjYmlOdVlXMWxlM0J2YzJsMGFXOXVPbkpsYkdGMGFYWmxPMkp2ZEhSdmJUbzFNQ1U3Y21sbmFIUTZORGNsTzJadmJuUXRjMmw2WlRvek5uQjRPM2RwYkd3dFkyaGhibWRsT2lCMGNtRnVjMlp2Y20wN1kyOXNiM0k2Y21kaVlTZzROU3dnT0RVc0lEZzFMQ0F4S1R0MGNtRnVjMlp2Y20wNmNtOTBZWFJsS0Rrd1pHVm5LVHRtYjI1MExXWmhiV2xzZVRvblVtOWliM1J2Snl3Z2MyRnVjeTF6WlhKcFpqdG1iMjUwTFhkbGFXZG9kRG96TURBN2ZWeHVJM0JvYjNSdkxYSnBaMmgwZTNCdmMybDBhVzl1T25KbGJHRjBhWFpsTzJ4bFpuUTZOamdsTzJKdmRIUnZiVG90TlRCd2VEdDlYRzRqWW5WMGRHOXVlMlpzYjJGME9uSnBaMmgwTzNCdmMybDBhVzl1T25KbGJHRjBhWFpsTzNSdmNEbzFKVHR0WVhKbmFXNDZNSEI0SURNd2NIZ2dPREJ3ZUNBd2NIZzdkMmxrZEdnNk1UQXdjSGc3YUdWcFoyaDBPakV3TUhCNE8yWnZiblE2TVROd2VDOHhNREJ3ZUNBblVtOWliM1J2Snl3Z2MyRnVjeTF6WlhKcFpqdDBaWGgwTFhSeVlXNXpabTl5YlRwMWNIQmxjbU5oYzJVN2JHVjBkR1Z5TFhOd1lXTnBibWM2TVhCNE8yTnZiRzl5T21Kc1lXTnJPM1JsZUhRdFlXeHBaMjQ2WTJWdWRHVnlPMkpoWTJ0bmNtOTFibVE2Y21kaVlTZ3lOVFVzSURJMU5Td2dNalUxTENBd0xqWXBPMkp2Y21SbGNpMXlZV1JwZFhNNk5UQWxPMkZ1YVcxaGRHbHZianB6YUdGa2IzY3RjSFZzYzJVZ00zTWdhVzVtYVc1cGRHVTdZVzVwYldGMGFXOXVMV1JsYkdGNU9qSnpPMzFjYmlOamJHOXpaUzFpZFhSMGIyNTdjRzl6YVhScGIyNDZZV0p6YjJ4MWRHVTdiR1ZtZERvNU1DVTdkRzl3T2pVbE8yMWhjbWRwYmpvd2NIZ2dNekJ3ZUNBNE1IQjRJREJ3ZUR0M2FXUjBhRG94TURCd2VEdG9aV2xuYUhRNk1UQXdjSGc3Wm05dWREb3lNSEI0THpFd01IQjRJQ2RTYjJKdmRHOG5MQ0J6WVc1ekxYTmxjbWxtTzNSbGVIUXRkSEpoYm5ObWIzSnRPblZ3Y0dWeVkyRnpaVHRzWlhSMFpYSXRjM0JoWTJsdVp6b3hjSGc3WTI5c2IzSTZkMmhwZEdVN2RHVjRkQzFoYkdsbmJqcGpaVzUwWlhJN1ltRmphMmR5YjNWdVpEcHlaMkpoS0RRMUxDQTBOU3dnTkRVc0lERXBPMkp2Y21SbGNpMXlZV1JwZFhNNk5UQWxPMkZ1YVcxaGRHbHZianB6YUdGa2IzY3RkMmhwZEdVZ00zTWdhVzVtYVc1cGRHVTdZVzVwYldGMGFXOXVMV1JsYkdGNU9qSnpPM290YVc1a1pYZzZPVGs1T1RrN2ZWeHVJMmRoYkd4bGNubDdjRzl6YVhScGIyNDZZV0p6YjJ4MWRHVTdaR2x6Y0d4aGVUcHViMjVsTzIxaGVDMTNhV1IwYURveE1qQWxPM2RwWkhSb09qRXdNQ1U3YUdWcFoyaDBPakV4TUNVN2JXRjRMV2hsYVdkb2REb3hNVEFsTzJKaFkydG5jbTkxYm1RdFkyOXNiM0k2Y21kaVlTZ3lOU3dnTWpVc0lESTFMQ0F3TGprcE8zb3RhVzVrWlhnNk9UazVPVGs3ZlZ4dUkyZGhiR3hsY25rdGQzSmhjSEJsY250M2FXUjBhRG8zTUNVN2QybHNiQzFqYUdGdVoyVTZJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTdkSEpoYm5OcGRHbHZianBpWVdOclozSnZkVzVrTFdOdmJHOXlPM1J5WVc1emFYUnBiMjR0ZEdsdGFXNW5MV1oxYm1OMGFXOXVPbVZoYzJVdGFXNDdkSEpoYm5OcGRHbHZiaTFrZFhKaGRHbHZiam95Y3p0dFlYSm5hVzQ2WVhWMGJ6dGliM0prWlhJdGNtRmthWFZ6T2pFeWNIZzdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqcHlaMkpoS0RRMUxDQTBOU3dnTkRVc0lEQXVPQ2s3Y0c5emFYUnBiMjQ2Y21Wc1lYUnBkbVU3YUdWcFoyaDBPamN3SlR0dFlYZ3RhR1ZwWjJoME9qRXdNQ1U3YjNabGNtWnNiM2M2YUdsa1pHVnVPMjkyWlhKbWJHOTNMWGc2WVhWMGJ6dDlYRzRqWjJGc2JHVnllUzFvWldGa1pYSXRkM0poY0hCbGNudGthWE53YkdGNU9tWnNaWGc3YW5WemRHbG1lUzFqYjI1MFpXNTBPbk53WVdObExXRnliM1Z1WkR0d2IzTnBkR2x2YmpwbWFYaGxaRHQzYVdSMGFEbzNNQ1U3WW05eVpHVnlMWEpoWkdsMWN6b3hNbkI0TzJobGFXZG9kRHBoZFhSdk8ySnZjbVJsY2kxaWIzUjBiMjA2Y21kaVlTZzFOU3dnTlRVc0lEVTFMQ0F4S1R0aVlXTnJaM0p2ZFc1a0xXTnZiRzl5T25KblltRW9ORFVzSURRMUxDQTBOU3dnTVNrN2JXRjRMV2hsYVdkb2REb3lNQ1U3ZWkxcGJtUmxlRG81T1RrNU9EdDlYRzVvTTN0bWIyNTBMWE5wZW1VNk16WndlRHQzYVd4c0xXTm9ZVzVuWlRvZ1kyOXNiM0k3Wm05dWRDMW1ZVzFwYkhrNkoxSnZZbTkwYnljc0lITmhibk10YzJWeWFXWTdabTl1ZEMxM1pXbG5hSFE2TlRBd08yWnZiblF0YzNSNWJHVTZhWFJoYkdsak8ySnZkSFJ2YlRveE1DVTdjRzl6YVhScGIyNDZjbVZzWVhScGRtVTdaR2x6Y0d4aGVUcG1iR1Y0TzJOdmJHOXlPbmRvYVhSbE8zUnlZVzV6YVhScGIyNDZZMjlzYjNJN2RISmhibk5wZEdsdmJpMWtkWEpoZEdsdmJqb3hjenQwY21GdWMybDBhVzl1TFhScGJXbHVaeTFtZFc1amRHbHZianBsWVhObExXOTFkRHQ5WEc0dWMyVnNaV04wTFdKc2IyTnJlMk52Ykc5eU9uSm5ZaWc0TlN3Z09EVXNJRGcxS1R0OVhHNGpaM0poY0docFkzTXRZbXh2WTJ0N1pHbHpjR3hoZVRwbWJHVjRPM0J2YzJsMGFXOXVPbkpsYkdGMGFYWmxPMnAxYzNScFpua3RZMjl1ZEdWdWREcHpjR0ZqWlMxaVpYUjNaV1Z1TzNkcFpIUm9PakV3TUNVN2ZWeHVJMkZ5ZEMxaWJHOWphM3RrYVhOd2JHRjVPbTV2Ym1VN2FuVnpkR2xtZVMxamIyNTBaVzUwT25Od1lXTmxMV0psZEhkbFpXNDdmVnh1Wm1sbmRYSmxlMlJwYzNCc1lYazZabXhsZUR0dFlYSm5hVzQ2TWpNbElEQWdNakFsSURFd0pUdDlYRzRqYVcxaFoyVTZhRzkyWlhKN1ltOTRMWE5vWVdSdmR6bzBjSGdnT1hCNElEbHdlQ0F4Y0hnZ2NtZGlZU2d3TENBd0xDQXdMQ0F3TGpZcE8zUnlZVzV6Wm05eWJUcHpZMkZzWlNneExqZ3NJREV1T0NrN2ZWeHVJMmRoYkd4bGNua3RkM0poY0hCbGNqcG9iM1psY250aVlXTnJaM0p2ZFc1a0xXTnZiRzl5T25KblltRW9PVEFzSURrd0xDQTVNQ3dnTUM0NEtUdDlYRzVvTXpwb2IzWmxjbnRpYjNKa1pYSXRZbTkwZEc5dE9qRndlQ0J6YjJ4cFpDQnlaMkpoS0RnMUxDQTROU3dnT0RVc0lERXBPMk52Ykc5eU9uSm5ZaWc0TlN3Z09EVXNJRGcxS1R0OVhHNGpabWx5YzNRdGNHRnlZV2M2YUc5MlpYSXNJQ056WldOdmJtUXRjR0Z5WVdjNmFHOTJaWElzSUNOMGFHbHlaQzF3WVhKaFp6cG9iM1psY2l3Z0kyWnZjblJvTFhCaGNtRm5PbWh2ZG1WeUxDQWpabWxtZEdndGNHRnlZV2M2YUc5MlpYSXNJQ056YVhoMGFDMXdZWEpoWnpwb2IzWmxjaXdnSTNSbGVIUXRiR1ZtZEMxaWJHRmphenBvYjNabGNpd2dJM1JsZUhRdGNtbG5hSFF0WW14aFkyczZhRzkyWlhKN1ptOXVkQzF6YVhwbE9qSTBjSGc3ZlZ4dUkzUmxlSFF0ZDNKaGNIQmxjaTEzYUdsMFpTd2dJM1JsZUhRdGQzSmhjSEJsY2kxaWJHRmphM3RoYm1sdFlYUnBiMjR0WkhWeVlYUnBiMjQ2TTNNN1lXNXBiV0YwYVc5dUxXNWhiV1U2YzJ4cFpHVnBianQ5WEc0amJHRnpkRzVoYldVc0lDTnVZVzFsZTNSeVlXNXphWFJwYjI0Nk5ITXNJREp6TENBeWN6dDlYRzRqYkdGemRHNWhiV1U2YUc5MlpYSjdZMjlzYjNJNmNtZGlLREkxTENBeU5Td2dNalVwTzMxY2JpTnVZVzFsT21odmRtVnllMk52Ykc5eU9uSm5ZaWd4TnpVc0lERTNOU3dnTVRjMUtUdDlYRzR1Y205MFlYUmxPVEI3TFhkbFltdHBkQzEwY21GdWMyWnZjbTA2Y205MFlYUmxLRGt3WkdWbktUc3RiVzk2TFhSeVlXNXpabTl5YlRweWIzUmhkR1VvT1RCa1pXY3BPeTF2TFhSeVlXNXpabTl5YlRweWIzUmhkR1VvT1RCa1pXY3BPeTF0Y3kxMGNtRnVjMlp2Y20wNmNtOTBZWFJsS0Rrd1pHVm5LVHQ5WEc1QWEyVjVabkpoYldWeklITnNhV1JsYVc1N1puSnZiWHR0WVhKbmFXNHRiR1ZtZERveE1DVTdkMmxrZEdnNk1UQXdKVHQ5WEc1MGIzdHRZWEpuYVc0dGJHVm1kRG93SlR0M2FXUjBhRG8xTUNVN2ZWeHVmVnh1UUd0bGVXWnlZVzFsY3lCemFHRmtiM2N0Y0hWc2MyVjdNQ1Y3WW05NExYTm9ZV1J2ZHpvd0lEQWdNQ0F3Y0hnZ2NtZGlZU2d5TlRVc0lESTFOU3dnTWpVMUxDQXdMallwTzMxY2JqSTFKWHRpYjNndGMyaGhaRzkzT2pBZ01DQXdJREV3Y0hnZ2NtZGlZU2cwTUN3Z01UWTFMQ0EzTlN3Z01DNDFLVHQ5WEc0MU1DVjdZbTk0TFhOb1lXUnZkem93SURBZ01DQXhOWEI0SUhKblltRW9OREFzSURFeU55d2dNVFkxTENBd0xqUXBPMzFjYmpjMUpYdGliM2d0YzJoaFpHOTNPakFnTUNBd0lEQndlQ0J5WjJKaEtERTJOU3dnTVRBNExDQTBNQ3dnTUM0eUtUdDlYRzR4TURBbGUySnZlQzF6YUdGa2IzYzZNQ0F3SURBZ016VndlQ0J5WjJKaEtEQXNJREFzSURJMU5Td2dNQ2s3ZlZ4dWZWeHVRR3RsZVdaeVlXMWxjeUJ6YUdGa2IzY3RkMmhwZEdWN01DVjdZbTk0TFhOb1lXUnZkem93SURBZ01DQXdjSGdnY21kaVlTZ3lOVFVzSURJMU5Td2dNalUxTENBd0xqWXBPMzFjYmpFd01DVjdZbTk0TFhOb1lXUnZkem93SURBZ01DQXpOWEI0SUhKblltRW9NQ3dnTUN3Z01Dd2dNQ2s3ZlZ4dWZTSmRmUT09ICovXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiaW1wb3J0IGNsb3NlR2FsbGVyeSBmcm9tICcuL3NjcmlwdC9jbG9zZUdhbGxlcnkuanMnO1xuaW1wb3J0IG9wZW5HYWxsZXJ5IGZyb20gJy4vc2NyaXB0L29wZW5HYWxsZXJ5LmpzJztcbmltcG9ydCBwaWNrZXJXaGVlbCBmcm9tICcuL3NjcmlwdC9waWNrZXJXaGVlbC5qcyc7XG5pbXBvcnQgaW1hZ2VQaWNrZXIgZnJvbSAnLi9zY3JpcHQvaW1hZ2VQaWNrZXIuanMnO1xuaW1wb3J0IGNzcyBmcm9tICcuL3N0eWxlL3N0eWxlLmNzcyc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNsb3NlR2FsbGVyeSgpO1xuICBvcGVuR2FsbGVyeSgpO1xuICBwaWNrZXJXaGVlbCgpO1xuICAvL2ltYWdlUGlja2VyKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9zZUdhbGxlcnkgKCkge1xuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnR2FsbGVyeS1CdXR0b25fY2xvc2VkJylbMF07XG5cdGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0dhbGxlcnknKVswXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbWFnZVBpY2tlciAoKSB7XG4gIGxldCBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltYWdlXCIpWzBdO1xuICBsZXQgYXR0ID0gZG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gIGF0dC52YWx1ZSA9IFwiaW1hZ2VcIjtcbiAgaW1nLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaW1nLnNldEF0dHJpYnV0ZU5vZGUoYXR0KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3BlbkdhbGxlcnkgKCkge1xuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnQnV0dG9uX29wZW5lZCcpWzBdO1xuXHRidXR0b24ub25jbGljayA9ICgpID0+IHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdHYWxsZXJ5JylbMF0uc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGlja2VyV2hlZWwgKCkge1xuXHRsZXQgYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnTmF2LUl0ZW1BcnQnKVswXSxcblx0XHRvaWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdOYXYtSXRlbU9pbCcpWzBdLFxuXHRcdGdyYXBoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnTmF2LUl0ZW1HcmFwaGljcycpWzBdO1xuXHRcdGdyYXBoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2VsZWN0LWJsb2NrXCIpXG5cdGFydC5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0dhbGxlcnlXcmFwcGVyLUl0ZW1HcmFwaGljcycpWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnR2FsbGVyeVdyYXBwZXItSXRlbUFydCcpWzBdLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdFx0Z3JhcGgucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtYmxvY2tcIik7XG5cdFx0YXJ0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2VsZWN0LWJsb2NrXCIpO1xuXHR9XG5cdGdyYXBoLm9uY2xpY2sgPSAoKSA9PiB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnR2FsbGVyeVdyYXBwZXItSXRlbUdyYXBoaWNzJylbMF0uc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdHYWxsZXJ5V3JhcHBlci1JdGVtQXJ0JylbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRncmFwaC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1ibG9ja1wiKVxuXHRcdGFydC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1ibG9ja1wiKTtcblx0fVxufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==