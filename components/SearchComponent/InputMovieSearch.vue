<template>
  <div class="max-w-[600px] w-full relative">
    <div class="flex bg-[#242830] p-3 w-full justify-between rounded-md">
      <div class="flex my-auto grow">
        <img src="../../src/assets/icons/iconfinder_ic_movie_48px_3669324 1.svg" alt="">
        <input
          v-model="movieSearchQuery"
          @input="onInput"
          type="text"
          placeholder="Find movie"
          class="w-full bg-transparent outline-none text-white pl-3"
        >
      </div>
      <img src="../../src/assets/icons/iconfinder_icon-ios7-search-strong_211817 1.svg" alt="">
    </div>
    <div
      v-if="searchResult.length > 0 && showSearchResult"
      class="search-result-dropdown flex flex-col gap-4 w-full absolute bg-black bg-opacity-90 text-white p-3 rounded-b-md"
    >
      <p
        v-for="res in searchResult"
        :key="res.movieId"
        @click="redirectToMovieDetail(res)"
      >
        {{ res.movieName }}
      </p>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  data() {
    return {
      movieSearchQuery: '',
      showSearchResult: true,
    }
  },
  created() {
    this.debouncedSearch = debounce((query) => this.onSearch(query), 1000);
  },
  computed: {
    searchResult() {
      return this.$store.state.movies.movieSearchRes;
    },
  },
  methods: {
    onInput() {
      this.debouncedSearch(this.movieSearchQuery);
    },
    onSearch(val) {
      this.$store.dispatch('movies/getMovieSearch', val);
    },
    redirectToMovieDetail(movieData) {
      const { movieId, movieName } = movieData;
      const splitted = movieName.split(' ');
      const movieNameSerialized = splitted.join('-');

      this.showSearchResult = false;

      this.$router.push({ path: `/movie/${movieNameSerialized}`, query: { movieId } });
    }
  }
}
</script>