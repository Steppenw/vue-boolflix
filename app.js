new Vue(
  {
    el: '#app',
    data: {
      myAPIkey: '82fbba05b468f27f3de54198de8c8f5f',
      stringToSearchFor: '',
      moviesList: [],
      tvShowsList: []
    },
    methods: {
      axiosSearch(byType) {

        const axiosOptions = {
          params: {
            api_key: this.myAPIkey,
            query: this.stringToSearchFor,
            language: 'it-IT'
          }
        };

        axios.get('https://api.themoviedb.org/3/search/' + byType, axiosOptions).then((resp) => {
          //console.log(resp.data);
          if (byType === 'movie') {
            this.moviesList = resp.data.results;
            //console.log(this.moviesList);
          }
          else if (byType === 'tv') {
            this.tvShowsList = resp.data.results.map((tvShow) => {
              tvShow.original_title = tvShow.original_name;
              tvShow.title = tvShow.name;

              return tvShow;
            });
            //console.log(this.tvShowsList);
          }
        });
      },

      searchFor() {
        this.axiosSearch('movie');
        this.axiosSearch('tv');
      }
      /*searchFor() {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.myAPIkey + '&query=' + this.stringToSearchFor + '&language=it-IT').then((resp) => {
          //console.log(resp.data.results);
          this.moviesList = resp.data.results;
        })
      }*/
    }
  }
);