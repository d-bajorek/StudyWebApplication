// import axios from 'axios';

fetch("https://api.tvmaze.com/shows").then((response) =>
  response.json().then((response2) => console.log(response2))
);

const app = Vue.createApp({
  data() {
    return {
      topTenShows: [],
      allShows: [], // Nowa tablica dla wszystkich filmów
      originalAllShows: [], // Oryginalne dane wszystkich filmów
      currentPage: 1, // Numer aktualnie wyświetlanej strony
      pageSize: 12, // Liczba filmów wyświetlanych na jednej stronie
      favorites: [], // Tablica ulubionych seriali przechowywana w localStorage
      searchQuery: "",
      selectedCategory: "All", // Wybrana kategoria
      filteredAllShows: [], // Tablica dla filtrowanych filmów
      originalGenres: [], // Dodajemy właściwość przechowującą oryginalną listę kategorii filmów
      displayedGenres: [], // Lista wyświetlanych kategorii filmów
      showDetails: null // Dodajemy właściwość do przechowywania szczegółowych informacji o wybranym show
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
  },
  created() {
    this.fetchTopTenShows();
    this.fetchAllShows();
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      this.favorites = JSON.parse(favoritesFromStorage);
    }
    this.originalGenres = this.genres.slice();
    this.displayedGenres = ['All', ...this.originalGenres];
  },
  methods: {
    fetchTopTenShows() {
      axios
        .get("https://api.tvmaze.com/shows")
        .then((response) => {
          const topTenShows = response.data
            .filter((show) => show.rating && show.rating.average)
            .sort((a, b) => b.rating.average - a.rating.average)
            .slice(0, 9);
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
      const exists = this.favorites.some(favorite => favorite.id === show.id);
      if (!exists) {
        // Dodanie filmu do ulubionych
        this.favorites.push(show);
        // Zapisanie ulubionych w localStorage
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        // Zaktualizowanie licznika na serduszku
    const countElement = document.querySelector(".count span");
    if (countElement) {
      countElement.textContent = parseInt(countElement.textContent || 0) + 1;
        }
        // Dodanie animacji do ikony serduszka
    const heartIcon = document.querySelector(".fa-heart");
    if (heartIcon) {
      heartIcon.classList.add("animate__animated", "animate__heartBeat");
      setTimeout(() => {
        heartIcon.classList.remove("animate__animated", "animate__heartBeat");
      }, 1000); // Usunięcie animacji po 1 sekundzie
    }
      }
    },
    filterFilms(category) {
      this.selectedCategory = category;
      this.displayedGenres =
        category === "All" ? this.originalGenres : [category];
    },
    resetCategory() {
      this.selectedCategory = 'All';
      this.displayedGenres = ['All', ...this.originalGenres];
    },
    // Metoda do pobierania szczegółowych informacji o wybranym show
    fetchShowDetails(showId) {
      axios
        .get(`https://api.tvmaze.com/shows/${showId}`)
        .then((response) => {
          // Wyświetlanie szczegółowych informacji w modalu
          this.showDetailsModal(response.data);
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
  },
});

app.mount("#app");

// zaczynam modyfikacje

// TOGGLE LOGIN BUTTON
document
  .getElementById("toggleLoginBtn")
  .addEventListener("click", function () {
    // Przełączanie klasy show na kontenerze formularza logowania
    document.getElementById("loginContainer").classList.toggle("show");
  });
