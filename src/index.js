import { style } from "./css/index.scss";
import Icon from "./assets/img/bag-seedling.png";
import axios from 'axios';

/////////////////////////////////////////////

document
  .getElementById("toggleLoginBtn")
  .addEventListener("click", function () {
    // Przełączanie klasy show na kontenerze formularza logowania
    document.getElementById("loginContainer").classList.toggle("show");
  });


  // TOP TEN FILMS
  fetch('https://api.tvmaze.com/shows')
  .then(blob => blob.json())
  .then(json => {
      const topTenShows = json
      .filter(show => show.rating.average) 
      .sort((a, b) => a.rating.average > b.rating.average ? -1 : 1) 
      .slice(0, 9) // tar element 0-9 i arrayen

  return topTenShows
})
.then(shows => {
  const topTen = document.getElementById('topTen');

  // Tworzymy div z klasą "row" dla Bootstrap Grid
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Iterujemy przez wszystkie programy i dodajemy je jako kolumny w siatce Bootstrapa
  shows.forEach(show => {
      // Tworzymy div z klasą "col" dla każdego programu
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-sm-4'); // Możesz dostosować szerokość kolumny wg potrzeb, np. col-sm-4 dla małych ekranów

      // Tworzymy treść HTML dla każdego programu
      colDiv.innerHTML = `
          <div class="movie-content">
              <img src="${show.image.medium}">
              <div class="movie-info">
                  <h5>${show.name}</h5>
                  <span>Rating: ${show.rating.average}</span>
                  <br />
                  <span>Rating: ${show.genres}</span>
              </div>
          </div>
      `;

      // Dodajemy kolumnę do wiersza
      rowDiv.appendChild(colDiv);
  });

  // Dodajemy wiersz do kontenera topTen
  topTen.appendChild(rowDiv);
});


// SLIDER
// Pobierz dane ze wskazanego URL
fetch("https://api.tvmaze.com/shows/1/images")
  .then((response) => response.json()) // Przekształć odpowiedź na format JSON
  .then((data) => {
    // Przetwórz otrzymane dane
    const carouselInner = document.querySelector(".carousel-inner");

    data.forEach((image, index) => {
      // Pobierz URL obrazu w rozmiarze medium
      const imageUrl = image.resolutions.medium.url;

      // Utwórz element <div> dla każdego obrazu i dodaj odpowiednie klasy CSS
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      // Utwórz element <img> dla każdego obrazu i ustaw atrybut src
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.classList.add("d-block", "w-5");

      // Dodaj <img> do <div> dla slidu
      carouselItem.appendChild(imgElement);

      // Dodaj <div> dla slidu do kontenera dla slidu
      carouselInner.appendChild(carouselItem);
    });

    // Ustaw wskaźniki dla slidu
    const carouselIndicators = document.querySelector(".carousel-indicators");
    data.forEach((_, index) => {
      // Utwórz element <li> dla każdego obrazu i dodaj odpowiednie atrybuty
      const indicator = document.createElement("li");
      indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
      indicator.setAttribute("data-bs-slide-to", index);
      if (index === 0) {
        indicator.classList.add("active");
      }

      // Dodaj <li> do listy wskaźników
      carouselIndicators.appendChild(indicator);
    });
  })
  .catch((error) => {
    console.error("Wystąpił błąd podczas pobierania danych:", error);
  });
