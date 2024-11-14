<template>
  <div class="p-10">
    <div>
      <div class=" w-36 h-2 bg-[#E74C3C]"/>
      <p class=" text-4xl font-semibold mt-3">Movies</p>
    </div>
    <div class="grid grid-cols-5 mt-16 gap-5">
      <div>
        <MovieFilter
          :genre-list="movieGenres"
          @input="loadMoviesWithGenre"
          v-model="genreOptions"
        />
        <button @click="checkGenre">Check</button>
      </div>
      <div class="grid grid-cols-4 col-span-4 gap-5">
        <MovieCardDiscover
          v-for="movie in movieList"
          :key="movie.id"
          :movie-detail="movie"
          @movie-card-action="redirectToMovieDetail"
        />
      </div>
    </div>
    <div class="grid grid-cols-5 mt-16">
      <div>
      </div>
      <div class="col-span-4 gap-5 text-center">
        <button
          :disabled="loadingMoreData"
          @click="loadMovies"
          class="bg-red-600 capitalize rounded-full px-5 py-1"
        >
          {{ loadingMoreData ? 'Loading...' : 'Load more data' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardDiscover from '../../components/MovieCardComponent/MovieCardDiscover.vue';
import MovieFilter from '../../components/MovieFilter.vue';

export default {
  components: {
    MovieCardDiscover,
    MovieFilter,
  },
  data() {
    return {
      currentPage: 1,
      selectedOption: '',
      genreOptions: [],
    }
  },
  mounted() {
    const payload = {
      page: this.currentPage,
    };

    this.$store.dispatch('movies/getMovieGenre');
    this.$store.dispatch('movies/filteredMovie', payload);
  },
  computed: {
    movieList() {
      return this.$store.state.movies.movieListFiltered;
    },
    movieGenres() {
      return this.$store.state.movies.movieGenres;
    },
    loadingMoreData() {
      return this.$store.state.movies.moreDataLoading;
    },
  },
  methods: {
    redirectToMovieDetail(movieData) {
      const { movieId, movieName } = movieData;
      const splitted = movieName.split(' ');
      const movieNameSerialized = splitted.join('-');

      this.$router.push({ path: `/movie/${movieNameSerialized}`, query: { movieId } });
    },
    loadMovies() {
      this.currentPage += 1;

      const payload = {
        page: this.currentPage,
      };

      if (this.genreOptions.length > 0) {
        Object.assign(payload, { with_genres: this.checkGenre() });
      }

      this.$store.dispatch('movies/filteredMovie', payload);
    },
    loadMoviesWithGenre() {
      const payload = {
        page: 1,
      };

      if (this.genreOptions.length > 0) {
        Object.assign(payload, { with_genres: this.checkGenre() });
      }

      this.$store.dispatch('movies/filteredMovie', payload);
    },
    checkGenre() {
      const joined = this.genreOptions.join(',');

      return joined;
    },
  }
}
</script>