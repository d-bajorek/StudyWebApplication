/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var app = Vue.createApp({
  data: function data() {
    return {
      favorites: []
    };
  },
  methods: {
    removeFromFavorites: function removeFromFavorites(showId) {
      this.favorites = this.favorites.filter(function (show) {
        return show.id !== showId;
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  },
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
//# sourceMappingURL=favorites.901c7038a1305e3ae0b8.bundle.js.map