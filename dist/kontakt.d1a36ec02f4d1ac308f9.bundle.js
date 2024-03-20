/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var app = Vue.createApp({
  data: function data() {
    return {
      topTenShows: []
    };
  },
  created: function created() {
    this.fetchTopTenShows();
  },
  methods: {
    fetchTopTenShows: function fetchTopTenShows() {
      var _this = this;
      fetch('https://api.tvmaze.com/shows').then(function (response) {
        return response.json();
      }).then(function (data) {
        var topTenShows = data.filter(function (show) {
          return show.rating.average;
        }).sort(function (a, b) {
          return b.rating.average - a.rating.average;
        }).slice(0, 9);
        _this.topTenShows = topTenShows;
      })["catch"](function (error) {
        console.error('Error fetching top ten shows:', error);
      });
    }
  }
});
app.mount('#app');
/******/ })()
;
//# sourceMappingURL=kontakt.d1a36ec02f4d1ac308f9.bundle.js.map