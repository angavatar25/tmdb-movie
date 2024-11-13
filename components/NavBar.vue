<template>
  <nav class="navbar">
    <img src="../src/assets/images/MoovieTime-Logo.svg" alt="">
    <InputMovieSearch/>
    <div class="uppercase flex gap-10 text-white my-auto">
      <div class="relative group">
        <div class="flex gap-2">
          <img class=" w-5" src="../src/assets/icons/iconfinder_view-grid_7122519 1.svg" alt="">
          Categories
        </div>
        <div class="bg-white absolute hidden group-hover:block top-10 text-black w-full p-3 rounded-md shadow-md">
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
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
    }
  }
};
</script>

<style scoped>
.navbar {
  @apply bg-[#292E36] flex px-10 py-4 justify-between;
}
</style>