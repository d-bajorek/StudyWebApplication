/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var app = Vue.createApp({
  data: function data() {
    return {
      topTenShows: [],
      images: []
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
    }
  }
});
app.mount('#app');
/******/ })()
;
//# sourceMappingURL=store.400c79b875a8431f8730.bundle.js.map