// import axios from 'axios';

fetch("https://api.tvmaze.com/shows").then(response => response.json().then(response2 => console.log(response2)));

// TOP TEN FILMS
// fetch('https://api.tvmaze.com/shows')
// .then(blob => blob.json())
// .then(json => {
//     const topTenShows = json
//     .filter(show => show.rating.average) 
//     .sort((a, b) => a.rating.average > b.rating.average ? -1 : 1) 
//     .slice(0, 9) // tar element 0-9 i arrayen

// return topTenShows
// })
// .then(shows => {
// const topTen = document.getElementById('topTen');

// // Tworzymy div z klasą "row" dla Bootstrap Grid
// const rowDiv = document.createElement('div');
// rowDiv.classList.add('row');

// // Iterujemy przez wszystkie programy i dodajemy je jako kolumny w siatce Bootstrapa
// shows.forEach(show => {
//     // Tworzymy div z klasą "col" dla każdego programu
//     const colDiv = document.createElement('div');
//     colDiv.classList.add('col-sm-4'); // Możesz dostosować szerokość kolumny wg potrzeb, np. col-sm-4 dla małych ekranów

//     // Tworzymy treść HTML dla każdego programu
//     colDiv.innerHTML = `
//         <div class="movie-content">
//             <img src="${show.image.medium}">
//             <div class="movie-info">
//                 <h5>${show.name}</h5>
//                 <span>Rating: ${show.rating.average}</span>
//                 <br />
//                 <span>Genres: ${show.genres}</span>
//             </div>
//         </div>
//     `;

//     // Dodajemy kolumnę do wiersza
//     rowDiv.appendChild(colDiv);
// });

// // Dodajemy wiersz do kontenera topTen
// topTen.appendChild(rowDiv);
// });

const app = Vue.createApp({
  data() {
      return {
          topTenShows: []
      };
  },
  created() {
      this.fetchTopTenShows();
  },
  methods: {
      fetchTopTenShows() {
          fetch('https://api.tvmaze.com/shows')
              .then(response => response.json())
              .then(data => {
                  const topTenShows = data
                      .filter(show => show.rating.average)
                      .sort((a, b) => b.rating.average - a.rating.average)
                      .slice(0, 9);
                  this.topTenShows = topTenShows;
              })
              .catch(error => {
                  console.error('Error fetching top ten shows:', error);
              });
      }
  }
});

app.mount('#app');

// TOGGLE LOGIN BUTTON 
document
  .getElementById("toggleLoginBtn")
  .addEventListener("click", function () {
    // Przełączanie klasy show na kontenerze formularza logowania
    document.getElementById("loginContainer").classList.toggle("show");
  });
