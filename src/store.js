import "./css/store.css";

const app = Vue.createApp({
  data() {
      return {
        email: '',
        password: '',
        submitted: false,
        emailValid: true, // Dodajemy właściwość do przechowywania informacji o poprawności adresu email
        passwordValid: true, // Dodajemy właściwość do przechowywania informacji o poprawności hasła
        passwordErrorMessage: '',
        topTenShows: [],
        images: [],
        cart: [], // Tablica koszyka, logika z main.js
        
      showConfirmation: false,
      itemIdToRemove: null,
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
      return this.cart.reduce(
        (total, item) => total + parseFloat(item.price || 0),
        0
      ).toFixed(2);
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
            const showWithPrice = { ...show, price: 5.99 }; // Dodanie pola price z wartością 5.99
            // Dodanie filmu do koszyka
            this.cart.push(showWithPrice);
            // Zapisanie koszyka w localStorage
            localStorage.setItem("cart", JSON.stringify(this.cart));
            this.updateTotalPrice();
        }
    },
    updateItemPrice(show, newPrice) {
      const item = this.cart.find(item => item.id === show.id);
      if (item) {
        item.price = newPrice;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.updateTotalPrice();
      }
    },
    updateTotalPrice() {
      const total = this.cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
      localStorage.setItem("totalPrice", total.toFixed(2));
    },
    showPopup(itemId) {
      this.itemIdToRemove = itemId;
      this.showConfirmation = true;
    },
    cancelRemove() {
      this.showConfirmation = false;
      this.itemIdToRemove = null;
      // Ukrycie modala przy kliknięciu przycisku "Cancel"
      $("#removeFromCartModal").modal("hide");
    },
    removeFromCart(showId) {
      this.cart = this.cart.filter(item => item.id !== showId);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      // Ukrycie modala po usunięciu przedmiotu z koszyka
      $("#removeFromCartModal").modal("hide");
      this.updateTotalPrice();
      
    },

      login() {
      
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
      clearForm() {
    // Czyszczenie danych formularza
    this.email = '';
    this.password = '';
    this.submitted = false;
    this.emailValid = true;
    this.passwordValid = true;
    this.passwordErrorMessage = '';
    this.emailErrorMessage = '';
    // Usunięcie klas is-invalid i is-valid
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    inputEmail.classList.remove('is-invalid', 'is-valid');
    inputPassword.classList.remove('is-invalid', 'is-valid');
  },

  }
});

app.mount('#app');