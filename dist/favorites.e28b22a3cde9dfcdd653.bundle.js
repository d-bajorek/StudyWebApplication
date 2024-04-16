/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var app = Vue.createApp({
  data: function data() {
    return {
      topTenShows: [],
      favorites: [],
      showLoginModal: false,
      cart: [],
      showCartAnimation: false,
      showAlreadyInCartAlert: null // Dodajemy właściwość do przechowywania informacji o wyświetleniu komunikatu "Film znajduje się już w koszyku!"
    };
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
  created: function created() {
    this.fetchTopTenShows();
    var favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
    var cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
  },
  methods: _defineProperty(_defineProperty(_defineProperty({
    fetchTopTenShows: function fetchTopTenShows() {
      var _this = this;
      axios.get("https://api.tvmaze.com/shows").then(function (response) {
        var topTenShows = response.data.filter(function (show) {
          return show.rating && show.rating.average;
        }).sort(function (a, b) {
          return b.rating.average - a.rating.average;
        }).slice(0, 10);
        _this.topTenShows = topTenShows;
      })["catch"](function (error) {
        console.error("Error fetching top ten shows:", error);
      });
    },
    removeFromFavorites: function removeFromFavorites(showId) {
      this.favorites = this.favorites.filter(function (show) {
        return show.id !== showId;
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
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
    }
  }, "removeFromFavorites", function removeFromFavorites(showId) {
    this.favorites = this.favorites.filter(function (show) {
      return show.id !== showId;
    });
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }), "addToCart", function addToCart(show) {
    var _this2 = this;
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
        _this2.showCartAnimation = false;
      }, 1000); // Ukryj animację po 3 sekundach
    } else {
      // Wyświetl komunikat, że film znajduje się już w koszyku
      this.showAlreadyInCartAlert = true;
      setTimeout(function () {
        _this2.showAlreadyInCartAlert = null;
      }, 1000); // Ukryj komunikat po 1 sekundzie
    }
  }), "removeFromCart", function removeFromCart(showId) {
    this.cart = this.cart.filter(function (item) {
      return item.id !== showId;
    });
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }),
  mounted: function mounted() {
    var favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
  }
});
app.mount("#app");
/******/ })()
;
//# sourceMappingURL=favorites.e28b22a3cde9dfcdd653.bundle.js.map