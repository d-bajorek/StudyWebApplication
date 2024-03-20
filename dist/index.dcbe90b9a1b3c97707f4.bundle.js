/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "28808fe017a3f4f1bd21.png";

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _assets_img_bag_seedling_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);




/////////////////////////////////////////////

document.getElementById("toggleLoginBtn").addEventListener("click", function () {
  // Przełączanie klasy show na kontenerze formularza logowania
  document.getElementById("loginContainer").classList.toggle("show");
});

// TOP TEN FILMS
fetch('https://api.tvmaze.com/shows').then(function (blob) {
  return blob.json();
}).then(function (json) {
  var topTenShows = json.filter(function (show) {
    return show.rating.average;
  }).sort(function (a, b) {
    return a.rating.average > b.rating.average ? -1 : 1;
  }).slice(0, 9); // tar element 0-9 i arrayen

  return topTenShows;
}).then(function (shows) {
  var topTen = document.getElementById('topTen');

  // Tworzymy div z klasą "row" dla Bootstrap Grid
  var rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Iterujemy przez wszystkie programy i dodajemy je jako kolumny w siatce Bootstrapa
  shows.forEach(function (show) {
    // Tworzymy div z klasą "col" dla każdego programu
    var colDiv = document.createElement('div');
    colDiv.classList.add('col-sm-4'); // Możesz dostosować szerokość kolumny wg potrzeb, np. col-sm-4 dla małych ekranów

    // Tworzymy treść HTML dla każdego programu
    colDiv.innerHTML = "\n          <div class=\"movie-content\">\n              <img src=\"".concat(show.image.medium, "\">\n              <div class=\"movie-info\">\n                  <h5>").concat(show.name, "</h5>\n                  <span>Rating: ").concat(show.rating.average, "</span>\n                  <br />\n                  <span>Rating: ").concat(show.genres, "</span>\n              </div>\n          </div>\n      ");

    // Dodajemy kolumnę do wiersza
    rowDiv.appendChild(colDiv);
  });

  // Dodajemy wiersz do kontenera topTen
  topTen.appendChild(rowDiv);
});

// SLIDER
// Pobierz dane ze wskazanego URL
fetch("https://api.tvmaze.com/shows/1/images").then(function (response) {
  return response.json();
}) // Przekształć odpowiedź na format JSON
.then(function (data) {
  // Przetwórz otrzymane dane
  var carouselInner = document.querySelector(".carousel-inner");
  data.forEach(function (image, index) {
    // Pobierz URL obrazu w rozmiarze medium
    var imageUrl = image.resolutions.medium.url;

    // Utwórz element <div> dla każdego obrazu i dodaj odpowiednie klasy CSS
    var carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    // Utwórz element <img> dla każdego obrazu i ustaw atrybut src
    var imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("d-block", "w-5");

    // Dodaj <img> do <div> dla slidu
    carouselItem.appendChild(imgElement);

    // Dodaj <div> dla slidu do kontenera dla slidu
    carouselInner.appendChild(carouselItem);
  });

  // Ustaw wskaźniki dla slidu
  var carouselIndicators = document.querySelector(".carousel-indicators");
  data.forEach(function (_, index) {
    // Utwórz element <li> dla każdego obrazu i dodaj odpowiednie atrybuty
    var indicator = document.createElement("li");
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to", index);
    if (index === 0) {
      indicator.classList.add("active");
    }

    // Dodaj <li> do listy wskaźników
    carouselIndicators.appendChild(indicator);
  });
})["catch"](function (error) {
  console.error("Wystąpił błąd podczas pobierania danych:", error);
});
})();

/******/ })()
;
//# sourceMappingURL=index.dcbe90b9a1b3c97707f4.bundle.js.map