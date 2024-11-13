<template>
  <div>
    <section class="max-h-[450px] bg-opacity-45 bg-black relative overflow-hidden text-white">
      <div class="absolute bg-black h-20 w-full bottom-0">
        
      </div>
      <img
        src="https://wallpapersok.com/images/hd/the-avengers-superhero-movie-eeotwqkmypkvalg9.jpg"
        alt=""
      >
    </section>
    <div class="absolute top-[20rem]">
      <div class="flex px-10">
        <img
          src="https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg"
          alt=""
          class="max-w-56 shadow-md"
        >
        <div class=" my-auto leading-[10] pl-5">
          <div>
            <p class=" text-lg">2020</p>
            <p class=" text-4xl">Movie title</p>
            <p class=" text-sm">Fantasy, Action, Adventure</p>
          </div>
          <div>
            <p>movie detail</p>
          </div>
          <div>
            <p class=" text-red-600 uppercase text-sm font-semibold">Overview</p>
            <p class="text-black leading-6 mt-2 max-w-[526px] text-sm">Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.</p>
          </div>
        </div>
      </div>
      <div class="mt-10 px-10">
        <p class="text-red-600 text-sm font-medium uppercase">Reviews</p>
        <div class="grid grid-cols-2 gap-5 mt-5">
          <CardReview/>
          <CardReview/>
        </div>
      </div>
      <div class="bg-[#1E232B] py-10 px-16 mt-20">
        <p class="text-[14px] uppercase font-semibold mb-10">Recommendation Movies</p>
        <div class="grid grid-cols-5 gap-3">
          <MovieCardDiscover/>
          <MovieCardDiscover/>
          <MovieCardDiscover/>
          <MovieCardDiscover/>
          <MovieCardDiscover/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardReview from '../components/CardReview.vue';
import MovieCardDiscover from '../components/MovieCardComponent/MovieCardDiscover.vue';

export default {
  components: {
    CardReview,
    MovieCardDiscover,
  }
}
</script>