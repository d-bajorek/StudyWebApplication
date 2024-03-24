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
          let request = axios.get('https://api.tvmaze.com/shows');
              request.then((response) =>  {
                  const topTenShows = response.data
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