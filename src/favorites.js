const app = Vue.createApp({
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    removeFromFavorites(showId) {
      this.favorites = this.favorites.filter((show) => show.id !== showId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
  mounted() {
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
  },
});

app.mount("#app");
