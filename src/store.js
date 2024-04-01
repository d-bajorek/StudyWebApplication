const app = Vue.createApp({
  data() {
      return {
          topTenShows: [],
          images: [],
          
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
  }
});

app.mount('#app');