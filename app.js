new Vue(
  {
    el: '#app',
    data: {
      myAPIkey: '82fbba05b468f27f3de54198de8c8f5f',
      stringToSearchFor: '',
      moviesList: [],
      tvShowsList: [],
      completeList: []
    },
    methods: {
      axiosSearch(byType) {

        if (this.stringToSearchFor === '') {
          return
        }

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
          
          this.completeList = this.moviesList.concat(this.tvShowsList);
          //console.log(this.completeList);

          this.completeList.forEach((movie) => {
            this.$set(movie, 'fullStars', 0);
            this.$set(movie, 'emptyStars', 0);
          })
  
          this.voteToStars();
        });
      },

      searchFor() {
        this.axiosSearch('movie');
        this.axiosSearch('tv');
      },
      /*searchFor() {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.myAPIkey + '&query=' + this.stringToSearchFor + '&language=it-IT').then((resp) => {
          //console.log(resp.data.results);
          this.moviesList = resp.data.results;
        })
      }*/

      voteToStars() {
        this.completeList.forEach((movie) => {
          movie.fullStars = Math.ceil(movie.vote_average / 2);
          movie.emptyStars = 5 - movie.fullStars;
        })
      }
    }
  }
);