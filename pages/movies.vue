<template>
  <div class="p-10">
    <div>
      <div class=" w-36 h-2 bg-[#E74C3C]"/>
      <p class=" text-4xl font-semibold mt-3">Movies</p>
    </div>
    <div class="grid grid-cols-5 mt-16">
      <div>
        <p>Filter</p>
      </div>
      <div class="grid grid-cols-4 col-span-4 gap-5">
        <MovieCardDiscover/>
        <MovieCardDiscover/>
        <MovieCardDiscover/>
        <MovieCardDiscover/>
        <MovieCardDiscover/>
        <MovieCardDiscover/>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardDiscover from '../components/MovieCardComponent/MovieCardDiscover.vue';

export default {
  components: {
    MovieCardDiscover,
  }
}
</script>