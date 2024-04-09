const app = Vue.createApp({
  data() {
      return {
          topTenShows: [],
          images: [],
          cart: [], // Tablica koszyka, logika z main.js
      };
  },
  created() {
      this.fetchTopTenShows();
      const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
  },
  computed: {
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
  methods: {
      fetchTopTenShows() {
          let request = axios.get('https://api.tvmaze.com/shows');
              request.then((response) =>  {
                  const topTenShows = response.data
                      .filter(show => show.rating.average)
                      .sort((a, b) => b.rating.average - a.rating.average)
                      .slice(0, 10);
                  this.topTenShows = topTenShows;
                  // Fetch images for top ten shows
                  this.fetchImagesForTopTenShows(topTenShows);
              })
              .catch(error => {
                  console.error('Error fetching top ten shows:', error);
              });
      },
      fetchImagesForTopTenShows(topTenShows) {
        topTenShows.forEach(show => {
            axios.get(`https://api.tvmaze.com/shows/${show.id}/images`)
                .then(response => {
                    // Filter out non-poster images and add to the images array
                    const posters = response.data.filter(image => image.type === 'poster');
                    this.images.push(...posters);
                })
                .catch(error => {
                    console.error('Error fetching images for show:', show.id, error);
                });
        });
    },
    addToCart(show) {
        // Sprawdzenie, czy dany film już istnieje w koszyku
        const exists = this.cart.some(item => item.id === show.id);
        if (!exists) {
            // Dodanie ceny do obiektu filmu
            const showWithPrice = { ...show, price: 9.99 }; // Dodanie pola price z wartością 9.99
            // Dodanie filmu do koszyka
            this.cart.push(showWithPrice);
            // Zapisanie koszyka w localStorage
            localStorage.setItem("cart", JSON.stringify(this.cart));
        }
    },
      removeFromCart(showId) {
        this.cart = this.cart.filter(item => item.id !== showId);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
  }
});

app.mount('#app');