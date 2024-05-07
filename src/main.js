
// import axios from 'axios';

// fetch("https://api.tvmaze.com/shows").then((response) =>
//   response.json().then((response2) => console.log(response2))
// );

//import "./css/main.css";

const app = Vue.createApp({
  data() {
    return {
      topTenShows: [],
      allShows: [], // Nowa tablica dla wszystkich filmów
      originalAllShows: [], // Oryginalne dane wszystkich filmów
      currentPage: 1, // Numer aktualnie wyświetlanej strony
      pageSize: 12, // Liczba filmów wyświetlanych na jednej stronie
      favorites: [], // Tablica ulubionych seriali przechowywana w localStorage
      cart: [], // Tablica seriali dodanych do koszyka przechowywana w localStorage
      searchQuery: "",
      selectedCategory: "All", // Wybrana kategoria
      filteredAllShows: [], // Tablica dla filtrowanych filmów
      originalGenres: [], // Dodajemy właściwość przechowującą oryginalną listę kategorii filmów
      displayedGenres: [], // Lista wyświetlanych kategorii filmów
      showDetails: null, // Dodajemy właściwość do przechowywania szczegółowych informacji o wybranym show
      // reszta danych pozostaje bez zmian
      showCast: [], // Dodajemy pole przechowujące informacje o obsadzie
      showCartAnimation: false,
      showAlreadyInCartAlert: null, // Dodajemy właściwość do przechowywania informacji o wyświetleniu komunikatu "Film znajduje się już w koszyku!"
      email: '',
      password: '',
      submitted: false,
      emailValid: true, // Dodajemy właściwość do przechowywania informacji o poprawności adresu email
      passwordValid: true, // Dodajemy właściwość do przechowywania informacji o poprawności hasła
      passwordErrorMessage: '',
      languages: ["English", "French", "German", "Spanish", "Italian", "Japanese", "Other"],
      newMovie: {
        name: '',
        status: '',
        language: '',
        // Dodaj inne pola, jeśli są wymagane
      },
    };
  },
  // Obliczenia związane z danymi
  computed: {
    // Metoda zwracająca podzbior seriali na aktualnie wyświetlanej stronie
    paginatedShows() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredShows.slice(startIndex, startIndex + this.pageSize);
    },
    // Metoda zwracająca liczbę wszystkich stron
    totalPages() {
      return Math.ceil(this.filteredShows.length / this.pageSize);
    },
    filteredShows() {
      let filtered = this.originalAllShows;
      if (this.selectedCategory !== "All") {
        filtered = filtered.filter((show) =>
          show.genres.includes(this.selectedCategory)
        );
      }
      if (this.searchQuery) {
        const regex = new RegExp(this.searchQuery.toLowerCase(), "i");
        filtered = filtered.filter((show) =>
          regex.test(show.name.toLowerCase())
        );
      }
      return filtered;
    },
    genres() {
      const genresSet = new Set();
      this.allShows.forEach((show) => {
        show.genres.forEach((genre) => genresSet.add(genre));
      });
      return Array.from(genresSet);
    },
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
    this.fetchAllShows();
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
    this.originalGenres = this.genres.slice();
    this.displayedGenres = ["All", ...this.originalGenres];
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
    fetchAllShows() {
      axios
        .get("https://api.tvmaze.com/shows")
        .then((response) => {
          this.allShows = response.data;
          this.originalAllShows = response.data;
        })
        .catch((error) => {
          console.error("Error fetching all shows:", error);
        });
    },
    searchShows() {
      // Implementacja filtrowania filmów na podstawie frazy wyszukiwania
      // Zakomentuję, ponieważ filtracja odbywa się w computed property filteredShows
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
    filterFilms(category) {
      this.selectedCategory = category;
      this.displayedGenres =
        category === "All" ? this.originalGenres : [category];
    },
    resetCategory() {
      this.selectedCategory = "All";
      this.displayedGenres = ["All", ...this.originalGenres];
    },
    // Dodajemy funkcję sortowania
    sortShows(option) {
      let sortedShows = [...this.originalAllShows];
      switch (option) {
        case "oldest":
          sortedShows.sort(
            (a, b) => new Date(a.premiered) - new Date(b.premiered)
          );
          break;
        case "newest":
          sortedShows.sort(
            (a, b) => new Date(b.premiered) - new Date(a.premiered)
          );
          break;
        case "az":
          sortedShows.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "za":
          sortedShows.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Domyślne sortowanie według kolejności w tablicy
          sortedShows = [...this.allShows];
          break;
      }
      // Przypisujemy posortowane filmy do filteredShows
      this.originalAllShows = sortedShows;
    },
    resetSort() {
      // Resetujemy sortowanie do domyślnego
      this.originalAllShows = [...this.allShows];
    },
    // Metoda do pobierania szczegółowych informacji o wybranym show
    fetchShowDetails(showId) {
      axios
        .get(`https://api.tvmaze.com/shows/${showId}`)
        .then((response) => {
          // Wyświetlanie szczegółowych informacji w modalu
          this.showDetailsModal(response.data);
          this.fetchShowCast(showId); // Dodajemy pobieranie informacji o obsadzie
        })
        .catch((error) => {
          console.error("Error fetching show details:", error);
        });
    },
    // Metoda wyświetlająca modal z danymi o show
    showDetailsModal(showData) {
      // Ustawianie danych showDetails, które wykorzystamy do wyświetlenia w modalu
      this.showDetails = showData;
      // Pokazanie modala
      $("#showDetailsModal").modal("show");
    },
    fetchShowCast(showId) {
      axios
        .get(`https://api.tvmaze.com/shows/${showId}/cast`)
        .then((response) => {
          this.showCast = response.data;
        })
        .catch((error) => {
          console.error("Error fetching show cast:", error);
        });
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
addNewMovie() {
  // Dodaj nowy film do listy wszystkich filmów
      const newMovie = {
        name: this.newMovie.name,
        image: this.newMovie.image,
        genre: this.newMovie.genre,
        status: this.newMovie.status,
        language: this.newMovie.language
        // Dodaj inne pola, jeśli są wymagane
      };

  // Dodajemy nowy film do listy wszystkich filmów
  this.allShows.push(newMovie);


  // Następnie możesz zamknąć modal
  $('#addMovieModal').modal('hide');
},
    
  },
  
});

app.mount("#app");
