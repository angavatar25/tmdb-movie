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
        />
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
          class="bg-red-600 capitalize rounded-full px-5 py-1"
        >
          Load more
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
  mounted() {
    if (this.movieList.length === 0) {
      this.$store.dispatch('movies/getDiscoverMovieList');
    }

    this.$store.dispatch('movies/getMovieGenre');
  },
  computed: {
    movieList() {
      return this.$store.state.movies.discoverMovieList;
    },
    movieGenres() {
      return this.$store.state.movies.movieGenres;
    }
  },
  methods: {
    redirectToMovieDetail(movieData) {
      const { movieId, movieName } = movieData;
      const splitted = movieName.split(' ');
      const movieNameSerialized = splitted.join('-');

      this.$router.push({ path: `/movie/${movieNameSerialized}`, query: { movieId } });
    }
  }
}
</script>