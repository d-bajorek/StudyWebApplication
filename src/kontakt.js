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