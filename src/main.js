
// import axios from 'axios';

// fetch("https://api.tvmaze.com/shows").then((response) =>
//   response.json().then((response2) => console.log(response2))
// );

import "./css/main.css";

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
      searchShow: "",
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
      languages: ["English", "French", "German", "Spanish", "Italian", "Japanese", "Turkish", "Korean", "Other"],
      newMovie: {
        name: "",
        status: "",
        language: "",
        genres: [],
        image: null, // Dodajemy pole image
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
      if (this.searchShow) {
        const regex = new RegExp(this.searchShow.toLowerCase(), "i");
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
    // Sprawdzenie, czy istnieją dane w localStorage
  const storedShows = localStorage.getItem("allShows");
  if (storedShows) {
    // Jeśli tak, parsujemy je i aktualizujemy listę allShows
    this.allShows = JSON.parse(storedShows);
    this.originalAllShows = [...this.allShows];
  } else {
    // W przeciwnym razie inicjalizujemy listę na podstawie danych z API
    this.fetchAllShows();
  }
  
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage);
    }
  
    // Wczytaj listę filmów z localStorage do allShows
    const allShowsFromStorage = localStorage.getItem("allShows");
    if (allShowsFromStorage) {
      this.allShows = JSON.parse(allShowsFromStorage);
      this.originalAllShows = [...this.allShows];
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
        // Dodanie animacji do przycisku
      const button = event.target;
      button.classList.add('animate');

      // Usunięcie animacji po zakończeniu animacji
      setTimeout(() => {
        button.classList.remove('animate');
      }, 600); // Długość trwania animacji w milisekundach
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
      const defaultPrice = 5.99;

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
    // W metodzie fetchShowDetails sprawdź, czy isNew dla danego filmu wynosi false przed próbą pobrania szczegółów z API
fetchShowDetails(showId) {
  const show = this.allShows.find(show => show.id === showId);
  if (show && !show.isNew) {
    // Wywołaj funkcję pobierającą szczegóły tylko jeśli film nie jest nowy
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => {
        // Wyświetlanie szczegółowych informacji w modalu
        this.showDetailsModal(response.data);
        this.fetchShowCast(showId);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
      });
  } else {
    // Obsłuż przypadek, gdy film jest nowy
    console.log("This is a newly added movie, no need to fetch details from API.");
  }
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
  console.log("New movie data:", this.newMovie);

  // Sprawdzamy, czy film o takiej samej nazwie już istnieje
  const existingMovie = this.allShows.find(movie => movie.name === this.newMovie.name);
  
  if (existingMovie) {
    // Jeśli film już istnieje, wyświetlamy odpowiedni komunikat
    alert("This show already exists on the list!");
    return; // Przerywamy działanie metody, aby nie dodawać duplikatu filmu
  }

  // Dodajemy domyślny obraz, jeśli użytkownik nie wprowadził obrazu
  if (!this.newMovie.image) {
    this.newMovie.image = {
      medium: '/assets/img/place-holder.png' // Zmieniamy ścieżkę obrazu na place-holder.svg
    };
  }

  // Ustawienie pola isNew na true dla nowo dodanych filmów
  this.newMovie.isNew = true;

  // Dodajemy nowy film do listy wszystkich filmów
  this.allShows.push({...this.newMovie});
  this.originalAllShows = [...this.allShows]; // Aktualizacja originalAllShows

  // Zapisujemy zaktualizowaną listę filmów do localStorage
  localStorage.setItem("allShows", JSON.stringify(this.allShows));

   // Aktualizacja filteredShows po dodaniu nowego filmu
   this.filteredAllShows = [...this.allShows];

  this.clearAddMovie();

  // Zamykanie modalu po jego wyczyszczeniu
  $('#addMovieModal').modal('hide');
},

validateAndAddMovie() {
    if (
      !this.newMovie.name ||
      !this.newMovie.genres.length ||
      !this.newMovie.status ||
      !this.newMovie.language
    ) {
      // Wyświetl komunikat błędu jeśli jakieś pole jest puste
      alert("Please fill in all fields");
      return;
    }

    // Dodaj nowy film do listy jeśli wszystkie pola są wypełnione
    this.addNewMovie();  
  },
  
clearAddMovie(){
  this.newMovie = {
    name:"",
    genres:[],
    status:"",
    language:"",
  }
},
    
  },
  
});

app.mount("#app");