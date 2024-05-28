import "./css/checkout.css";

const app = Vue.createApp({
  data() {
    return {
      email: '',
      submitted: false,
      emailValid: true, // Właściwość do przechowywania informacji o poprawności adresu email
      topTenShows: [],
      images: [],
      cart: [], // Tablica koszyka, logika z main.js
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        country: '',
        agree: false
      },
      errors: {},
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
      request.then((response) => {
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
        const showWithPrice = { ...show, price: 5.99 }; // Dodanie pola price z wartością 5.99
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
    validateForm() {
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
    },
    submitForm() {
      this.validateForm();
      console.log('Errors after validation:', this.errors);

      // If there are no errors, you can proceed with form submission
      if (Object.keys(this.errors).length === 0) {
        alert('Order complete!');
        // Proceed with form submission
        console.log('Form submitted successfully');
      } else {
        console.log('Form submission blocked due to errors.');
      }
    },
  }
});
app.mount('#app');

/////////////////////////////////////////////////////////////

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
