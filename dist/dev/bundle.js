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
/******/ 	var hotCurrentHash = "ebd3dbfedd0583a8b186";
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
exports.push([module.i, "\nbody{\n\tdisplay:flex;\n}\nhtml, body {\n\tmargin:0;\n\toverflow:hidden;\n\tpadding:0;\n}\nmain {\n\tdisplay: flex;\n\tposition: absolute;\n\topacity: 0.9;\n\twidth: 100%;\n\tz-index: 99998;\n\tjustify-content: space-evenly;\n\theight: 100%;\n\tflex-flow: row wrap\n}\n.Gallery-SocialMedia_wrapper {\n\tmargin: 0 1vh;\n\tdisplay: flex;\n\tflex-flow: column;\n\talign-self: center;\n}\n\n.feature {\n\t display: flex;\n\t min-width: 40vmin;\n\t max-height: 70vmin;\n\t position: absolute;\n\t top: 20vh;\n\t left: 18vh;\n}\n.Gallery-SliderPreview_wrapper {\n\tposition: absolute;\n\tdisplay: flex;\n\tbackground-color: rgba(15, 15, 15, 1);\n\tmin-height: 13vmin;\n\ttop: 85vmin;\n\tborder-radius: 1vh;\n\tleft: 18vmin;\n\talign-items: center;\n\twidth: 100%;\n}\n.Gallery-SliderPreview {\n\tposition: relative;\n\tdisplay: flex;\n\tbackground-color: rgba(115, 115, 115, 0.8);\n\tmax-width: 90vmin;\n\tborder-radius: 1vh;\n\tbox-sizing: border-box;\n\toverflow-x: scroll;\n\toverflow-y: hidden;\n\talign-content: center;\n\tmargin-left: 5vh;\n}\n\n.featured-item {\n\tmin-height: 30vmin;\n\tbackground-position: center top;\n\tmin-width: 40vmin;\n\tbackground-size: 100%;\n}\n\n.xy-center {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n.transition {\n\ttransition: all 350ms ease-in-out;\n}\n\n.r-3-2 {\n\twidth: 100%;\n\tpadding-bottom: 66.667%;\n}\n\n.image-holder {\n\tbackground-repeat: no-repeat;\n\tbackground-size: 100%;\n}\n\n.item-wrapper {\n\tcursor: pointer;\n\twidth: 100%; /* arbitrary value */\n\tdisplay: flex;\n\tmargin: 0 2vh;\n\tflex-flow: column;\n}\n\n.gallery-item { opacity: 0.5; }\n.gallery-item.active { opacity: 1; }\n\n.AdjustPosition-Button_wrapper {\n    display: flex;\n    flex-direction: row-reverse;\n}\n.MainGroup-AboutInfo_wrapper {\n\tdisplay: flex;\n\tmax-height: 50%;\n\tmin-width: 15%;\n\tmax-width: 100%;\n\tflex-flow: row wrap;\n\tjustify-content: space-between;\n\twidth: 130vh;\n\tmargin-top: -15vh;\n}\n.BodyDivisor_black {\n\tbackground-color:rgba(45, 45, 45, 1);\n\twidth: 50%;\n\theight: 1000px;\n\tdisplay: flex;\n}\n.Nav-SocialMedia_wrapper {\n\tdisplay:flex;\n\twidth:100%;\n\theight: 3em;\n\tjustify-content: space-around;\n}\n.BodyDivisorBlack-TextItem_title {\n\tposition:absolute;\n\ttop:92%;\n\tleft:1%;\n\tfont-size:14px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:800;\n\tcolor:rgba(45, 45, 45, 1);\n\tcursor: text;\n\tbackground-color: rgba(78, 178, 78, 1);\n}\n.AboutInfo-ArticleBlackSide_wrapper {\n\tdisplay: flex;\n\tmax-height: 25vh;\n\tposition: relative;\n\tmax-width: 50vmin;\n\talign-self: center;\n}\n.ArticleBlackSide-TextItem_left, .ArticleBlackSide-TextItem_right {\n\tcolor:white;\n\tfont-family:'Roboto', sans-serif;\n\tfont-size:1.7em;\n}\n.ArticleBlackSide-TextItem_left {\n\ttext-align:right;\n\tmargin-right:10px;\n\tpadding-right:25px;\n\toverflow:auto;\n\twidth:50%;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n}\n.ArticleBlackSide-TextItem_right {\n\ttext-align:left;\n\tmargin-left:10px;\n\toverflow:auto;\n\twidth:50%;\n}\n.InitialsLogo-Name {\n\tposition: relative;\n\tfont-size: 2.5em;\n\tcolor: rgba(45, 45, 45, 1);\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tbackground-color: rgba(78, 178, 78, 1);\n\theight: 1em;\n\tmargin: 0;\n\tcursor: default;\n}\n.InitialsLogo-Surname {\n\tcolor: white;\n\tbackground-color: rgba(78, 178, 78, 1);\n\tfont-size: 2.5em;\n\theight: 1em;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight: 300;\n\tposition: relative;\n\tmargin: 0;\n\tleft: 30%;\n\twidth: -moz-fit-content;\n\tmargin-top: 1%;\n\tcursor: default;\n}\n.BodyDivisor_white {\n\tbackground-color:white;\n\t-webkit-animation-duration:3s;\n\tanimation-duration:3s;\n\t-webkit-animation-name:slidein;\n\tanimation-name:slidein;\n\twidth: 50%;\n\tdisplay: flex;\n}\n.AboutInfo-ArticleWhiteSide_wrapper {\n\tdisplay:flex;\n\tposition:relative;\n\tflex-direction:column;\n\tmax-width:45vh;\n\tmax-height:50vh;\n\toverflow-wrap:break-word;\n\toverflow:auto;\n\tborder-right:1px solid rgba(78, 178, 78, 1);\n\tmargin-left: 10vh;\n}\nh2 {\n\tfont-size:44px;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:500;\n\twill-change: color;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:2%;\n\ttransition-property:color;\n\ttransition-duration:1s;\n\ttransition-timing-function:ease-out;\n}\np {\n\tfont-size:1.5em;\n\tfont-family:'Roboto', sans-serif;\n\tfont-weight:300;\n\tcolor:rgba(45, 45, 45, 1);\n\tmargin-bottom:0px;\n\tpadding-right:10px;\n}\n.BodyDivisorWhite-PhotoItem_wrapper {\n\tposition: absolute;\n\ttop: 85%;\n\tmargin-left: 80vmin;\n\tz-index: 99998;\n\ttransition: all 2s 200ms cubic-bezier(0.86, 0, 0.07, 1);\n}\n.BodyDivisorWhite-PhotoItem_wrapper:hover {\n\ttransform: translateY(-60px);\n}\nimg {\n\tmax-width: 100%;\n\theight: auto;\n}\n.Button_opened {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:13px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:black;\n\ttext-align:center;\n\tbackground:rgba(255, 255, 255, 0.6);\n\tborder-radius:50%;\n\t-webkit-animation:shadow-pulse 3s infinite;\n\tanimation:shadow-pulse 3s infinite;\n\t-webkit-animation-delay:2s;\n\tanimation-delay:2s;\n\ttransition: all 5s cubic-bezier(0.785, 0.135, 0.15, 0.86);\n\tcursor: pointer;\n}\n.Button_opened:hover {\n\tbackground-color: rgba(40, 127, 165, 0.4);\n}\n.Gallery-Button_closed {\n\tposition:relative;\n\twidth:100px;\n\theight:100px;\n\tfont:20px/100px 'Roboto', sans-serif;\n\ttext-transform:uppercase;\n\tletter-spacing:1px;\n\tcolor:white;\n\ttext-align:center;\n\tbackground:rgba(25, 25, 25, 1);\n\tborder-radius:50%;\n\t-webkit-animation:shadow-white 3s infinite;\n\tanimation:shadow-white 3s infinite;\n\t-webkit-animation-delay:2s;\n\tanimation-delay:2s;\n\tcursor: pointer;\n\tmargin-right: 50vmin;\n\talign-self: center;\n}\n.Gallery {\n\tposition:absolute;\n\tdisplay:none;\n\twidth: 125vmax;\n\tbackground-color:rgba(25, 25, 25, 1);\n\tz-index:99999;\n}\n.InitialsLogo-Surname, .InitialsLogo-Name {\n\ttransition:4s, 2s, 2s;\n}\n.InitialsLogo-Surname:hover {\n\tcolor:rgba(45, 45, 45, 1);\n}\n.InitialsLogo-Name:hover {\n\tcolor:white;\n}\n@-webkit-keyframes slidein\n{\n\tfrom\n\t{margin-left:40%;\n\twidth:100%;}\n\tto\n\t{margin-left:0%;\n\twidth:50%;}\n}\n@-webkit-keyframes shadow-pulse{0%{box-shadow:0 0 0 0px rgba(255, 255, 255, 0.6);}\n25%{box-shadow:0 0 0 10px rgba(40, 165, 75, 0.5);}\n50%{box-shadow:0 0 0 15px rgba(40, 127, 165, 0.4);}\n75%{box-shadow:0 0 0 0px rgba(165, 108, 40, 0.2);}\n100%{box-shadow:0 0 0 35px rgba(0, 0, 255, 0);}\n}\n@-webkit-keyframes shadow-white{0%{box-shadow:0 0 0 0px rgba(255, 255, 255, 0.6);}\n100%{box-shadow:0 0 0 35px rgba(0, 0, 0, 0);}\n}\n@media screen and (max-width: 768px) {\n   .lastname, .name, .photo-right,.text-wrapper-black, .text-wrapper-white {\n    display: flex;\n  }\n  body {\n    overflow-x: hidden;\n    overflow-y: auto;\n    width: 100%;\n    height: auto;\n    margin-bottom: 0;\n    padding-bottom: 0;\n  }\n  .BodyDivisor_white, .BodyDivisor_black {\n    min-height: 768px;\n    max-height: auto;\n  }\n\n  .Nav-SocialMedia_wrapper {\n    width: 20%;\n    right: 43%;\n    top: 91%;\n    height: 7%;\n    position: absolute;\n  }\n  .Button_opened {\n    top: 6%;\n    position: absolute;\n    left: 77%;\n  }\n  .AboutInfo-ArticleBlackSide_wrapper {\n    position: absolute;\n    display: flex;\n    justify-content: space-around;\n    flex-flow: row wrap;\n    max-width: 40%;\n    min-width: 20%;\n    top: 37%;\n    left: 2em;\n    min-height: 20%;\n    max-height: 30%;\n    overflow: auto;\n\n  }\n  .ArticleBlackSide-TextItem_left {\n    border-left: 1px solid rgba(78, 178, 78, 1);\n    border-right: 0;\n    display: flex;\n    text-align: left;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    width: 70%;\n    padding-left: 5%;\n    padding-bottom: 5%;\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_right {\n    display: flex;\n    width: 70%;\n    text-align: right;\n    font-size: 36px;\n    color: rgba(148, 148, 148, 1);\n    padding-top: 10%;\n    padding-right: 5%;\n    border-right: 1px solid rgba(178, 178, 78, 1);\n    transition-duration: 2s;\n    transition-property: color;\n    transition-timing-function: ease-out;\n  }\n  .ArticleBlackSide-TextItem_left:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n  .ArticleBlackSide-TextItem_right:hover {\n    font-size: 36px;\n    color: rgba(78, 78, 78, 1);\n  }\n\n  .AboutInfo-ArticleWhiteSide_wrapper {\n    position: absolute;\n    border-right: 1px solid rgba(78, 178, 78, 1);\n    left: 58%;\n    top: 30%;\n    min-width: 20%;\n    max-width: 35%;\n    min-height: 20%;\n    max-height: 40%;\n    display: flex;\n  }\n  h2 {\n  \tfont-size: 46px;\n  }\n  h2:hover {\n    font-size: 46px;\n  }\n  p {\n    font-size: 24px;\n  }\n  p:hover {\n    font-size: 24px;\n  }\n  .BioSection-SectionHeader_first {\n    margin-top: 0;\n  }\n  .InitialsLogo-Surname, .InitialsLogo-Name {\n    display: flex;\n    font-size: 40px;\n    position: absolute;\n  }\n  .InitialsLogo-Name {\n    max-width: 30%;\n    min-width: 30%;\n    color: rgba(55, 55, 55, 1);\n    top: -1%;\n    right: 68%;\n    transform: rotate(0deg);\n    background-color: rgba(78, 178, 78, 1);\n    max-height: 5%;\n  }\n  .InitialsLogo-Surname {\n    max-width: 30%;\n    min-width: 30%;\n    left: 15%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n    transform: rotate(0deg);\n    top: 5%;\n  }\n  .BodyDivisorWhite-PhotoItem_wrapper {\n    position: absolute;\n    width: 200px;\n  }\n  .BodyDivisorBlack-TextItem_title {\n    position: absolute;\n    display: flex;\n    left: 7%;\n    color: rgba(55, 55, 55, 1);\n    background-color: rgba(78, 178, 78, 1);\n  }\n  path {\n    fill: rgba(78, 178, 178, 1);\n  }\n  path:hover {\n    fill: rgba(78, 178, 78, 1);\n  }\n  .Gallery-Button_closed {\n    position: absolute;\n    left: 80%;\n    top: 7%;\n  }\n}\n/*. sourceMappingURL=data:application/json;base64,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aHQ6MTAwJTt9XG5odG1sLCBib2R5e21hcmdpbjowO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7fVxuI2JsYWNre2JhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTttYXgtaGVpZ2h0OjEwMCU7bWF4LXdpZHRoOjUwJTt3aWR0aDo1MCU7fVxuI2xvZ28td3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MSU7ZGlzcGxheTpmbGV4O3dpZHRoOjUwJTt9XG4jbG9nby1mYWNle3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6OTIlO31cbiNsb2dvLWluc3R7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxJTt9XG4jYXJ0aXN0LXRpdGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo5MiU7bGVmdDoxJTtmb250LXNpemU6MTRweDtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Y29sb3I6cmdiYSgyNTUsIDI1NSwgMjU1LCAxKTt9XG4jdGV4dC13cmFwcGVyLWJsYWNre3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6ZmxleDttYXgtaGVpZ2h0OjI1JTtwb3NpdGlvbjpyZWxhdGl2ZTttYXgtd2lkdGg6MzYwcHg7dG9wOjM3JTtsZWZ0OjI1JTt9XG4jdGV4dC1sZWZ0LWJsYWNrLCAjdGV4dC1yaWdodC1ibGFja3tjb2xvcjp3aGl0ZTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXNpemU6MzBweDt9XG4jdGV4dC1sZWZ0LWJsYWNre3RleHQtYWxpZ246cmlnaHQ7d2lsbC1jaGFuZ2U6IGZvbnQtc2l6ZTttYXJnaW4tcmlnaHQ6MTBweDtwYWRkaW5nLXJpZ2h0OjMwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCB3aGl0ZTt0cmFuc2l0aW9uLXByb3BlcnR5OmZvbnQtc2l6ZTt0cmFuc2l0aW9uLWR1cmF0aW9uOjFzO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O31cbiN0ZXh0LXJpZ2h0LWJsYWNre3RleHQtYWxpZ246bGVmdDt3aWxsLWNoYW5nZTogZm9udC1zaXplO21hcmdpbi1sZWZ0OjEwcHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDo1MCU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNsYXN0bmFtZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6ODMlO2xlZnQ6NDMlO3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6d2hpdGU7Zm9udC1zaXplOjM2cHg7d2lkdGg6MTUwcHg7aGVpZ2h0OjQwcHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7dHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpO2ZvbnQtd2VpZ2h0OjMwMDt9XG4jd2hpdGV7YmFja2dyb3VuZC1jb2xvcjp3aGl0ZTttYXgtd2lkdGg6ODAwcHg7d2lsbC1jaGFuZ2U6IHdpZHRoLCBoZWlnaHQ7bWF4LWhlaWdodDphdXRvO3dpZHRoOjUwJTthbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jdGV4dC13cmFwcGVyLXdoaXRle2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MjUlO2xlZnQ6MjUlO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXgtd2lkdGg6MzUwcHg7bWF4LWhlaWdodDo0MDBweDtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmQ7b3ZlcmZsb3c6YXV0bztib3JkZXItcmlnaHQ6MXB4IHNvbGlkIGJsYWNrO31cbmgye2ZvbnQtc2l6ZTo0OHB4O2ZvbnQtZmFtaWx5OidSb2JvdG8nLCBzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjUwMDt3aWxsLWNoYW5nZTogY29sb3I7Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTttYXJnaW4tYm90dG9tOjBweDt0cmFuc2l0aW9uLXByb3BlcnR5OmNvbG9yO3RyYW5zaXRpb24tZHVyYXRpb246MXM7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1vdXQ7fVxuI2ZpcnN0LXBhcmFnLCAjc2Vjb25kLXBhcmFnLCAjdGhpcmQtcGFyYWcsICNmb3J0aC1wYXJhZywgI2ZpZnRoLXBhcmFnLCAjc2l4dGgtcGFyYWd7Zm9udC1zaXplOjE4cHg7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6MzAwO2NvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWFyZ2luLWJvdHRvbTowcHg7cGFkZGluZy1yaWdodDoxMHB4O3dpbGwtY2hhbmdlOiBmb250LXNpemU7dHJhbnNpdGlvbi1wcm9wZXJ0eTpmb250LXNpemU7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluO31cbiNuYW1le3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbTo1MCU7cmlnaHQ6NDclO2ZvbnQtc2l6ZTozNnB4O3dpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Y29sb3I6cmdiYSg4NSwgODUsIDg1LCAxKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKTtmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDozMDA7fVxuI3Bob3RvLXJpZ2h0e3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6NjglO2JvdHRvbTotNTBweDt9XG4jYnV0dG9ue2Zsb2F0OnJpZ2h0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo1JTttYXJnaW46MHB4IDMwcHggODBweCAwcHg7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O2ZvbnQ6MTNweC8xMDBweCAnUm9ib3RvJywgc2Fucy1zZXJpZjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6MXB4O2NvbG9yOmJsYWNrO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6cmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO31cbiNjbG9zZS1idXR0b257cG9zaXRpb246YWJzb2x1dGU7bGVmdDo5MCU7dG9wOjUlO21hcmdpbjowcHggMzBweCA4MHB4IDBweDt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Zm9udDoyMHB4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzoxcHg7Y29sb3I6d2hpdGU7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZDpyZ2JhKDQ1LCA0NSwgNDUsIDEpO2JvcmRlci1yYWRpdXM6NTAlO2FuaW1hdGlvbjpzaGFkb3ctd2hpdGUgM3MgaW5maW5pdGU7YW5pbWF0aW9uLWRlbGF5OjJzO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnl7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO21heC13aWR0aDoxMjAlO3dpZHRoOjEwMCU7aGVpZ2h0OjExMCU7bWF4LWhlaWdodDoxMTAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNSwgMjUsIDI1LCAwLjkpO3otaW5kZXg6OTk5OTk7fVxuI2dhbGxlcnktd3JhcHBlcnt3aWR0aDo3MCU7d2lsbC1jaGFuZ2U6IGJhY2tncm91bmQtY29sb3I7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yO3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2UtaW47dHJhbnNpdGlvbi1kdXJhdGlvbjoyczttYXJnaW46YXV0bztib3JkZXItcmFkaXVzOjEycHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDAuOCk7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjcwJTttYXgtaGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO292ZXJmbG93LXg6YXV0bzt9XG4jZ2FsbGVyeS1oZWFkZXItd3JhcHBlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtwb3NpdGlvbjpmaXhlZDt3aWR0aDo3MCU7Ym9yZGVyLXJhZGl1czoxMnB4O2hlaWdodDphdXRvO2JvcmRlci1ib3R0b206cmdiYSg1NSwgNTUsIDU1LCAxKTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7bWF4LWhlaWdodDoyMCU7ei1pbmRleDo5OTk5ODt9XG5oM3tmb250LXNpemU6MzZweDt3aWxsLWNoYW5nZTogY29sb3I7Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc3R5bGU6aXRhbGljO2JvdHRvbToxMCU7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2NvbG9yOndoaXRlO3RyYW5zaXRpb246Y29sb3I7dHJhbnNpdGlvbi1kdXJhdGlvbjoxczt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLW91dDt9XG4uc2VsZWN0LWJsb2Nre2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZ3JhcGhpY3MtYmxvY2t7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOnJlbGF0aXZlO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3dpZHRoOjEwMCU7fVxuI2FydC1ibG9ja3tkaXNwbGF5Om5vbmU7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47fVxuZmlndXJle2Rpc3BsYXk6ZmxleDttYXJnaW46MjMlIDAgMjAlIDEwJTt9XG4jaW1hZ2U6aG92ZXJ7Ym94LXNoYWRvdzo0cHggOXB4IDlweCAxcHggcmdiYSgwLCAwLCAwLCAwLjYpO3RyYW5zZm9ybTpzY2FsZSgxLjgsIDEuOCk7fVxuI2dhbGxlcnktd3JhcHBlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoOTAsIDkwLCA5MCwgMC44KTt9XG5oMzpob3Zlcntib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDg1LCA4NSwgODUsIDEpO2NvbG9yOnJnYig4NSwgODUsIDg1KTt9XG4jZmlyc3QtcGFyYWc6aG92ZXIsICNzZWNvbmQtcGFyYWc6aG92ZXIsICN0aGlyZC1wYXJhZzpob3ZlciwgI2ZvcnRoLXBhcmFnOmhvdmVyLCAjZmlmdGgtcGFyYWc6aG92ZXIsICNzaXh0aC1wYXJhZzpob3ZlciwgI3RleHQtbGVmdC1ibGFjazpob3ZlciwgI3RleHQtcmlnaHQtYmxhY2s6aG92ZXJ7Zm9udC1zaXplOjI0cHg7fVxuI3RleHQtd3JhcHBlci13aGl0ZSwgI3RleHQtd3JhcHBlci1ibGFja3thbmltYXRpb24tZHVyYXRpb246M3M7YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjt9XG4jbGFzdG5hbWUsICNuYW1le3RyYW5zaXRpb246NHMsIDJzLCAyczt9XG4jbGFzdG5hbWU6aG92ZXJ7Y29sb3I6cmdiKDI1LCAyNSwgMjUpO31cbiNuYW1lOmhvdmVye2NvbG9yOnJnYigxNzUsIDE3NSwgMTc1KTt9XG4ucm90YXRlOTB7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTstbW96LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1vLXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpOy1tcy10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt9XG5Aa2V5ZnJhbWVzIHNsaWRlaW57ZnJvbXttYXJnaW4tbGVmdDoxMCU7d2lkdGg6MTAwJTt9XG50b3ttYXJnaW4tbGVmdDowJTt3aWR0aDo1MCU7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctcHVsc2V7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjI1JXtib3gtc2hhZG93OjAgMCAwIDEwcHggcmdiYSg0MCwgMTY1LCA3NSwgMC41KTt9XG41MCV7Ym94LXNoYWRvdzowIDAgMCAxNXB4IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO31cbjc1JXtib3gtc2hhZG93OjAgMCAwIDBweCByZ2JhKDE2NSwgMTA4LCA0MCwgMC4yKTt9XG4xMDAle2JveC1zaGFkb3c6MCAwIDAgMzVweCByZ2JhKDAsIDAsIDI1NSwgMCk7fVxufVxuQGtleWZyYW1lcyBzaGFkb3ctd2hpdGV7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cbjEwMCV7Ym94LXNoYWRvdzowIDAgMCAzNXB4IHJnYmEoMCwgMCwgMCwgMCk7fVxufSJdfQ== */\n", ""]);

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
  var images = ['../../src/img/big/graphics1.jpg', '../../src/img/big/graphics2.jpg', '../../src/img/big/graphics3.jpg', '../../src/img/big/graphics4.jpg', '../../src/img/big/graphics5.jpg', '../../src/img/big/graphics6.jpg', '../../src/img/big/graphics7.jpg', '../../src/img/big/graphics8.jpg', '../../src/img/big/graphics9.jpg', '../../src/img/big/graphics10.jpg']; //Set Initial Featured Image

  featured.style.backgroundImage = 'url(' + images[0] + ')'; //Set Images for Gallery and Add Event Listeners

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvY2xvc2VHYWxsZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHQvaW1hZ2VQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC9vcGVuR2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvc3R5bGUuY3NzP2M3MTYiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiY2xvc2VHYWxsZXJ5Iiwib3BlbkdhbGxlcnkiLCJpbml0Iiwic2VsZWN0SXRlbSIsImdhbGxlcnlXcmFwTGVmdCIsImdhbGxlcnlXcmFwUmlnaHQiLCJidXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJiYWNrZ3JvdW5kIiwiZ2FsbGVyeSIsIm9uY2xpY2siLCJzdHlsZSIsImRpc3BsYXkiLCJmaWx0ZXIiLCJxdWVyeVNlbGVjdG9yIiwiZ2FsbGVyeUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsIm51bU9mSXRlbXMiLCJjaGlsZHJlbiIsImxlbmd0aCIsIml0ZW1XaWR0aCIsImZlYXR1cmVkIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYmFja2dyb3VuZEltYWdlIiwiaSIsInJlbW92ZSIsImFkZCIsImZpcnN0IiwicmVtb3ZlQ2hpbGQiLCJsZWZ0IiwiYXBwZW5kQ2hpbGQiLCJsYXN0IiwiaW5z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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsS0FBSyxLQUF3QyxFQUFFLEVBRTdDOztBQUVGLFFBQVEsc0JBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImViZDNkYmZlZGQwNTgzYThiMTg2XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImRldlwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2Rpc3QvZGV2L1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC5qc1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5ib2R5e1xcblxcdGRpc3BsYXk6ZmxleDtcXG59XFxuaHRtbCwgYm9keSB7XFxuXFx0bWFyZ2luOjA7XFxuXFx0b3ZlcmZsb3c6aGlkZGVuO1xcblxcdHBhZGRpbmc6MDtcXG59XFxubWFpbiB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0b3BhY2l0eTogMC45O1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdHotaW5kZXg6IDk5OTk4O1xcblxcdGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRmbGV4LWZsb3c6IHJvdyB3cmFwXFxufVxcbi5HYWxsZXJ5LVNvY2lhbE1lZGlhX3dyYXBwZXIge1xcblxcdG1hcmdpbjogMCAxdmg7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWZsb3c6IGNvbHVtbjtcXG5cXHRhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5mZWF0dXJlIHtcXG5cXHQgZGlzcGxheTogZmxleDtcXG5cXHQgbWluLXdpZHRoOiA0MHZtaW47XFxuXFx0IG1heC1oZWlnaHQ6IDcwdm1pbjtcXG5cXHQgcG9zaXRpb246IGFic29sdXRlO1xcblxcdCB0b3A6IDIwdmg7XFxuXFx0IGxlZnQ6IDE4dmg7XFxufVxcbi5HYWxsZXJ5LVNsaWRlclByZXZpZXdfd3JhcHBlciB7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNSwgMTUsIDE1LCAxKTtcXG5cXHRtaW4taGVpZ2h0OiAxM3ZtaW47XFxuXFx0dG9wOiA4NXZtaW47XFxuXFx0Ym9yZGVyLXJhZGl1czogMXZoO1xcblxcdGxlZnQ6IDE4dm1pbjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdHdpZHRoOiAxMDAlO1xcbn1cXG4uR2FsbGVyeS1TbGlkZXJQcmV2aWV3IHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNSwgMTE1LCAxMTUsIDAuOCk7XFxuXFx0bWF4LXdpZHRoOiA5MHZtaW47XFxuXFx0Ym9yZGVyLXJhZGl1czogMXZoO1xcblxcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0b3ZlcmZsb3cteDogc2Nyb2xsO1xcblxcdG92ZXJmbG93LXk6IGhpZGRlbjtcXG5cXHRhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuXFx0bWFyZ2luLWxlZnQ6IDV2aDtcXG59XFxuXFxuLmZlYXR1cmVkLWl0ZW0ge1xcblxcdG1pbi1oZWlnaHQ6IDMwdm1pbjtcXG5cXHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgdG9wO1xcblxcdG1pbi13aWR0aDogNDB2bWluO1xcblxcdGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnh5LWNlbnRlciB7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogNTAlO1xcblxcdGxlZnQ6IDUwJTtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLnRyYW5zaXRpb24ge1xcblxcdHRyYW5zaXRpb246IGFsbCAzNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnItMy0yIHtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRwYWRkaW5nLWJvdHRvbTogNjYuNjY3JTtcXG59XFxuXFxuLmltYWdlLWhvbGRlciB7XFxuXFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG5cXHRiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5pdGVtLXdyYXBwZXIge1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG5cXHR3aWR0aDogMTAwJTsgLyogYXJiaXRyYXJ5IHZhbHVlICovXFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRtYXJnaW46IDAgMnZoO1xcblxcdGZsZXgtZmxvdzogY29sdW1uO1xcbn1cXG5cXG4uZ2FsbGVyeS1pdGVtIHsgb3BhY2l0eTogMC41OyB9XFxuLmdhbGxlcnktaXRlbS5hY3RpdmUgeyBvcGFjaXR5OiAxOyB9XFxuXFxuLkFkanVzdFBvc2l0aW9uLUJ1dHRvbl93cmFwcGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbn1cXG4uTWFpbkdyb3VwLUFib3V0SW5mb193cmFwcGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdG1heC1oZWlnaHQ6IDUwJTtcXG5cXHRtaW4td2lkdGg6IDE1JTtcXG5cXHRtYXgtd2lkdGg6IDEwMCU7XFxuXFx0ZmxleC1mbG93OiByb3cgd3JhcDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuXFx0d2lkdGg6IDEzMHZoO1xcblxcdG1hcmdpbi10b3A6IC0xNXZoO1xcbn1cXG4uQm9keURpdmlzb3JfYmxhY2sge1xcblxcdGJhY2tncm91bmQtY29sb3I6cmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHR3aWR0aDogNTAlO1xcblxcdGhlaWdodDogMTAwMHB4O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcbi5OYXYtU29jaWFsTWVkaWFfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0aGVpZ2h0OiAzZW07XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcbi5Cb2R5RGl2aXNvckJsYWNrLVRleHRJdGVtX3RpdGxlIHtcXG5cXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHR0b3A6OTIlO1xcblxcdGxlZnQ6MSU7XFxuXFx0Zm9udC1zaXplOjE0cHg7XFxuXFx0Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6ODAwO1xcblxcdGNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0Y3Vyc29yOiB0ZXh0O1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbn1cXG4uQWJvdXRJbmZvLUFydGljbGVCbGFja1NpZGVfd3JhcHBlciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRtYXgtaGVpZ2h0OiAyNXZoO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRtYXgtd2lkdGg6IDUwdm1pbjtcXG5cXHRhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcbi5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX2xlZnQsIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0IHtcXG5cXHRjb2xvcjp3aGl0ZTtcXG5cXHRmb250LWZhbWlseTonUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6MS43ZW07XFxufVxcbi5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX2xlZnQge1xcblxcdHRleHQtYWxpZ246cmlnaHQ7XFxuXFx0bWFyZ2luLXJpZ2h0OjEwcHg7XFxuXFx0cGFkZGluZy1yaWdodDoyNXB4O1xcblxcdG92ZXJmbG93OmF1dG87XFxuXFx0d2lkdGg6NTAlO1xcblxcdGJvcmRlci1yaWdodDoxcHggc29saWQgcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxufVxcbi5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX3JpZ2h0IHtcXG5cXHR0ZXh0LWFsaWduOmxlZnQ7XFxuXFx0bWFyZ2luLWxlZnQ6MTBweDtcXG5cXHRvdmVyZmxvdzphdXRvO1xcblxcdHdpZHRoOjUwJTtcXG59XFxuLkluaXRpYWxzTG9nby1OYW1lIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0Zm9udC1zaXplOiAyLjVlbTtcXG5cXHRjb2xvcjogcmdiYSg0NSwgNDUsIDQ1LCAxKTtcXG5cXHRmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6IDMwMDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG5cXHRoZWlnaHQ6IDFlbTtcXG5cXHRtYXJnaW46IDA7XFxuXFx0Y3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4uSW5pdGlhbHNMb2dvLVN1cm5hbWUge1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG5cXHRmb250LXNpemU6IDIuNWVtO1xcblxcdGhlaWdodDogMWVtO1xcblxcdGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRtYXJnaW46IDA7XFxuXFx0bGVmdDogMzAlO1xcblxcdHdpZHRoOiAtbW96LWZpdC1jb250ZW50O1xcblxcdG1hcmdpbi10b3A6IDElO1xcblxcdGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLkJvZHlEaXZpc29yX3doaXRlIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOjNzO1xcblxcdGFuaW1hdGlvbi1kdXJhdGlvbjozcztcXG5cXHQtd2Via2l0LWFuaW1hdGlvbi1uYW1lOnNsaWRlaW47XFxuXFx0YW5pbWF0aW9uLW5hbWU6c2xpZGVpbjtcXG5cXHR3aWR0aDogNTAlO1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcbi5BYm91dEluZm8tQXJ0aWNsZVdoaXRlU2lkZV93cmFwcGVyIHtcXG5cXHRkaXNwbGF5OmZsZXg7XFxuXFx0cG9zaXRpb246cmVsYXRpdmU7XFxuXFx0ZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcblxcdG1heC13aWR0aDo0NXZoO1xcblxcdG1heC1oZWlnaHQ6NTB2aDtcXG5cXHRvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmQ7XFxuXFx0b3ZlcmZsb3c6YXV0bztcXG5cXHRib3JkZXItcmlnaHQ6MXB4IHNvbGlkIHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcblxcdG1hcmdpbi1sZWZ0OiAxMHZoO1xcbn1cXG5oMiB7XFxuXFx0Zm9udC1zaXplOjQ0cHg7XFxuXFx0Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6NTAwO1xcblxcdHdpbGwtY2hhbmdlOiBjb2xvcjtcXG5cXHRjb2xvcjpyZ2JhKDQ1LCA0NSwgNDUsIDEpO1xcblxcdG1hcmdpbi1ib3R0b206MiU7XFxuXFx0dHJhbnNpdGlvbi1wcm9wZXJ0eTpjb2xvcjtcXG5cXHR0cmFuc2l0aW9uLWR1cmF0aW9uOjFzO1xcblxcdHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0O1xcbn1cXG5wIHtcXG5cXHRmb250LXNpemU6MS41ZW07XFxuXFx0Zm9udC1mYW1pbHk6J1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6MzAwO1xcblxcdGNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxuXFx0bWFyZ2luLWJvdHRvbTowcHg7XFxuXFx0cGFkZGluZy1yaWdodDoxMHB4O1xcbn1cXG4uQm9keURpdmlzb3JXaGl0ZS1QaG90b0l0ZW1fd3JhcHBlciB7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogODUlO1xcblxcdG1hcmdpbi1sZWZ0OiA4MHZtaW47XFxuXFx0ei1pbmRleDogOTk5OTg7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDJzIDIwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKTtcXG59XFxuLkJvZHlEaXZpc29yV2hpdGUtUGhvdG9JdGVtX3dyYXBwZXI6aG92ZXIge1xcblxcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjBweCk7XFxufVxcbmltZyB7XFxuXFx0bWF4LXdpZHRoOiAxMDAlO1xcblxcdGhlaWdodDogYXV0bztcXG59XFxuLkJ1dHRvbl9vcGVuZWQge1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcblxcdHdpZHRoOjEwMHB4O1xcblxcdGhlaWdodDoxMDBweDtcXG5cXHRmb250OjEzcHgvMTAwcHggJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuXFx0dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO1xcblxcdGxldHRlci1zcGFjaW5nOjFweDtcXG5cXHRjb2xvcjpibGFjaztcXG5cXHR0ZXh0LWFsaWduOmNlbnRlcjtcXG5cXHRiYWNrZ3JvdW5kOnJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcXG5cXHRib3JkZXItcmFkaXVzOjUwJTtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbjpzaGFkb3ctcHVsc2UgM3MgaW5maW5pdGU7XFxuXFx0YW5pbWF0aW9uOnNoYWRvdy1wdWxzZSAzcyBpbmZpbml0ZTtcXG5cXHQtd2Via2l0LWFuaW1hdGlvbi1kZWxheToycztcXG5cXHRhbmltYXRpb24tZGVsYXk6MnM7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDVzIGN1YmljLWJlemllcigwLjc4NSwgMC4xMzUsIDAuMTUsIDAuODYpO1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLkJ1dHRvbl9vcGVuZWQ6aG92ZXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDEyNywgMTY1LCAwLjQpO1xcbn1cXG4uR2FsbGVyeS1CdXR0b25fY2xvc2VkIHtcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHR3aWR0aDoxMDBweDtcXG5cXHRoZWlnaHQ6MTAwcHg7XFxuXFx0Zm9udDoyMHB4LzEwMHB4ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcblxcdHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtcXG5cXHRsZXR0ZXItc3BhY2luZzoxcHg7XFxuXFx0Y29sb3I6d2hpdGU7XFxuXFx0dGV4dC1hbGlnbjpjZW50ZXI7XFxuXFx0YmFja2dyb3VuZDpyZ2JhKDI1LCAyNSwgMjUsIDEpO1xcblxcdGJvcmRlci1yYWRpdXM6NTAlO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uOnNoYWRvdy13aGl0ZSAzcyBpbmZpbml0ZTtcXG5cXHRhbmltYXRpb246c2hhZG93LXdoaXRlIDNzIGluZmluaXRlO1xcblxcdC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OjJzO1xcblxcdGFuaW1hdGlvbi1kZWxheToycztcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxuXFx0bWFyZ2luLXJpZ2h0OiA1MHZtaW47XFxuXFx0YWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG4uR2FsbGVyeSB7XFxuXFx0cG9zaXRpb246YWJzb2x1dGU7XFxuXFx0ZGlzcGxheTpub25lO1xcblxcdHdpZHRoOiAxMjV2bWF4O1xcblxcdGJhY2tncm91bmQtY29sb3I6cmdiYSgyNSwgMjUsIDI1LCAxKTtcXG5cXHR6LWluZGV4Ojk5OTk5O1xcbn1cXG4uSW5pdGlhbHNMb2dvLVN1cm5hbWUsIC5Jbml0aWFsc0xvZ28tTmFtZSB7XFxuXFx0dHJhbnNpdGlvbjo0cywgMnMsIDJzO1xcbn1cXG4uSW5pdGlhbHNMb2dvLVN1cm5hbWU6aG92ZXIge1xcblxcdGNvbG9yOnJnYmEoNDUsIDQ1LCA0NSwgMSk7XFxufVxcbi5Jbml0aWFsc0xvZ28tTmFtZTpob3ZlciB7XFxuXFx0Y29sb3I6d2hpdGU7XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBzbGlkZWluXFxue1xcblxcdGZyb21cXG5cXHR7bWFyZ2luLWxlZnQ6NDAlO1xcblxcdHdpZHRoOjEwMCU7fVxcblxcdHRvXFxuXFx0e21hcmdpbi1sZWZ0OjAlO1xcblxcdHdpZHRoOjUwJTt9XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBzaGFkb3ctcHVsc2V7MCV7Ym94LXNoYWRvdzowIDAgMCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO31cXG4yNSV7Ym94LXNoYWRvdzowIDAgMCAxMHB4IHJnYmEoNDAsIDE2NSwgNzUsIDAuNSk7fVxcbjUwJXtib3gtc2hhZG93OjAgMCAwIDE1cHggcmdiYSg0MCwgMTI3LCAxNjUsIDAuNCk7fVxcbjc1JXtib3gtc2hhZG93OjAgMCAwIDBweCByZ2JhKDE2NSwgMTA4LCA0MCwgMC4yKTt9XFxuMTAwJXtib3gtc2hhZG93OjAgMCAwIDM1cHggcmdiYSgwLCAwLCAyNTUsIDApO31cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIHNoYWRvdy13aGl0ZXswJXtib3gtc2hhZG93OjAgMCAwIDBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7fVxcbjEwMCV7Ym94LXNoYWRvdzowIDAgMCAzNXB4IHJnYmEoMCwgMCwgMCwgMCk7fVxcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xcbiAgIC5sYXN0bmFtZSwgLm5hbWUsIC5waG90by1yaWdodCwudGV4dC13cmFwcGVyLWJsYWNrLCAudGV4dC13cmFwcGVyLXdoaXRlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gIH1cXG4gIGJvZHkge1xcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgfVxcbiAgLkJvZHlEaXZpc29yX3doaXRlLCAuQm9keURpdmlzb3JfYmxhY2sge1xcbiAgICBtaW4taGVpZ2h0OiA3NjhweDtcXG4gICAgbWF4LWhlaWdodDogYXV0bztcXG4gIH1cXG5cXG4gIC5OYXYtU29jaWFsTWVkaWFfd3JhcHBlciB7XFxuICAgIHdpZHRoOiAyMCU7XFxuICAgIHJpZ2h0OiA0MyU7XFxuICAgIHRvcDogOTElO1xcbiAgICBoZWlnaHQ6IDclO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB9XFxuICAuQnV0dG9uX29wZW5lZCB7XFxuICAgIHRvcDogNiU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogNzclO1xcbiAgfVxcbiAgLkFib3V0SW5mby1BcnRpY2xlQmxhY2tTaWRlX3dyYXBwZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgICBtYXgtd2lkdGg6IDQwJTtcXG4gICAgbWluLXdpZHRoOiAyMCU7XFxuICAgIHRvcDogMzclO1xcbiAgICBsZWZ0OiAyZW07XFxuICAgIG1pbi1oZWlnaHQ6IDIwJTtcXG4gICAgbWF4LWhlaWdodDogMzAlO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG5cXG4gIH1cXG4gIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX2xlZnQge1xcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgICBib3JkZXItcmlnaHQ6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXG4gICAgY29sb3I6IHJnYmEoMTQ4LCAxNDgsIDE0OCwgMSk7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIHBhZGRpbmctbGVmdDogNSU7XFxuICAgIHBhZGRpbmctYm90dG9tOiA1JTtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMnM7XFxuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yO1xcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XFxuICB9XFxuICAuQXJ0aWNsZUJsYWNrU2lkZS1UZXh0SXRlbV9yaWdodCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGNvbG9yOiByZ2JhKDE0OCwgMTQ4LCAxNDgsIDEpO1xcbiAgICBwYWRkaW5nLXRvcDogMTAlO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiA1JTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgxNzgsIDE3OCwgNzgsIDEpO1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAycztcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogY29sb3I7XFxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcXG4gIH1cXG4gIC5BcnRpY2xlQmxhY2tTaWRlLVRleHRJdGVtX2xlZnQ6aG92ZXIge1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGNvbG9yOiByZ2JhKDc4LCA3OCwgNzgsIDEpO1xcbiAgfVxcbiAgLkFydGljbGVCbGFja1NpZGUtVGV4dEl0ZW1fcmlnaHQ6aG92ZXIge1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGNvbG9yOiByZ2JhKDc4LCA3OCwgNzgsIDEpO1xcbiAgfVxcblxcbiAgLkFib3V0SW5mby1BcnRpY2xlV2hpdGVTaWRlX3dyYXBwZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgICBsZWZ0OiA1OCU7XFxuICAgIHRvcDogMzAlO1xcbiAgICBtaW4td2lkdGg6IDIwJTtcXG4gICAgbWF4LXdpZHRoOiAzNSU7XFxuICAgIG1pbi1oZWlnaHQ6IDIwJTtcXG4gICAgbWF4LWhlaWdodDogNDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgfVxcbiAgaDIge1xcbiAgXFx0Zm9udC1zaXplOiA0NnB4O1xcbiAgfVxcbiAgaDI6aG92ZXIge1xcbiAgICBmb250LXNpemU6IDQ2cHg7XFxuICB9XFxuICBwIHtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgfVxcbiAgcDpob3ZlciB7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gIH1cXG4gIC5CaW9TZWN0aW9uLVNlY3Rpb25IZWFkZXJfZmlyc3Qge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgfVxcbiAgLkluaXRpYWxzTG9nby1TdXJuYW1lLCAuSW5pdGlhbHNMb2dvLU5hbWUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmb250LXNpemU6IDQwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIH1cXG4gIC5Jbml0aWFsc0xvZ28tTmFtZSB7XFxuICAgIG1heC13aWR0aDogMzAlO1xcbiAgICBtaW4td2lkdGg6IDMwJTtcXG4gICAgY29sb3I6IHJnYmEoNTUsIDU1LCA1NSwgMSk7XFxuICAgIHRvcDogLTElO1xcbiAgICByaWdodDogNjglO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICAgIG1heC1oZWlnaHQ6IDUlO1xcbiAgfVxcbiAgLkluaXRpYWxzTG9nby1TdXJuYW1lIHtcXG4gICAgbWF4LXdpZHRoOiAzMCU7XFxuICAgIG1pbi13aWR0aDogMzAlO1xcbiAgICBsZWZ0OiAxNSU7XFxuICAgIGNvbG9yOiByZ2JhKDU1LCA1NSwgNTUsIDEpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc4LCAxNzgsIDc4LCAxKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIHRvcDogNSU7XFxuICB9XFxuICAuQm9keURpdmlzb3JXaGl0ZS1QaG90b0l0ZW1fd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgfVxcbiAgLkJvZHlEaXZpc29yQmxhY2stVGV4dEl0ZW1fdGl0bGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGxlZnQ6IDclO1xcbiAgICBjb2xvcjogcmdiYSg1NSwgNTUsIDU1LCAxKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3OCwgMTc4LCA3OCwgMSk7XFxuICB9XFxuICBwYXRoIHtcXG4gICAgZmlsbDogcmdiYSg3OCwgMTc4LCAxNzgsIDEpO1xcbiAgfVxcbiAgcGF0aDpob3ZlciB7XFxuICAgIGZpbGw6IHJnYmEoNzgsIDE3OCwgNzgsIDEpO1xcbiAgfVxcbiAgLkdhbGxlcnktQnV0dG9uX2Nsb3NlZCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB0b3A6IDclO1xcbiAgfVxcbn1cXG4vKi4gc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTjBlV3hsTG1OemN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hMUVVGTExHRkJRV0VzV1VGQldTeERRVUZETzBGQlF5OUNMRmRCUVZjc1UwRkJVeXhuUWtGQlowSXNWVUZCVlN4RFFVRkRPMEZCUXk5RExFOUJRVThzY1VOQlFYRkRMR2RDUVVGblFpeGpRVUZqTEZWQlFWVXNRMEZCUXp0QlFVTnlSaXhqUVVGakxHdENRVUZyUWl4UFFVRlBMR0ZCUVdFc1ZVRkJWU3hEUVVGRE8wRkJReTlFTEZkQlFWY3NhMEpCUVd0Q0xGTkJRVk1zUTBGQlF6dEJRVU4yUXl4WFFVRlhMR3RDUVVGclFpeFJRVUZSTEVOQlFVTTdRVUZEZEVNc1kwRkJZeXhyUWtGQmEwSXNVVUZCVVN4UlFVRlJMR1ZCUVdVc2FVTkJRV2xETEdkQ1FVRm5RaXcyUWtGQk5rSXNRMEZCUXp0QlFVTTVTU3h2UWtGQmIwSXNhMEpCUVd0Q0xHRkJRV0VzWlVGQlpTeHJRa0ZCYTBJc1owSkJRV2RDTEZGQlFWRXNVMEZCVXl4RFFVRkRPMEZCUTNSSUxHOURRVUZ2UXl4WlFVRlpMR2xEUVVGcFF5eGxRVUZsTEVOQlFVTTdRVUZEYWtjc2FVSkJRV2xDTEdsQ1FVRnBRaXgxUWtGQmRVSXNhMEpCUVd0Q0xHMUNRVUZ0UWl4alFVRmpMRlZCUVZVc05rSkJRVFpDTERoQ1FVRTRRaXgxUWtGQmRVSXNiME5CUVc5RExFTkJRVU03UVVGRE4wOHNhMEpCUVd0Q0xHZENRVUZuUWl4MVFrRkJkVUlzYVVKQlFXbENMR05CUVdNc1ZVRkJWU3c0UWtGQk9FSXNkVUpCUVhWQ0xHMURRVUZ0UXl4RFFVRkRPMEZCUXpOTUxGVkJRVlVzYTBKQlFXdENMRkZCUVZFc1UwRkJVeXgxUWtGQmRVSXNXVUZCV1N4bFFVRmxMRmxCUVZrc1dVRkJXU3hwUTBGQmFVTXNhVU5CUVhsQ0xFRkJRWHBDTEhsQ1FVRjVRaXhuUWtGQlowSXNRMEZCUXp0QlFVTnNUU3hQUVVGUExIVkNRVUYxUWl4blFrRkJaMElzTWtKQlFUSkNMR2RDUVVGblFpeFZRVUZWTERoQ1FVRnpRaXhCUVVGMFFpeHpRa0ZCYzBJc0swSkJRWFZDTEVGQlFYWkNMSFZDUVVGMVFpeERRVUZETzBGQlEycEtMRzlDUVVGdlFpeGhRVUZoTEd0Q1FVRnJRaXhSUVVGUkxGTkJRVk1zYzBKQlFYTkNMR2RDUVVGblFpeHBRa0ZCYVVJc2VVSkJRWGxDTEdOQlFXTXNOa0pCUVRaQ0xFTkJRVU03UVVGRGFFMHNSMEZCUnl4bFFVRmxMR2xEUVVGcFF5eG5Ra0ZCWjBJc2JVSkJRVzFDTERCQ1FVRXdRaXhyUWtGQmEwSXNNRUpCUVRCQ0xIVkNRVUYxUWl4dlEwRkJiME1zUTBGQlF6dEJRVU40VGl4dlJrRkJiMFlzWlVGQlpTeHBRMEZCYVVNc1owSkJRV2RDTERCQ1FVRXdRaXhyUWtGQmEwSXNiVUpCUVcxQ0xIVkNRVUYxUWl3NFFrRkJPRUlzZFVKQlFYVkNMRzFEUVVGdFF5eERRVUZETzBGQlEyNVZMRTFCUVUwc2EwSkJRV3RDTEZkQlFWY3NWVUZCVlN4bFFVRmxMSFZDUVVGMVFpd3dRa0ZCTUVJc1owTkJRWGRDTEVGQlFYaENMSGRDUVVGM1FpeHBRMEZCYVVNc1owSkJRV2RDTEVOQlFVTTdRVUZEZGt3c1lVRkJZU3hyUWtGQmEwSXNVMEZCVXl4aFFVRmhMRU5CUVVNN1FVRkRkRVFzVVVGQlVTeFpRVUZaTEd0Q1FVRnJRaXhQUVVGUExIbENRVUY1UWl4WlFVRlpMR0ZCUVdFc2NVTkJRWEZETEhsQ1FVRjVRaXh0UWtGQmJVSXNXVUZCV1N4clFrRkJhMElzYjBOQlFXOURMR3RDUVVGclFpd3lRMEZCYlVNc1FVRkJia01zYlVOQlFXMURMREpDUVVGdFFpeEJRVUZ1UWl4dFFrRkJiVUlzUTBGQlF6dEJRVU16VkN4alFVRmpMR3RDUVVGclFpeFRRVUZUTEU5QlFVOHNlVUpCUVhsQ0xGbEJRVmtzWVVGQllTeHhRMEZCY1VNc2VVSkJRWGxDTEcxQ1FVRnRRaXhaUVVGWkxHdENRVUZyUWl3clFrRkJLMElzYTBKQlFXdENMREpEUVVGdFF5eEJRVUZ1UXl4dFEwRkJiVU1zTWtKQlFXMUNMRUZCUVc1Q0xHMUNRVUZ0UWl4alFVRmpMRU5CUVVNN1FVRkRkbFVzVTBGQlV5eHJRa0ZCYTBJc1lVRkJZU3hsUVVGbExGZEJRVmNzV1VGQldTeG5Ra0ZCWjBJc2RVTkJRWFZETEdOQlFXTXNRMEZCUXp0QlFVTndTaXhwUWtGQmFVSXNWVUZCVlN3NFFrRkJPRUlzTkVKQlFUUkNMRzFEUVVGdFF5eDFRa0ZCZFVJc1dVRkJXU3h0UWtGQmJVSXNkVU5CUVhWRExHdENRVUZyUWl4WFFVRlhMR2RDUVVGblFpeG5Ra0ZCWjBJc1owSkJRV2RDTEVOQlFVTTdRVUZEYmxNc2QwSkJRWGRDTEdGQlFXRXNOa0pCUVRaQ0xHVkJRV1VzVlVGQlZTeHRRa0ZCYlVJc1dVRkJXU3hyUTBGQmEwTXNjVU5CUVhGRExHVkJRV1VzWTBGQll5eERRVUZETzBGQlF5OU9MRWRCUVVjc1pVRkJaU3h0UWtGQmJVSXNhVU5CUVdsRExHZENRVUZuUWl4clFrRkJhMElzVjBGQlZ5eHJRa0ZCYTBJc1lVRkJZU3haUVVGWkxHbENRVUZwUWl4MVFrRkJkVUlzYjBOQlFXOURMRU5CUVVNN1FVRkRNMDhzWTBGQll5eHpRa0ZCYzBJc1EwRkJRenRCUVVOeVF5eG5Ra0ZCWjBJc1lVRkJZU3hyUWtGQmEwSXNPRUpCUVRoQ0xGZEJRVmNzUTBGQlF6dEJRVU42Uml4WFFVRlhMR0ZCUVdFc09FSkJRVGhDTEVOQlFVTTdRVUZEZGtRc1QwRkJUeXhoUVVGaExIRkNRVUZ4UWl4RFFVRkRPMEZCUXpGRExHRkJRV0VzT0VOQlFUaERMR3REUVVFd1FpeEJRVUV4UWl3d1FrRkJNRUlzUTBGQlF6dEJRVU4wUml4MVFrRkJkVUlzZFVOQlFYVkRMRU5CUVVNN1FVRkRMMFFzVTBGQlV5dzBRMEZCTkVNc2MwSkJRWE5DTEVOQlFVTTdRVUZETlVVc2VVdEJRWGxMTEdWQlFXVXNRMEZCUXp0QlFVTjZUQ3g1UTBGQmVVTXNPRUpCUVhOQ0xFRkJRWFJDTEhOQ1FVRnpRaXdyUWtGQmRVSXNRVUZCZGtJc2RVSkJRWFZDTEVOQlFVTTdRVUZEZGtZc2FVSkJRV2xDTEhOQ1FVRnpRaXhEUVVGRE8wRkJRM2hETEdkQ1FVRm5RaXh6UWtGQmMwSXNRMEZCUXp0QlFVTjJReXhaUVVGWkxIbENRVUY1UWl4RFFVRkRPMEZCUTNSRExGVkJRVlVzWjBOQlFXZERMRFpDUVVFMlFpd3lRa0ZCTWtJc05FSkJRVFJDTEVOQlFVTTdRVUZETDBnc01rSkJRVzFDTEV0QlFVc3NaMEpCUVdkQ0xGZEJRVmNzUTBGQlF6dEJRVU53UkN4SFFVRkhMR1ZCUVdVc1ZVRkJWU3hEUVVGRE8wTkJRelZDTzBGQlJrUXNiVUpCUVcxQ0xFdEJRVXNzWjBKQlFXZENMRmRCUVZjc1EwRkJRenRCUVVOd1JDeEhRVUZITEdWQlFXVXNWVUZCVlN4RFFVRkRPME5CUXpWQ08wRkJRMFFzWjBOQlFYZENMRWRCUVVjc09FTkJRVGhETEVOQlFVTTdRVUZETVVVc1NVRkJTU3cyUTBGQk5rTXNRMEZCUXp0QlFVTnNSQ3hKUVVGSkxEaERRVUU0UXl4RFFVRkRPMEZCUTI1RUxFbEJRVWtzTmtOQlFUWkRMRU5CUVVNN1FVRkRiRVFzUzBGQlN5eDVRMEZCZVVNc1EwRkJRenREUVVNNVF6dEJRVXhFTEhkQ1FVRjNRaXhIUVVGSExEaERRVUU0UXl4RFFVRkRPMEZCUXpGRkxFbEJRVWtzTmtOQlFUWkRMRU5CUVVNN1FVRkRiRVFzU1VGQlNTdzRRMEZCT0VNc1EwRkJRenRCUVVOdVJDeEpRVUZKTERaRFFVRTJReXhEUVVGRE8wRkJRMnhFTEV0QlFVc3NlVU5CUVhsRExFTkJRVU03UTBGRE9VTTdRVUZEUkN4blEwRkJkMElzUjBGQlJ5dzRRMEZCT0VNc1EwRkJRenRCUVVNeFJTeExRVUZMTEhWRFFVRjFReXhEUVVGRE8wTkJRelZETzBGQlJrUXNkMEpCUVhkQ0xFZEJRVWNzT0VOQlFUaERMRU5CUVVNN1FVRkRNVVVzUzBGQlN5eDFRMEZCZFVNc1EwRkJRenREUVVNMVF5SXNJbVpwYkdVaU9pSnpkSGxzWlM1amMzTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUppYjJSNWUyUnBjM0JzWVhrNlpteGxlRHRvWldsbmFIUTZNVEF3SlR0OVhHNW9kRzFzTENCaWIyUjVlMjFoY21kcGJqb3dPMjkyWlhKbWJHOTNPbWhwWkdSbGJqdHdZV1JrYVc1bk9qQTdmVnh1STJKc1lXTnJlMkpoWTJ0bmNtOTFibVF0WTI5c2IzSTZjbWRpWVNnME5Td2dORFVzSURRMUxDQXhLVHR0WVhndGFHVnBaMmgwT2pFd01DVTdiV0Y0TFhkcFpIUm9PalV3SlR0M2FXUjBhRG8xTUNVN2ZWeHVJMnh2WjI4dGQzSmhjSEJsY250d2IzTnBkR2x2YmpwaFluTnZiSFYwWlR0MGIzQTZNU1U3WkdsemNHeGhlVHBtYkdWNE8zZHBaSFJvT2pVd0pUdDlYRzRqYkc5bmJ5MW1ZV05sZTNCdmMybDBhVzl1T21GaWMyOXNkWFJsTzJ4bFpuUTZPVElsTzMxY2JpTnNiMmR2TFdsdWMzUjdjRzl6YVhScGIyNDZZV0p6YjJ4MWRHVTdiR1ZtZERveEpUdDlYRzRqWVhKMGFYTjBMWFJwZEd4bGUzQnZjMmwwYVc5dU9tRmljMjlzZFhSbE8zUnZjRG81TWlVN2JHVm1kRG94SlR0bWIyNTBMWE5wZW1VNk1UUndlRHRtYjI1MExXWmhiV2xzZVRvblVtOWliM1J2Snl3Z2MyRnVjeTF6WlhKcFpqdG1iMjUwTFhkbGFXZG9kRG80TURBN1kyOXNiM0k2Y21kaVlTZ3lOVFVzSURJMU5Td2dNalUxTENBeEtUdDlYRzRqZEdWNGRDMTNjbUZ3Y0dWeUxXSnNZV05yZTNCdmMybDBhVzl1T21GaWMyOXNkWFJsTzJScGMzQnNZWGs2Wm14bGVEdHRZWGd0YUdWcFoyaDBPakkxSlR0d2IzTnBkR2x2YmpweVpXeGhkR2wyWlR0dFlYZ3RkMmxrZEdnNk16WXdjSGc3ZEc5d09qTTNKVHRzWldaME9qSTFKVHQ5WEc0amRHVjRkQzFzWldaMExXSnNZV05yTENBamRHVjRkQzF5YVdkb2RDMWliR0ZqYTN0amIyeHZjanAzYUdsMFpUdG1iMjUwTFdaaGJXbHNlVG9uVW05aWIzUnZKeXdnYzJGdWN5MXpaWEpwWmp0bWIyNTBMWE5wZW1VNk16QndlRHQ5WEc0amRHVjRkQzFzWldaMExXSnNZV05yZTNSbGVIUXRZV3hwWjI0NmNtbG5hSFE3ZDJsc2JDMWphR0Z1WjJVNklHWnZiblF0YzJsNlpUdHRZWEpuYVc0dGNtbG5hSFE2TVRCd2VEdHdZV1JrYVc1bkxYSnBaMmgwT2pNd2NIZzdiM1psY21ac2IzYzZZWFYwYnp0M2FXUjBhRG8xTUNVN1ltOXlaR1Z5TFhKcFoyaDBPakZ3ZUNCemIyeHBaQ0IzYUdsMFpUdDBjbUZ1YzJsMGFXOXVMWEJ5YjNCbGNuUjVPbVp2Ym5RdGMybDZaVHQwY21GdWMybDBhVzl1TFdSMWNtRjBhVzl1T2pGek8zUnlZVzV6YVhScGIyNHRkR2x0YVc1bkxXWjFibU4wYVc5dU9tVmhjMlV0YjNWME8zMWNiaU4wWlhoMExYSnBaMmgwTFdKc1lXTnJlM1JsZUhRdFlXeHBaMjQ2YkdWbWREdDNhV3hzTFdOb1lXNW5aVG9nWm05dWRDMXphWHBsTzIxaGNtZHBiaTFzWldaME9qRXdjSGc3YjNabGNtWnNiM2M2WVhWMGJ6dDNhV1IwYURvMU1DVTdkSEpoYm5OcGRHbHZiaTF3Y205d1pYSjBlVHBtYjI1MExYTnBlbVU3ZEhKaGJuTnBkR2x2Ymkxa2RYSmhkR2x2YmpveGN6dDBjbUZ1YzJsMGFXOXVMWFJwYldsdVp5MW1kVzVqZEdsdmJqcGxZWE5sTFdsdU8zMWNiaU5zWVhOMGJtRnRaWHR3YjNOcGRHbHZianBoWW5OdmJIVjBaVHQwYjNBNk9ETWxPMnhsWm5RNk5ETWxPM2RwYkd3dFkyaGhibWRsT2lCMGNtRnVjMlp2Y20wN1kyOXNiM0k2ZDJocGRHVTdabTl1ZEMxemFYcGxPak0yY0hnN2QybGtkR2c2TVRVd2NIZzdhR1ZwWjJoME9qUXdjSGc3Wm05dWRDMW1ZVzFwYkhrNkoxSnZZbTkwYnljc0lITmhibk10YzJWeWFXWTdkSEpoYm5ObWIzSnRPbkp2ZEdGMFpTZ3RPVEJrWldjcE8yWnZiblF0ZDJWcFoyaDBPak13TUR0OVhHNGpkMmhwZEdWN1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pwM2FHbDBaVHR0WVhndGQybGtkR2c2T0RBd2NIZzdkMmxzYkMxamFHRnVaMlU2SUhkcFpIUm9MQ0JvWldsbmFIUTdiV0Y0TFdobGFXZG9kRHBoZFhSdk8zZHBaSFJvT2pVd0pUdGhibWx0WVhScGIyNHRaSFZ5WVhScGIyNDZNM003WVc1cGJXRjBhVzl1TFc1aGJXVTZjMnhwWkdWcGJqdDlYRzRqZEdWNGRDMTNjbUZ3Y0dWeUxYZG9hWFJsZTJScGMzQnNZWGs2Wm14bGVEdHdiM05wZEdsdmJqcHlaV3hoZEdsMlpUdDBiM0E2TWpVbE8yeGxablE2TWpVbE8yWnNaWGd0WkdseVpXTjBhVzl1T21OdmJIVnRianR0WVhndGQybGtkR2c2TXpVd2NIZzdiV0Y0TFdobGFXZG9kRG8wTURCd2VEdHZkbVZ5Wm14dmR5MTNjbUZ3T21KeVpXRnJMWGR2Y21RN2IzWmxjbVpzYjNjNllYVjBienRpYjNKa1pYSXRjbWxuYUhRNk1YQjRJSE52Ykdsa0lHSnNZV05yTzMxY2JtZ3llMlp2Ym5RdGMybDZaVG8wT0hCNE8yWnZiblF0Wm1GdGFXeDVPaWRTYjJKdmRHOG5MQ0J6WVc1ekxYTmxjbWxtTzJadmJuUXRkMlZwWjJoME9qVXdNRHQzYVd4c0xXTm9ZVzVuWlRvZ1kyOXNiM0k3WTI5c2IzSTZjbWRpWVNnNE5Td2dPRFVzSURnMUxDQXhLVHR0WVhKbmFXNHRZbTkwZEc5dE9qQndlRHQwY21GdWMybDBhVzl1TFhCeWIzQmxjblI1T21OdmJHOXlPM1J5WVc1emFYUnBiMjR0WkhWeVlYUnBiMjQ2TVhNN2RISmhibk5wZEdsdmJpMTBhVzFwYm1jdFpuVnVZM1JwYjI0NlpXRnpaUzF2ZFhRN2ZWeHVJMlpwY25OMExYQmhjbUZuTENBamMyVmpiMjVrTFhCaGNtRm5MQ0FqZEdocGNtUXRjR0Z5WVdjc0lDTm1iM0owYUMxd1lYSmhaeXdnSTJacFpuUm9MWEJoY21GbkxDQWpjMmw0ZEdndGNHRnlZV2Q3Wm05dWRDMXphWHBsT2pFNGNIZzdabTl1ZEMxbVlXMXBiSGs2SjFKdlltOTBieWNzSUhOaGJuTXRjMlZ5YVdZN1ptOXVkQzEzWldsbmFIUTZNekF3TzJOdmJHOXlPbkpuWW1Fb05EVXNJRFExTENBME5Td2dNU2s3YldGeVoybHVMV0p2ZEhSdmJUb3djSGc3Y0dGa1pHbHVaeTF5YVdkb2REb3hNSEI0TzNkcGJHd3RZMmhoYm1kbE9pQm1iMjUwTFhOcGVtVTdkSEpoYm5OcGRHbHZiaTF3Y205d1pYSjBlVHBtYjI1MExYTnBlbVU3ZEhKaGJuTnBkR2x2Ymkxa2RYSmhkR2x2YmpveGN6dDBjbUZ1YzJsMGFXOXVMWFJwYldsdVp5MW1kVzVqZEdsdmJqcGxZWE5sTFdsdU8zMWNiaU51WVcxbGUzQnZjMmwwYVc5dU9uSmxiR0YwYVhabE8ySnZkSFJ2YlRvMU1DVTdjbWxuYUhRNk5EY2xPMlp2Ym5RdGMybDZaVG96Tm5CNE8zZHBiR3d0WTJoaGJtZGxPaUIwY21GdWMyWnZjbTA3WTI5c2IzSTZjbWRpWVNnNE5Td2dPRFVzSURnMUxDQXhLVHQwY21GdWMyWnZjbTA2Y205MFlYUmxLRGt3WkdWbktUdG1iMjUwTFdaaGJXbHNlVG9uVW05aWIzUnZKeXdnYzJGdWN5MXpaWEpwWmp0bWIyNTBMWGRsYVdkb2REb3pNREE3ZlZ4dUkzQm9iM1J2TFhKcFoyaDBlM0J2YzJsMGFXOXVPbkpsYkdGMGFYWmxPMnhsWm5RNk5qZ2xPMkp2ZEhSdmJUb3ROVEJ3ZUR0OVhHNGpZblYwZEc5dWUyWnNiMkYwT25KcFoyaDBPM0J2YzJsMGFXOXVPbkpsYkdGMGFYWmxPM1J2Y0RvMUpUdHRZWEpuYVc0Nk1IQjRJRE13Y0hnZ09EQndlQ0F3Y0hnN2QybGtkR2c2TVRBd2NIZzdhR1ZwWjJoME9qRXdNSEI0TzJadmJuUTZNVE53ZUM4eE1EQndlQ0FuVW05aWIzUnZKeXdnYzJGdWN5MXpaWEpwWmp0MFpYaDBMWFJ5WVc1elptOXliVHAxY0hCbGNtTmhjMlU3YkdWMGRHVnlMWE53WVdOcGJtYzZNWEI0TzJOdmJHOXlPbUpzWVdOck8zUmxlSFF0WVd4cFoyNDZZMlZ1ZEdWeU8ySmhZMnRuY205MWJtUTZjbWRpWVNneU5UVXNJREkxTlN3Z01qVTFMQ0F3TGpZcE8ySnZjbVJsY2kxeVlXUnBkWE02TlRBbE8yRnVhVzFoZEdsdmJqcHphR0ZrYjNjdGNIVnNjMlVnTTNNZ2FXNW1hVzVwZEdVN1lXNXBiV0YwYVc5dUxXUmxiR0Y1T2pKek8zMWNiaU5qYkc5elpTMWlkWFIwYjI1N2NHOXphWFJwYjI0NllXSnpiMngxZEdVN2JHVm1kRG81TUNVN2RHOXdPalVsTzIxaGNtZHBiam93Y0hnZ016QndlQ0E0TUhCNElEQndlRHQzYVdSMGFEb3hNREJ3ZUR0b1pXbG5hSFE2TVRBd2NIZzdabTl1ZERveU1IQjRMekV3TUhCNElDZFNiMkp2ZEc4bkxDQnpZVzV6TFhObGNtbG1PM1JsZUhRdGRISmhibk5tYjNKdE9uVndjR1Z5WTJGelpUdHNaWFIwWlhJdGMzQmhZMmx1WnpveGNIZzdZMjlzYjNJNmQyaHBkR1U3ZEdWNGRDMWhiR2xuYmpwalpXNTBaWEk3WW1GamEyZHliM1Z1WkRweVoySmhLRFExTENBME5Td2dORFVzSURFcE8ySnZjbVJsY2kxeVlXUnBkWE02TlRBbE8yRnVhVzFoZEdsdmJqcHphR0ZrYjNjdGQyaHBkR1VnTTNNZ2FXNW1hVzVwZEdVN1lXNXBiV0YwYVc5dUxXUmxiR0Y1T2pKek8zb3RhVzVrWlhnNk9UazVPVGs3ZlZ4dUkyZGhiR3hsY25sN2NHOXphWFJwYjI0NllXSnpiMngxZEdVN1pHbHpjR3hoZVRwdWIyNWxPMjFoZUMxM2FXUjBhRG94TWpBbE8zZHBaSFJvT2pFd01DVTdhR1ZwWjJoME9qRXhNQ1U3YldGNExXaGxhV2RvZERveE1UQWxPMkpoWTJ0bmNtOTFibVF0WTI5c2IzSTZjbWRpWVNneU5Td2dNalVzSURJMUxDQXdMamtwTzNvdGFXNWtaWGc2T1RrNU9UazdmVnh1STJkaGJHeGxjbmt0ZDNKaGNIQmxjbnQzYVdSMGFEbzNNQ1U3ZDJsc2JDMWphR0Z1WjJVNklHSmhZMnRuY205MWJtUXRZMjlzYjNJN2RISmhibk5wZEdsdmJqcGlZV05yWjNKdmRXNWtMV052Ykc5eU8zUnlZVzV6YVhScGIyNHRkR2x0YVc1bkxXWjFibU4wYVc5dU9tVmhjMlV0YVc0N2RISmhibk5wZEdsdmJpMWtkWEpoZEdsdmJqb3ljenR0WVhKbmFXNDZZWFYwYnp0aWIzSmtaWEl0Y21Ga2FYVnpPakV5Y0hnN1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pweVoySmhLRFExTENBME5Td2dORFVzSURBdU9DazdjRzl6YVhScGIyNDZjbVZzWVhScGRtVTdhR1ZwWjJoME9qY3dKVHR0WVhndGFHVnBaMmgwT2pFd01DVTdiM1psY21ac2IzYzZhR2xrWkdWdU8yOTJaWEptYkc5M0xYZzZZWFYwYnp0OVhHNGpaMkZzYkdWeWVTMW9aV0ZrWlhJdGQzSmhjSEJsY250a2FYTndiR0Y1T21ac1pYZzdhblZ6ZEdsbWVTMWpiMjUwWlc1ME9uTndZV05sTFdGeWIzVnVaRHR3YjNOcGRHbHZianBtYVhobFpEdDNhV1IwYURvM01DVTdZbTl5WkdWeUxYSmhaR2wxY3pveE1uQjRPMmhsYVdkb2REcGhkWFJ2TzJKdmNtUmxjaTFpYjNSMGIyMDZjbWRpWVNnMU5Td2dOVFVzSURVMUxDQXhLVHRpWVdOclozSnZkVzVrTFdOdmJHOXlPbkpuWW1Fb05EVXNJRFExTENBME5Td2dNU2s3YldGNExXaGxhV2RvZERveU1DVTdlaTFwYm1SbGVEbzVPVGs1T0R0OVhHNW9NM3RtYjI1MExYTnBlbVU2TXpad2VEdDNhV3hzTFdOb1lXNW5aVG9nWTI5c2IzSTdabTl1ZEMxbVlXMXBiSGs2SjFKdlltOTBieWNzSUhOaGJuTXRjMlZ5YVdZN1ptOXVkQzEzWldsbmFIUTZOVEF3TzJadmJuUXRjM1I1YkdVNmFYUmhiR2xqTzJKdmRIUnZiVG94TUNVN2NHOXphWFJwYjI0NmNtVnNZWFJwZG1VN1pHbHpjR3hoZVRwbWJHVjRPMk52Ykc5eU9uZG9hWFJsTzNSeVlXNXphWFJwYjI0NlkyOXNiM0k3ZEhKaGJuTnBkR2x2Ymkxa2RYSmhkR2x2YmpveGN6dDBjbUZ1YzJsMGFXOXVMWFJwYldsdVp5MW1kVzVqZEdsdmJqcGxZWE5sTFc5MWREdDlYRzR1YzJWc1pXTjBMV0pzYjJOcmUyTnZiRzl5T25KbllpZzROU3dnT0RVc0lEZzFLVHQ5WEc0alozSmhjR2hwWTNNdFlteHZZMnQ3WkdsemNHeGhlVHBtYkdWNE8zQnZjMmwwYVc5dU9uSmxiR0YwYVhabE8ycDFjM1JwWm5rdFkyOXVkR1Z1ZERwemNHRmpaUzFpWlhSM1pXVnVPM2RwWkhSb09qRXdNQ1U3ZlZ4dUkyRnlkQzFpYkc5amEzdGthWE53YkdGNU9tNXZibVU3YW5WemRHbG1lUzFqYjI1MFpXNTBPbk53WVdObExXSmxkSGRsWlc0N2ZWeHVabWxuZFhKbGUyUnBjM0JzWVhrNlpteGxlRHR0WVhKbmFXNDZNak1sSURBZ01qQWxJREV3SlR0OVhHNGphVzFoWjJVNmFHOTJaWEo3WW05NExYTm9ZV1J2ZHpvMGNIZ2dPWEI0SURsd2VDQXhjSGdnY21kaVlTZ3dMQ0F3TENBd0xDQXdMallwTzNSeVlXNXpabTl5YlRwelkyRnNaU2d4TGpnc0lERXVPQ2s3ZlZ4dUkyZGhiR3hsY25rdGQzSmhjSEJsY2pwb2IzWmxjbnRpWVdOclozSnZkVzVrTFdOdmJHOXlPbkpuWW1Fb09UQXNJRGt3TENBNU1Dd2dNQzQ0S1R0OVhHNW9NenBvYjNabGNudGliM0prWlhJdFltOTBkRzl0T2pGd2VDQnpiMnhwWkNCeVoySmhLRGcxTENBNE5Td2dPRFVzSURFcE8yTnZiRzl5T25KbllpZzROU3dnT0RVc0lEZzFLVHQ5WEc0alptbHljM1F0Y0dGeVlXYzZhRzkyWlhJc0lDTnpaV052Ym1RdGNHRnlZV2M2YUc5MlpYSXNJQ04wYUdseVpDMXdZWEpoWnpwb2IzWmxjaXdnSTJadmNuUm9MWEJoY21Gbk9taHZkbVZ5TENBalptbG1kR2d0Y0dGeVlXYzZhRzkyWlhJc0lDTnphWGgwYUMxd1lYSmhaenBvYjNabGNpd2dJM1JsZUhRdGJHVm1kQzFpYkdGamF6cG9iM1psY2l3Z0kzUmxlSFF0Y21sbmFIUXRZbXhoWTJzNmFHOTJaWEo3Wm05dWRDMXphWHBsT2pJMGNIZzdmVnh1STNSbGVIUXRkM0poY0hCbGNpMTNhR2wwWlN3Z0kzUmxlSFF0ZDNKaGNIQmxjaTFpYkdGamEzdGhibWx0WVhScGIyNHRaSFZ5WVhScGIyNDZNM003WVc1cGJXRjBhVzl1TFc1aGJXVTZjMnhwWkdWcGJqdDlYRzRqYkdGemRHNWhiV1VzSUNOdVlXMWxlM1J5WVc1emFYUnBiMjQ2TkhNc0lESnpMQ0F5Y3p0OVhHNGpiR0Z6ZEc1aGJXVTZhRzkyWlhKN1kyOXNiM0k2Y21kaUtESTFMQ0F5TlN3Z01qVXBPMzFjYmlOdVlXMWxPbWh2ZG1WeWUyTnZiRzl5T25KbllpZ3hOelVzSURFM05Td2dNVGMxS1R0OVhHNHVjbTkwWVhSbE9UQjdMWGRsWW10cGRDMTBjbUZ1YzJadmNtMDZjbTkwWVhSbEtEa3daR1ZuS1RzdGJXOTZMWFJ5WVc1elptOXliVHB5YjNSaGRHVW9PVEJrWldjcE95MXZMWFJ5WVc1elptOXliVHB5YjNSaGRHVW9PVEJrWldjcE95MXRjeTEwY21GdWMyWnZjbTA2Y205MFlYUmxLRGt3WkdWbktUdDlYRzVBYTJWNVpuSmhiV1Z6SUhOc2FXUmxhVzU3Wm5KdmJYdHRZWEpuYVc0dGJHVm1kRG94TUNVN2QybGtkR2c2TVRBd0pUdDlYRzUwYjN0dFlYSm5hVzR0YkdWbWREb3dKVHQzYVdSMGFEbzFNQ1U3ZlZ4dWZWeHVRR3RsZVdaeVlXMWxjeUJ6YUdGa2IzY3RjSFZzYzJWN01DVjdZbTk0TFhOb1lXUnZkem93SURBZ01DQXdjSGdnY21kaVlTZ3lOVFVzSURJMU5Td2dNalUxTENBd0xqWXBPMzFjYmpJMUpYdGliM2d0YzJoaFpHOTNPakFnTUNBd0lERXdjSGdnY21kaVlTZzBNQ3dnTVRZMUxDQTNOU3dnTUM0MUtUdDlYRzQxTUNWN1ltOTRMWE5vWVdSdmR6b3dJREFnTUNBeE5YQjRJSEpuWW1Fb05EQXNJREV5Tnl3Z01UWTFMQ0F3TGpRcE8zMWNiamMxSlh0aWIzZ3RjMmhoWkc5M09qQWdNQ0F3SURCd2VDQnlaMkpoS0RFMk5Td2dNVEE0TENBME1Dd2dNQzR5S1R0OVhHNHhNREFsZTJKdmVDMXphR0ZrYjNjNk1DQXdJREFnTXpWd2VDQnlaMkpoS0RBc0lEQXNJREkxTlN3Z01DazdmVnh1ZlZ4dVFHdGxlV1p5WVcxbGN5QnphR0ZrYjNjdGQyaHBkR1Y3TUNWN1ltOTRMWE5vWVdSdmR6b3dJREFnTUNBd2NIZ2djbWRpWVNneU5UVXNJREkxTlN3Z01qVTFMQ0F3TGpZcE8zMWNiakV3TUNWN1ltOTRMWE5vWVdSdmR6b3dJREFnTUNBek5YQjRJSEpuWW1Fb01Dd2dNQ3dnTUN3Z01DazdmVnh1ZlNKZGZRPT0gKi9cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJpbXBvcnQgY2xvc2VHYWxsZXJ5IGZyb20gJy4vc2NyaXB0L2Nsb3NlR2FsbGVyeS5qcyc7XG5pbXBvcnQgb3BlbkdhbGxlcnkgZnJvbSAnLi9zY3JpcHQvb3BlbkdhbGxlcnkuanMnO1xuaW1wb3J0ICcuL3N0eWxlL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBpbml0LCBnYWxsZXJ5V3JhcExlZnQsIGdhbGxlcnlXcmFwUmlnaHQsIHNlbGVjdEl0ZW0gfSBmcm9tICcuL3NjcmlwdC9pbWFnZVBpY2tlci5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNsb3NlR2FsbGVyeSgpO1xuICBvcGVuR2FsbGVyeSgpO1xuICBpbml0KCk7XG4gIHNlbGVjdEl0ZW0oKTtcbiAgZ2FsbGVyeVdyYXBMZWZ0KCk7XG4gIGdhbGxlcnlXcmFwUmlnaHQoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb3NlR2FsbGVyeSAoKSB7XG5cdGxldCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdHYWxsZXJ5LUJ1dHRvbl9jbG9zZWQnKVswXSxcblx0XHRcdGJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdCb2R5RGl2aXNvckJsYWNrLU1haW5Hcm91cCcpWzBdLFxuXHRcdFx0Z2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0dhbGxlcnknKVswXTtcblx0YnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG5cdFx0Z2FsbGVyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGJhY2tncm91bmQuc3R5bGUuZmlsdGVyID0gJ25vbmUnO1xuXHR9XG59XG4iLCJjb25zdCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkdhbGxlcnktU2xpZGVyUHJldmlldycpO1xuY29uc3QgZ2FsbGVyeUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnktaXRlbScpO1xuY29uc3QgbnVtT2ZJdGVtcyA9IGdhbGxlcnkuY2hpbGRyZW4ubGVuZ3RoO1xuY29uc3QgaXRlbVdpZHRoID0gMjM7IC8vIHBlcmNlbnQ6IGFzIHNldCBpbiBjc3NcbmNvbnN0IGZlYXR1cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlYXR1cmVkLWl0ZW0nKTtcblxuXG5jb25zdCBzZWxlY3RJdGVtID0gKGUpID0+IHtcblx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcblxuXHRmZWF0dXJlZC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYWxsZXJ5SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoZ2FsbGVyeUl0ZW1zW2ldLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpXG5cdFx0XHRnYWxsZXJ5SXRlbXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdH1cblxuXHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbn1cblxuY29uc3QgZ2FsbGVyeVdyYXBMZWZ0ID0gKCkgPT4ge1xuXHRsZXQgZmlyc3QgPSBnYWxsZXJ5LmNoaWxkcmVuWzBdO1xuXHRnYWxsZXJ5LnJlbW92ZUNoaWxkKGZpcnN0KTtcblx0Z2FsbGVyeS5zdHlsZS5sZWZ0ID0gLWl0ZW1XaWR0aCArICclJztcblx0Z2FsbGVyeS5hcHBlbmRDaGlsZChmaXJzdCk7XG5cdGdhbGxlcnkuc3R5bGUubGVmdCA9ICcwJSc7XG59XG5cbmNvbnN0IGdhbGxlcnlXcmFwUmlnaHQgPSAoKSA9PiB7XG5cdGxldCBsYXN0ID0gZ2FsbGVyeS5jaGlsZHJlbltnYWxsZXJ5LmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuXHRnYWxsZXJ5LnJlbW92ZUNoaWxkKGxhc3QpO1xuXHRnYWxsZXJ5Lmluc2VydEJlZm9yZShsYXN0LCBnYWxsZXJ5LmNoaWxkcmVuWzBdKTtcblx0Z2FsbGVyeS5zdHlsZS5sZWZ0ID0gJy0yMyUnO1xufVxuXG5cbi8vU3RhcnQgdGhpcyBiYWJ5IHVwXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuXHRsZXQgaW1hZ2VzID0gW1xuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEuanBnJyxcblx0XHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3MyLmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzMy5qcGcnLFxuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczQuanBnJyxcblx0XHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3M1LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzNi5qcGcnLFxuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczcuanBnJyxcblx0XHQnLi4vLi4vc3JjL2ltZy9iaWcvZ3JhcGhpY3M4LmpwZycsXG5cdFx0Jy4uLy4uL3NyYy9pbWcvYmlnL2dyYXBoaWNzOS5qcGcnLFxuXHRcdCcuLi8uLi9zcmMvaW1nL2JpZy9ncmFwaGljczEwLmpwZydcblx0XTtcblxuXHQvL1NldCBJbml0aWFsIEZlYXR1cmVkIEltYWdlXG5cdGZlYXR1cmVkLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGltYWdlc1swXSArICcpJztcblxuXHQvL1NldCBJbWFnZXMgZm9yIEdhbGxlcnkgYW5kIEFkZCBFdmVudCBMaXN0ZW5lcnNcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYWxsZXJ5SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRnYWxsZXJ5SXRlbXNbaV0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgaW1hZ2VzW2ldICsgJyknO1xuXHRcdGdhbGxlcnlJdGVtc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEl0ZW0pO1xuXHR9XG59O1xuZXhwb3J0IHsgaW5pdCwgZ2FsbGVyeVdyYXBMZWZ0LCBnYWxsZXJ5V3JhcFJpZ2h0LCBzZWxlY3RJdGVtIH07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcGVuR2FsbGVyeSAoKSB7XG5cdGxldCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdCdXR0b25fb3BlbmVkJylbMF0sXG5cdCBcdFx0YmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0JvZHlEaXZpc29yQmxhY2stTWFpbkdyb3VwJylbMF0sXG5cdFx0XHRnYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnR2FsbGVyeScpWzBdO1xuXHRidXR0b24ub25jbGljayA9ICgpID0+IHtcblx0XHRnYWxsZXJ5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdFx0YmFja2dyb3VuZC5zdHlsZS5maWx0ZXIgPSAnYmx1cig1cHgpJztcblx0fVxufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==