/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_store_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var app = Vue.createApp({
  data: function data() {
    return {
      email: '',
      password: '',
      submitted: false,
      emailValid: true,
      // Dodanie właściwości do przechowywania informacji o poprawności adresu email
      passwordValid: true,
      // Dodanie właściwości do przechowywania informacji o poprawności hasła
      passwordErrorMessage: '',
      topTenShows: [],
      images: [],
      cart: [],
      // Tablica koszyka, logika z main.js
      showConfirmation: false,
      itemIdToRemove: null
    };
  },
  created: function created() {
    this.fetchTopTenShows();
    var cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
  },
  computed: {
    totalPrice: function totalPrice() {
      return this.cart.reduce(function (total, item) {
        return total + parseFloat(item.price || 0);
      }, 0).toFixed(2);
    }
  },
  methods: {
    fetchTopTenShows: function fetchTopTenShows() {
      var _this = this;
      var request = axios.get('https://api.tvmaze.com/shows');
      request.then(function (response) {
        var topTenShows = response.data.filter(function (show) {
          return show.rating.average;
        }).sort(function (a, b) {
          return b.rating.average - a.rating.average;
        }).slice(0, 10);
        _this.topTenShows = topTenShows;
        // Fetch images for top ten shows
        _this.fetchImagesForTopTenShows(topTenShows);
      })["catch"](function (error) {
        console.error('Error fetching top ten shows:', error);
      });
    },
    fetchImagesForTopTenShows: function fetchImagesForTopTenShows(topTenShows) {
      var _this2 = this;
      topTenShows.forEach(function (show) {
        axios.get("https://api.tvmaze.com/shows/".concat(show.id, "/images")).then(function (response) {
          var _this2$images;
          // Filter out non-poster images and add to the images array
          var posters = response.data.filter(function (image) {
            return image.type === 'poster';
          });
          (_this2$images = _this2.images).push.apply(_this2$images, _toConsumableArray(posters));
        })["catch"](function (error) {
          console.error('Error fetching images for show:', show.id, error);
        });
      });
    },
    addToCart: function addToCart(show) {
      // Sprawdzenie, czy dany film już istnieje w koszyku
      var exists = this.cart.some(function (item) {
        return item.id === show.id;
      });
      if (!exists) {
        // Dodanie ceny do obiektu filmu
        var showWithPrice = _objectSpread(_objectSpread({}, show), {}, {
          price: 5.99
        }); // Dodanie pola price z wartością 5.99
        // Dodanie filmu do koszyka
        this.cart.push(showWithPrice);
        // Zapisanie koszyka w localStorage
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateTotalPrice();
      }
    },
    updateItemPrice: function updateItemPrice(show, newPrice) {
      var item = this.cart.find(function (item) {
        return item.id === show.id;
      });
      if (item) {
        item.price = newPrice;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateTotalPrice();
      }
    },
    updateTotalPrice: function updateTotalPrice() {
      var total = this.cart.reduce(function (total, item) {
        return total + parseFloat(item.price || 0);
      }, 0);
      localStorage.setItem("totalPrice", total.toFixed(2));
    },
    showPopup: function showPopup(itemId) {
      this.itemIdToRemove = itemId;
      this.showConfirmation = true;
    },
    cancelRemove: function cancelRemove() {
      this.showConfirmation = false;
      this.itemIdToRemove = null;
      // Ukrycie modala przy kliknięciu przycisku "Cancel"
      $("#removeFromCartModal").modal("hide");
    },
    removeFromCart: function removeFromCart(showId) {
      this.cart = this.cart.filter(function (item) {
        return item.id !== showId;
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
      // Ukrycie modala po usunięciu przedmiotu z koszyka
      $("#removeFromCartModal").modal("hide");
      this.updateTotalPrice();
    },
    login: function login() {
      this.submitted = true;
      // Resetowanie komunikatów o błędach
      this.passwordErrorMessage = '';
      this.emailErrorMessage = '';
      // Walidacja adresu email
      if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailValid = false;
      } else {
        this.emailValid = true;
      }
      // Walidacja hasła
      if (!this.password || this.password.length < 8) {
        this.passwordErrorMessage = 'Password must be at least 8 characters long.';
        this.passwordValid = false;
        inputPassword.classList.remove('is-valid'); // Usunięcie klasy is-valid
      } else {
        this.passwordValid = true;
      }
      // Sprawdzenie, czy oba pola spełniają kryteria walidacji
      if (this.emailValid && this.passwordValid) {
        console.log('Logged in with:', this.email, this.password);
        // Wyświetlenie komunikatu o pomyślnym zalogowaniu
        alert('Successfully logged in!');
        // Zamykanie modalu po wyświetleniu komunikatu
        $("#loginModal").modal("hide");
        this.clearForm();
      }
    },
    clearForm: function clearForm() {
      // Czyszczenie danych formularza
      this.email = '';
      this.password = '';
      this.submitted = false;
      this.emailValid = true;
      this.passwordValid = true;
      this.passwordErrorMessage = '';
      this.emailErrorMessage = '';
      // Usunięcie klas is-invalid i is-valid
      var inputEmail = document.getElementById('inputEmail');
      var inputPassword = document.getElementById('inputPassword');
      inputEmail.classList.remove('is-invalid', 'is-valid');
      inputPassword.classList.remove('is-invalid', 'is-valid');
    }
  }
});
app.mount('#app');
})();

/******/ })()
;
//# sourceMappingURL=store.a6daad904e225d7fbefa.bundle.js.map