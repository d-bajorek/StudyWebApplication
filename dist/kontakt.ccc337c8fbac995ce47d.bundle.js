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
      var request = axios.get('https://api.tvmaze.com/shows');
      request.then(function (response) {
        var topTenShows = response.data.filter(function (show) {
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
//# sourceMappingURL=kontakt.ccc337c8fbac995ce47d.bundle.js.map