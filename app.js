new Vue(
  {
    el: '#app',
    data: {
      myAPIkey: '82fbba05b468f27f3de54198de8c8f5f',
      stringToSearchFor: '',
      moviesList: [],
      tvShowsList: [],
      completeList: [],
      searching: false
    },
    methods: {
      axiosSearch(byType) {

        if (this.stringToSearchFor === '') {
          return
        }

        this.searching = true;

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

            const tempMoviesList = [];

            for (let i=0; i<resp.data.results.length; i++) {
              //console.log(resp.data.results[i]);
              tempMoviesList.push(resp.data.results[i]);
            }
            //console.log('tempMoviesList', tempMoviesList);

            if (tempMoviesList.length === resp.data.results.length) {
              this.moviesList = tempMoviesList;
            }
            //console.log('moviesList', this.moviesList);
          }
          else if (byType === 'tv') {

            const tempTvShowsList = [];

            for (let i=0; i<resp.data.results.length; i++) {
              //console.log(resp.data.results[i]);
              tempTvShowsList.push(resp.data.results[i]);
            }
            //console.log('tempTvShowsList', tempTvShowsList);

            if (tempTvShowsList.length === resp.data.results.length) {

              this.tvShowsList = tempTvShowsList.map((tvShow) => {
                tvShow.original_title = tvShow.original_name;
                tvShow.title = tvShow.name;

                return tvShow;
              });
            }
            //console.log('tvShowsList', this.tvShowsList);

            /*this.tvShowsList = resp.data.results.map((tvShow) => {
              tvShow.original_title = tvShow.original_name;
              tvShow.title = tvShow.name;

              return tvShow;
            });
            //console.log(this.tvShowsList);*/
          }
          
          this.completeList = this.moviesList.concat(this.tvShowsList);
          //console.log(this.completeList);

          this.searching = false;

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

      flagOf(origLang) {

        const flagsMap = {
          'en': 'us',
          'it': 'it',
          'es': 'es'
        }

        if (flagsMap[origLang]) {
          return `flag-icon-${flagsMap[origLang]}`;
        }
        else {
          return '';
        }
      },

      voteToStars() {
        this.completeList.forEach((movie) => {
          movie.fullStars = Math.ceil(movie.vote_average / 2);
          movie.emptyStars = 5 - movie.fullStars;
        })
      }
    }
  }
);