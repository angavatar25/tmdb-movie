<template>
  <div>
    <section class="bg-[#1E232B] px-10 pt-10 pb-20">
       <Carousel
        :movie-list="carouselMovieList"
       />
    </section>
    <section class="bg-[#292E36] p-10 text-white">
      <div class="flex justify-between">
        <div>
          <div class=" w-36 h-2 bg-[#E74C3C]"/>
          <p class=" text-2xl font-semibold mt-3">Discover Movies</p>
        </div>
        <div class="my-auto gap-4 flex">
          <button
            v-for="buttonText in buttonDiscover"
            :class="{
              'bg-red-600': currentButton === buttonText,
              'bg-[#21252B]': currentButton !== buttonText
            }"
            @click="handleChangeBy(buttonText)"
            class="capitalize rounded-full p-2 h-fit text-sm"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div
        v-if="movieList.length > 0"
        class="mt-10 grid grid-cols-5 gap-5"
      >
        <MovieCardDiscover
          v-for="movie in movieList"
          :key="movie.id"
          :movie-detail="movie"
          @movie-card-action="redirectToMovieDetail"
        />
      </div>
      <div v-else>
        <p>Loading Movies...</p>
      </div>
    </section>
  </div>
</template>

<script>
import Carousel from '../components/MovieCardComponent/Carousel.vue';
import MovieCardCarousel from '../components/MovieCardComponent/MovieCardCarousel.vue';
import MovieCardDiscover from '../components/MovieCardComponent/MovieCardDiscover.vue';

export default {
  name: 'IndexPage',
  components: {
    MovieCardCarousel,
    Carousel,
  },
  data() {
    return {
      buttonDiscover: ['popularity', 'release date'],
      currentButton: 'popularity',
    }
  },
  mounted() {
    this.$store.dispatch('movies/getDiscoverMovieList');
  },
  computed: {
    movieList() {
      return this.$store.state.movies.discoverMovieList;
    },
    carouselMovieList() {
      return this.$store.state.movies.discoverMovieList.slice(0, 5);
    },
  },
  methods: {
    redirectToMovieDetail(movieData) {
      const { movieId, movieName } = movieData;
      const splitted = movieName.split(' ');
      const movieNameSerialized = splitted.join('-');

      this.$router.push({ path: `/movie/${movieNameSerialized}`, query: { movieId } });
    },
    handleChangeBy(filter) {
      this.currentButton = filter;

      if (filter === 'popularity') {
        this.$store.dispatch('movies/getMoviesByPopularity');

        return;
      }

      this.$store.dispatch('movies/getMoviesByReleaseData');
    },
  }
}
</script>
