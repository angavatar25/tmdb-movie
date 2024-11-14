<template>
  <nav class="navbar">
    <img
      @click="goToHomepage"
      src="../src/assets/images/MoovieTime-Logo.svg"
      alt=""
    >
    <InputMovieSearch/>
    <div class="uppercase flex gap-10 text-white my-auto">
      <div class="relative group">
        <div class="flex gap-2">
          <img class=" w-5" src="../src/assets/icons/iconfinder_view-grid_7122519 1.svg" alt="">
          Categories
        </div>
        <div class="bg-white flex-col gap-4 absolute hidden group-hover:flex top-6 text-black w-full p-3 rounded-md shadow-md z-10">
          <p
            v-for="genre in movieGenre"
            :key="genre.id"
            class="text-xs"
          >
            {{ genre.name }}
          </p>
        </div>
      </div>
      <p @click="goToMovieList">Movies</p>
      <p>TV Shows</p>
      <p>Login</p>
    </div>
  </nav>
</template>

<script>
import InputMovieSearch from './SearchComponent/InputMovieSearch.vue';

export default {
  name: "Navbar",
  components: {
    InputMovieSearch,
  },
  methods: {
    goToMovieList() {
      this.$router.push('/movie');
    },
    goToHomepage() {
      this.$router.push('/');
    }
  },
  mounted() {
    if (this.movieGenre.length === 0) {
      this.$store.dispatch('movies/getMovieGenre');
    }
  },
  computed: {
    movieGenre() {
      return this.$store.state.movies.movieGenres;
    }
  },
};
</script>

<style scoped>
.navbar {
  @apply bg-[#292E36] flex px-10 py-4 justify-between sticky w-full top-0 z-20;
}
</style>