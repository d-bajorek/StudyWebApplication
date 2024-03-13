import { style } from "./css/index.scss";
import Icon from "./assets/img/bag-seedling.png";

/////////////////////////////////////////////

document
  .getElementById("toggleLoginBtn")
  .addEventListener("click", function () {
    // Przełączanie klasy show na kontenerze formularza logowania
    document.getElementById("loginContainer").classList.toggle("show");
  });

// const selectElement = document.querySelector("select");
// const table = document.querySelector("table");

// fetch ("https://api.tvmaze.com/shows/1/images")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((country) => {
//       const option = document.createElement("option");
//       option.text = country.name;
//       selectElement.add(option);
//     });
//   });

// Pobierz dane ze wskazanego URL
// Pobierz dane ze wskazanego URL
    fetch('https://api.tvmaze.com/shows/1/images')
      .then(response => response.json()) // Przekształć odpowiedź na format JSON
      .then(data => {
        // Przetwórz otrzymane dane
        const carouselInner = document.querySelector('.carousel-inner');

        data.forEach((image, index) => {
          // Pobierz URL obrazu w rozmiarze medium
          const imageUrl = image.resolutions.medium.url;

          // Utwórz element <div> dla każdego obrazu i dodaj odpowiednie klasy CSS
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');
          if (index === 0) {
            carouselItem.classList.add('active');
          }

          // Utwórz element <img> dla każdego obrazu i ustaw atrybut src
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.classList.add('d-block', 'w-5');

          // Dodaj <img> do <div> dla slidu
          carouselItem.appendChild(imgElement);

          // Dodaj <div> dla slidu do kontenera dla slidu
          carouselInner.appendChild(carouselItem);
        });

        // Ustaw wskaźniki dla slidu
        const carouselIndicators = document.querySelector('.carousel-indicators');
        data.forEach((_, index) => {
          // Utwórz element <li> dla każdego obrazu i dodaj odpowiednie atrybuty
          const indicator = document.createElement('li');
          indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
          indicator.setAttribute('data-bs-slide-to', index);
          if (index === 0) {
            indicator.classList.add('active');
          }

          // Dodaj <li> do listy wskaźników
          carouselIndicators.appendChild(indicator);
        });
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
      });
