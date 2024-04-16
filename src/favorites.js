const app = Vue.createApp({
  data() {
    return {
      topTenShows: [],
      favorites: [],
      showLoginModal: false,
      cart: [],
      showCartAnimation: false,
      showAlreadyInCartAlert: null, // Dodajemy właściwość do przechowywania informacji o wyświetleniu komunikatu "Film znajduje się już w koszyku!"
    };
  },
  computed:{
    totalPrice() {
      // Sprawdzenie, czy wszystkie filmy w koszyku posiadają właściwość price
      const hasPrice = this.cart.every(
        (item) => item.hasOwnProperty("price") && !isNaN(item.price)
      );

      if (!hasPrice) {
        console.error("Some items in the cart do not have a valid price.");
        return "N/A";
      }

      // Obliczanie całkowitej ceny na podstawie sumy cen filmów w koszyku
      const total = this.cart.reduce(
        (total, item) => total + parseFloat(item.price),
        0
      );
      return total.toFixed(2);
    },
  },
  created() {
    this.fetchTopTenShows();
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
  },
  methods: {
    fetchTopTenShows() {
      axios
        .get("https://api.tvmaze.com/shows")
        .then((response) => {
          const topTenShows = response.data
            .filter((show) => show.rating && show.rating.average)
            .sort((a, b) => b.rating.average - a.rating.average)
            .slice(0, 10);
          this.topTenShows = topTenShows;
        })
        .catch((error) => {
          console.error("Error fetching top ten shows:", error);
        });
    },
    removeFromFavorites(showId) {
      this.favorites = this.favorites.filter((show) => show.id !== showId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    addToFavorites(show) {
      // Sprawdzenie czy dany film już istnieje w ulubionych
      const exists = this.favorites.some((favorite) => favorite.id === show.id);
      if (!exists) {
        // Dodanie filmu do ulubionych
        this.favorites.push(show);
        // Zapisanie ulubionych w localStorage
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        // Zaktualizowanie licznika na serduszku
        const countElement = document.querySelector(".count span");
        if (countElement) {
          countElement.textContent =
            parseInt(countElement.textContent || 0) + 1;
        }
        // Dodanie animacji do ikony serduszka
        const heartIcon = document.querySelector(".fa-heart");
        if (heartIcon) {
          heartIcon.classList.add("animate__animated", "animate__heartBeat");
          setTimeout(() => {
            heartIcon.classList.remove(
              "animate__animated",
              "animate__heartBeat"
            );
          }, 10000); // Usunięcie animacji po 10 sekundzie
        }
      }
    },
    // Dodajemy metodę do usuwania filmów z ulubionych
    removeFromFavorites(showId) {
      this.favorites = this.favorites.filter((show) => show.id !== showId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    addToCart(show) {
      // Sprawdzenie, czy dany film już istnieje w koszyku
      const exists = this.cart.some((item) => item.id === show.id);

      // Domyślna cena dla filmu, gdy cena nie jest dostępna w danych z API
      const defaultPrice = 9.99;

      if (!exists) {
        // Dodanie ceny do obiektu filmu, jeśli nie jest dostępna w danych z API
        const showWithPrice = { ...show, price: show.price || defaultPrice };

        // Dodanie filmu do koszyka
        this.cart.push(showWithPrice);

        // Zapisanie koszyka w localStorage
        localStorage.setItem("cart", JSON.stringify(this.cart));
        // Pokaż animację koszyka
    // Pokaż animację koszyka tylko dla dodanego produktu
    this.showCartAnimation = show.id;
    setTimeout(() => {
      this.showCartAnimation = false;
    }, 1000); // Ukryj animację po 3 sekundach
      } else {
        // Wyświetl komunikat, że film znajduje się już w koszyku
    this.showAlreadyInCartAlert = true;
    setTimeout(() => {
      this.showAlreadyInCartAlert = null;
    }, 1000); // Ukryj komunikat po 1 sekundzie
      }
    },
    removeFromCart(showId) {
      this.cart = this.cart.filter((item) => item.id !== showId);
      localStorage.setItem("cart", JSON.stringify(this.cart));
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
