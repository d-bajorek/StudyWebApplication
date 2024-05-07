/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4:
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
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
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
// import axios from 'axios';

// fetch("https://api.tvmaze.com/shows").then((response) =>
//   response.json().then((response2) => console.log(response2))
// );


var app = Vue.createApp({
  data: function data() {
    return {
      topTenShows: [],
      allShows: [],
      // Nowa tablica dla wszystkich filmów
      originalAllShows: [],
      // Oryginalne dane wszystkich filmów
      currentPage: 1,
      // Numer aktualnie wyświetlanej strony
      pageSize: 12,
      // Liczba filmów wyświetlanych na jednej stronie
      favorites: [],
      // Tablica ulubionych seriali przechowywana w localStorage
      cart: [],
      // Tablica seriali dodanych do koszyka przechowywana w localStorage
      searchQuery: "",
      selectedCategory: "All",
      // Wybrana kategoria
      filteredAllShows: [],
      // Tablica dla filtrowanych filmów
      originalGenres: [],
      // Dodajemy właściwość przechowującą oryginalną listę kategorii filmów
      displayedGenres: [],
      // Lista wyświetlanych kategorii filmów
      showDetails: null,
      // Dodajemy właściwość do przechowywania szczegółowych informacji o wybranym show
      // reszta danych pozostaje bez zmian
      showCast: [],
      // Dodajemy pole przechowujące informacje o obsadzie
      showCartAnimation: false,
      showAlreadyInCartAlert: null,
      // Dodajemy właściwość do przechowywania informacji o wyświetleniu komunikatu "Film znajduje się już w koszyku!"
      email: '',
      password: '',
      submitted: false,
      emailValid: true,
      // Dodajemy właściwość do przechowywania informacji o poprawności adresu email
      passwordValid: true,
      // Dodajemy właściwość do przechowywania informacji o poprawności hasła
      passwordErrorMessage: '',
      languages: ["English", "French", "German", "Spanish", "Italian", "Japanese", "Other"],
      newMovie: {
        name: '',
        status: '',
        language: ''
        // Dodaj inne pola, jeśli są wymagane
      }
    };
  },
  // Obliczenia związane z danymi
  computed: {
    // Metoda zwracająca podzbior seriali na aktualnie wyświetlanej stronie
    paginatedShows: function paginatedShows() {
      var startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredShows.slice(startIndex, startIndex + this.pageSize);
    },
    // Metoda zwracająca liczbę wszystkich stron
    totalPages: function totalPages() {
      return Math.ceil(this.filteredShows.length / this.pageSize);
    },
    filteredShows: function filteredShows() {
      var _this = this;
      var filtered = this.originalAllShows;
      if (this.selectedCategory !== "All") {
        filtered = filtered.filter(function (show) {
          return show.genres.includes(_this.selectedCategory);
        });
      }
      if (this.searchQuery) {
        var regex = new RegExp(this.searchQuery.toLowerCase(), "i");
        filtered = filtered.filter(function (show) {
          return regex.test(show.name.toLowerCase());
        });
      }
      return filtered;
    },
    genres: function genres() {
      var genresSet = new Set();
      this.allShows.forEach(function (show) {
        show.genres.forEach(function (genre) {
          return genresSet.add(genre);
        });
      });
      return Array.from(genresSet);
    },
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
  created: function created() {
    this.fetchTopTenShows();
    this.fetchAllShows();
    var favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
    var cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
    this.originalGenres = this.genres.slice();
    this.displayedGenres = ["All"].concat(_toConsumableArray(this.originalGenres));
  },
  methods: {
    fetchTopTenShows: function fetchTopTenShows() {
      var _this2 = this;
      axios.get("https://api.tvmaze.com/shows").then(function (response) {
        var topTenShows = response.data.filter(function (show) {
          return show.rating && show.rating.average;
        }).sort(function (a, b) {
          return b.rating.average - a.rating.average;
        }).slice(0, 10);
        _this2.topTenShows = topTenShows;
      })["catch"](function (error) {
        console.error("Error fetching top ten shows:", error);
      });
    },
    fetchAllShows: function fetchAllShows() {
      var _this3 = this;
      axios.get("https://api.tvmaze.com/shows").then(function (response) {
        _this3.allShows = response.data;
        _this3.originalAllShows = response.data;
      })["catch"](function (error) {
        console.error("Error fetching all shows:", error);
      });
    },
    searchShows: function searchShows() {
      // Implementacja filtrowania filmów na podstawie frazy wyszukiwania
      // Zakomentuję, ponieważ filtracja odbywa się w computed property filteredShows
    },
    addToFavorites: function addToFavorites(show) {
      // Sprawdzenie czy dany film już istnieje w ulubionych
      var exists = this.favorites.some(function (favorite) {
        return favorite.id === show.id;
      });
      if (!exists) {
        // Dodanie filmu do ulubionych
        this.favorites.push(show);
        // Zapisanie ulubionych w localStorage
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        // Zaktualizowanie licznika na serduszku
        var countElement = document.querySelector(".count span");
        if (countElement) {
          countElement.textContent = parseInt(countElement.textContent || 0) + 1;
        }
        // Dodanie animacji do ikony serduszka
        var heartIcon = document.querySelector(".fa-heart");
        if (heartIcon) {
          heartIcon.classList.add("animate__animated", "animate__heartBeat");
          setTimeout(function () {
            heartIcon.classList.remove("animate__animated", "animate__heartBeat");
          }, 10000); // Usunięcie animacji po 10 sekundzie
        }
      }
    },
    // Dodajemy metodę do usuwania filmów z ulubionych
    removeFromFavorites: function removeFromFavorites(showId) {
      this.favorites = this.favorites.filter(function (show) {
        return show.id !== showId;
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    addToCart: function addToCart(show) {
      var _this4 = this;
      // Sprawdzenie, czy dany film już istnieje w koszyku
      var exists = this.cart.some(function (item) {
        return item.id === show.id;
      });

      // Domyślna cena dla filmu, gdy cena nie jest dostępna w danych z API
      var defaultPrice = 9.99;
      if (!exists) {
        // Dodanie ceny do obiektu filmu, jeśli nie jest dostępna w danych z API
        var showWithPrice = _objectSpread(_objectSpread({}, show), {}, {
          price: show.price || defaultPrice
        });

        // Dodanie filmu do koszyka
        this.cart.push(showWithPrice);

        // Zapisanie koszyka w localStorage
        localStorage.setItem("cart", JSON.stringify(this.cart));
        // Pokaż animację koszyka
        // Pokaż animację koszyka tylko dla dodanego produktu
        this.showCartAnimation = show.id;
        setTimeout(function () {
          _this4.showCartAnimation = false;
        }, 1000); // Ukryj animację po 3 sekundach
      } else {
        // Wyświetl komunikat, że film znajduje się już w koszyku
        this.showAlreadyInCartAlert = true;
        setTimeout(function () {
          _this4.showAlreadyInCartAlert = null;
        }, 1000); // Ukryj komunikat po 1 sekundzie
      }
    },
    removeFromCart: function removeFromCart(showId) {
      this.cart = this.cart.filter(function (item) {
        return item.id !== showId;
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    filterFilms: function filterFilms(category) {
      this.selectedCategory = category;
      this.displayedGenres = category === "All" ? this.originalGenres : [category];
    },
    resetCategory: function resetCategory() {
      this.selectedCategory = "All";
      this.displayedGenres = ["All"].concat(_toConsumableArray(this.originalGenres));
    },
    // Dodajemy funkcję sortowania
    sortShows: function sortShows(option) {
      var sortedShows = _toConsumableArray(this.originalAllShows);
      switch (option) {
        case "oldest":
          sortedShows.sort(function (a, b) {
            return new Date(a.premiered) - new Date(b.premiered);
          });
          break;
        case "newest":
          sortedShows.sort(function (a, b) {
            return new Date(b.premiered) - new Date(a.premiered);
          });
          break;
        case "az":
          sortedShows.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          break;
        case "za":
          sortedShows.sort(function (a, b) {
            return b.name.localeCompare(a.name);
          });
          break;
        default:
          // Domyślne sortowanie według kolejności w tablicy
          sortedShows = _toConsumableArray(this.allShows);
          break;
      }
      // Przypisujemy posortowane filmy do filteredShows
      this.originalAllShows = sortedShows;
    },
    resetSort: function resetSort() {
      // Resetujemy sortowanie do domyślnego
      this.originalAllShows = _toConsumableArray(this.allShows);
    },
    // Metoda do pobierania szczegółowych informacji o wybranym show
    fetchShowDetails: function fetchShowDetails(showId) {
      var _this5 = this;
      axios.get("https://api.tvmaze.com/shows/".concat(showId)).then(function (response) {
        // Wyświetlanie szczegółowych informacji w modalu
        _this5.showDetailsModal(response.data);
        _this5.fetchShowCast(showId); // Dodajemy pobieranie informacji o obsadzie
      })["catch"](function (error) {
        console.error("Error fetching show details:", error);
      });
    },
    // Metoda wyświetlająca modal z danymi o show
    showDetailsModal: function showDetailsModal(showData) {
      // Ustawianie danych showDetails, które wykorzystamy do wyświetlenia w modalu
      this.showDetails = showData;
      // Pokazanie modala
      $("#showDetailsModal").modal("show");
    },
    fetchShowCast: function fetchShowCast(showId) {
      var _this6 = this;
      axios.get("https://api.tvmaze.com/shows/".concat(showId, "/cast")).then(function (response) {
        _this6.showCast = response.data;
      })["catch"](function (error) {
        console.error("Error fetching show cast:", error);
      });
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
    addNewMovie: function addNewMovie() {
      // Dodaj nowy film do listy wszystkich filmów
      var newMovie = {
        name: this.newMovie.name,
        image: this.newMovie.image,
        genre: this.newMovie.genre,
        status: this.newMovie.status,
        language: this.newMovie.language
        // Dodaj inne pola, jeśli są wymagane
      };

      // Dodajemy nowy film do listy wszystkich filmów
      this.allShows.push(newMovie);

      // Następnie możesz zamknąć modal
      $('#addMovieModal').modal('hide');
    }
  }
});
app.mount("#app");
})();

/******/ })()
;
//# sourceMappingURL=main.71634b0828c215b9c08d.bundle.js.map