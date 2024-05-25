import "./css/koszyk.css"

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
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
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
        }
        
    },
      removeFromCart(showId) {
        this.cart = this.cart.filter(item => item.id !== showId);
        localStorage.setItem("cart", JSON.stringify(this.cart));
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
  submitForm() {
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
    if (!this.formData.password) {
      this.errors.password = 'Please provide a password';
    } else if (this.formData.password.length < 5) {
      this.errors.password = 'Your password must be at least 5 characters long';
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

    // If there are no errors, you can proceed with form submission
    if (Object.keys(this.errors).length === 0) {
      // Proceed with form submission
      console.log('Form submitted successfully');
    }
  },
  }
});

app.mount('#app');

$(document).ready(function () {
  // Inicjalizacja walidacji formularza
  $("form").validate({
    rules: {
      inputFirstName: "required",
      inputLastName: "required",
      inputEmail4: {
        required: true,
        email: true,
      },
      inputPassword4: {
        required: true,
        minlength: 5,
      },
      inputAddress: "required",
      inputCity: "required",
      inputState: "required",
      gridCheck: "required",
    },
    messages: {
      inputFirstName: "Please enter your first name",
      inputLastName: "Please enter your last name",
      inputEmail4: {
        required: "Please enter your email address",
        email: "Please enter a valid email address",
      },
      inputPassword4: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
      },
      inputAddress: "Please enter your address",
      inputCity: "Please enter your city",
      inputState: "Please select your country",
      gridCheck: "Please accept the terms & conditions",
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Dodawanie klasy bootstrapowej do błędu
      error.addClass("invalid-feedback");
      // Dodawanie błędu po elemencie formularza
      error.insertAfter(element);
    },
    highlight: function (element, errorClass, validClass) {
      // Zmiana wyglądu pola przy błędzie
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      // Zmiana wyglądu pola po poprawnej walidacji
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
  });
});
/////////////////////////////////////////////////////////////
const selectElement = document.querySelector("select");
const table = document.querySelector("table");

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
