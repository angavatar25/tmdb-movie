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
          :current-sort="currentSort"
          :current-sort-id="currentSortId"
          @input="loadMoviesWithGenre"
          @handleCurrentSortOption="handleSort"
          v-model="genreOptions"
        />
      </div>
      <div
        v-if="movieList.length > 0"
        class="grid grid-cols-4 col-span-4 gap-5"
      >
        <MovieCardDiscover
          v-for="movie in movieList"
          :key="movie.id"
          :movie-detail="movie"
          @movie-card-action="redirectToMovieDetail"
        />
      </div>
      <div v-else>
        <p>Loading...</p>
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
      currentSort: '',
      currentSortId: '',
    }
  },
  mounted() {
    const payload = {
      page: this.currentPage,
    };

    if (this.genreId) {
      this.genreOptions.push(this.genreId);

      this.loadMoviesWithGenre();
    }

    this.$store.dispatch('movies/getMovieGenre');
    this.$store.dispatch('movies/filteredMovie', payload);
  },
  computed: {
    movieList() {
      return this.$store.state.movies.movieListFiltered;
    },
    genreId() {
      return this.$route.query.genreId;
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
        Object.assign(payload, { with_genres: this.checkGenre(this.genreOptions) });
      }

      if (this.currentSort) {
        Object.assign(payload, { sort_by: this.currentSortId })
      }

      this.$store.dispatch('movies/filteredMovie', payload);
    },
    loadMoviesWithGenre() {
      const payload = {
        page: 1,
      };

      if (this.genreOptions.length > 0) {
        Object.assign(payload, { with_genres: this.checkGenre(this.genreOptions) });
      }

      if (this.currentSort) {
        Object.assign(payload, { sort_by: this.currentSortId })
      }

      this.$store.dispatch('movies/filteredMovie', payload);
    },
    checkGenre(genre) {
      const joined = genre.join(',');

      return joined;
    },
    handleSort(sort) {
      const { key, name } = sort;
      
      this.currentSort = name;
      this.currentSortId = key;

      this.currentPage = 1;

      this.loadMoviesWithGenre();
    }
  }
}
</script>