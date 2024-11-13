<template>
  <div>
    <section class="bg-[#1E232B] p-10">
      <MovieCardCarousel/>
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
            class="capitalize rounded-full p-2 h-fit text-sm"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="mt-10 grid grid-cols-5 gap-5">
        <MovieCardDiscover
          v-for="movie in movieList"
          :key="movie.id"
          :movie-detail="movie"
        />
      </div>
    </section>
  </div>
</template>

<script>
import MovieCardCarousel from '../components/MovieCardComponent/MovieCardCarousel.vue';
import MovieCardDiscover from '../components/MovieCardComponent/MovieCardDiscover.vue';

export default {
  name: 'IndexPage',
  components: {
    MovieCardCarousel,
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
    }
  }
}
</script>
