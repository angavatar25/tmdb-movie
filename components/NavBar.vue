<template>
  <nav class="navbar">
    <img src="../src/assets/images/MoovieTime-Logo.svg" alt="">
    <InputMovieSearch/>
    <div class="uppercase flex gap-10 text-white my-auto">
      <div class="flex">
        <img class=" w-5" src="../src/assets/icons/iconfinder_view-grid_7122519 1.svg" alt="">
        Categories
      </div>
      <p>Movies</p>
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
  }
};
</script>

<style scoped>
.navbar {
  @apply bg-[#292E36] flex px-10 py-4 justify-between;
}
</style>