/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script/cGallery.js":
/*!********************************!*\
  !*** ./src/script/cGallery.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () {\n  var button = document.getElementsByClassName('close-button')[0];\n\n  button.onclick = function () {\n    document.getElementsByClassName('gallery')[0].style.display = 'none';\n  };\n};\n\n//# sourceURL=webpack:///./src/script/cGallery.js?");

/***/ }),

/***/ "./src/script/gallery.js":
/*!*******************************!*\
  !*** ./src/script/gallery.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () {\n  var button = document.getElementsByClassName('button')[0];\n\n  button.onclick = function () {\n    document.getElementsByClassName('gallery')[0].style.display = 'flex';\n  };\n};\n\n//# sourceURL=webpack:///./src/script/gallery.js?");

/***/ }),

/***/ "./src/script/imagePicker.js":
/*!***********************************!*\
  !*** ./src/script/imagePicker.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () {\n  var img = document.getElementByTagName(\"image\")[0];\n  var att = document.createAttribute(\"class\");\n  att.value = \"image\";\n\n  img.onclick = function () {\n    img.setAttributeNode(att);\n  };\n};\n\n//# sourceURL=webpack:///./src/script/imagePicker.js?");

/***/ }),

/***/ "./src/script/index.js":
/*!*****************************!*\
  !*** ./src/script/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cGallery = __webpack_require__(/*! ./cGallery.js */ \"./src/script/cGallery.js\");\n\nvar gallery = __webpack_require__(/*! ./gallery.js */ \"./src/script/gallery.js\");\n\nvar pickerWheel = __webpack_require__(/*! ./pickerWheel.js */ \"./src/script/pickerWheel.js\");\n\nvar imagePicker = __webpack_require__(/*! ./imagePicker.js */ \"./src/script/imagePicker.js\");\n\nwindow.onload = function () {\n  cGallery();\n  gallery();\n  pickerWheel();\n  imagePicker();\n};\n\n//# sourceURL=webpack:///./src/script/index.js?");

/***/ }),

/***/ "./src/script/pickerWheel.js":
/*!***********************************!*\
  !*** ./src/script/pickerWheel.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () {\n  var art = document.getElementsByClassName('photo-select-three')[0],\n      oil = document.getElementsByClassName('photo-select-one')[0],\n      graph = document.getElementsByClassName('photo-select-two')[0];\n  graph.setAttribute(\"class\", \"select-block\");\n\n  art.onclick = function () {\n    document.getElementsByClassName('graphics-block')[0].style.display = 'none';\n    document.getElementsByClassName('art-block')[0].style.display = 'flex';\n    graph.removeAttribute(\"class\", \"select-block\");\n    art.setAttribute(\"class\", \"select-block\");\n  };\n\n  graph.onclick = function () {\n    document.getElementsByClassName('graphics-block')[0].style.display = 'flex';\n    document.getElementsByClassName('art-block')[0].style.display = 'none';\n    graph.setAttribute(\"class\", \"select-block\");\n    art.removeAttribute(\"class\", \"select-block\");\n  };\n};\n\n//# sourceURL=webpack:///./src/script/pickerWheel.js?");

/***/ })

/******/ });