new Vue(
  {
    el: '#app',
    data: {
      myAPIkey: '82fbba05b468f27f3de54198de8c8f5f',
      stringToSearchFor: '',
      moviesList: []
    },
    methods: {
      searchFor() {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.myAPIkey + '&query=' + this.stringToSearchFor + '&language=it-IT').then((resp) => {
          //console.log(resp.data.results);
          this.moviesList = resp.data.results;
        })
      }
    }
  }
);