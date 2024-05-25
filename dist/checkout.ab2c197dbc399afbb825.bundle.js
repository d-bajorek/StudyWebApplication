/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
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
/* harmony import */ var _css_koszyk_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
      // Dodajemy właściwość do przechowywania informacji o poprawności adresu email
      passwordValid: true,
      // Dodajemy właściwość do przechowywania informacji o poprawności hasła
      passwordErrorMessage: '',
      topTenShows: [],
      images: [],
      cart: [],
      // Tablica koszyka, logika z main.js
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        address2: '',
        city: '',
        country: '',
        agree: false
      },
      errors: {}
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
      // Sprawdzenie, czy wszystkie filmy w koszyku posiadają właściwość price
      var hasPrice = this.cart.every(function (item) {
        return item.hasOwnProperty("price") && !isNaN(item.price);
      });
      if (!hasPrice) {
        console.error("Some items in the cart do not have a valid price.");
        return "N/A";
      }

      // Obliczanie całkowitej ceny na podstawie sumy cen filmów w koszyku
      var total = this.cart.reduce(function (total, item) {
        return total + parseFloat(item.price);
      }, 0);
      return total.toFixed(2);
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
      }
    },
    removeFromCart: function removeFromCart(showId) {
      this.cart = this.cart.filter(function (item) {
        return item.id !== showId;
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
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
        // Tutaj można dodać logikę logowania
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
    },
    submitForm: function submitForm() {
      this.errors = {};
      if (!this.formData.firstName) {
        this.errors.firstName = 'Please enter your first name';
      }
      if (!this.formData.lastName) {
        this.errors.lastName = 'Please enter your last name';
      }
      if (!this.formData.email) {
        this.errors.email = 'Please enter your email address';
      } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
        this.errors.email = 'Please enter a valid email address';
      }
      if (!this.formData.password) {
        this.errors.password = 'Please provide a password';
      } else if (this.formData.password.length < 5) {
        this.errors.password = 'Your password must be at least 5 characters long';
      }
      if (!this.formData.address) {
        this.errors.address = 'Please enter your address';
      }
      if (!this.formData.city) {
        this.errors.city = 'Please enter your city';
      }
      if (!this.formData.country) {
        this.errors.country = 'Please select your country';
      }
      if (!this.formData.agree) {
        this.errors.agree = 'Please accept the terms & conditions';
      }

      // If there are no errors, you can proceed with form submission
      if (Object.keys(this.errors).length === 0) {
        // Proceed with form submission
        console.log('Form submitted successfully');
      }
    }
  }
});
app.mount('#app');
$(document).ready(function () {
  // Inicjalizacja walidacji formularza
  $("form").validate({
    rules: {
      inputFirstName: "required",
      inputLastName: "required",
      inputEmail4: {
        required: true,
        email: true
      },
      inputPassword4: {
        required: true,
        minlength: 5
      },
      inputAddress: "required",
      inputCity: "required",
      inputState: "required",
      gridCheck: "required"
    },
    messages: {
      inputFirstName: "Please enter your first name",
      inputLastName: "Please enter your last name",
      inputEmail4: {
        required: "Please enter your email address",
        email: "Please enter a valid email address"
      },
      inputPassword4: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      inputAddress: "Please enter your address",
      inputCity: "Please enter your city",
      inputState: "Please select your country",
      gridCheck: "Please accept the terms & conditions"
    },
    errorElement: "em",
    errorPlacement: function errorPlacement(error, element) {
      // Dodawanie klasy bootstrapowej do błędu
      error.addClass("invalid-feedback");
      // Dodawanie błędu po elemencie formularza
      error.insertAfter(element);
    },
    highlight: function highlight(element, errorClass, validClass) {
      // Zmiana wyglądu pola przy błędzie
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function unhighlight(element, errorClass, validClass) {
      // Zmiana wyglądu pola po poprawnej walidacji
      $(element).addClass("is-valid").removeClass("is-invalid");
    }
  });
});
/////////////////////////////////////////////////////////////
var selectElement = document.querySelector("select");
var table = document.querySelector("table");

// // Lista krajów:
// fetch("https://restcountries.com/v2/all")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((country) => {
//       const option = document.createElement("option");
//       option.text = country.name;
//       selectElement.add(option);
//     });
//   });
})();

/******/ })()
;
//# sourceMappingURL=checkout.ab2c197dbc399afbb825.bundle.js.map