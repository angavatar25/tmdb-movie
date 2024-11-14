<template>
  <div
    v-if="movieReview"
    class="bg-[#F9F9F9] text-black p-4 rounded-md shadow-md"
  >
    <div class="flex justify-between">
      <div class="flex gap-5">
        <div class="w-7 h-7 bg-gray-300 rounded-full my-auto overflow-hidden">
          <img
            :src="imageAvatar"
            class="w-full h-full object-cover"
            alt=""
          >
        </div>
        <div>
          <p>{{ movieReview.author }}</p>
          <p>{{ movieReview.created_at }}</p>
        </div>
      </div>
      <div
        v-if="movieRate"
        class="bg-gray-300 h-fit flex p-2 rounded-md"
      >
        <img class="w-5" src="../src/assets/icons/star.svg" alt="">
        <p class="text-4xl font-bold">{{ movieRate }}</p>
      </div>
      <div
        v-else
        class="bg-gray-300 h-fit flex p-2 rounded-md font-bold"
      >
        No rating
      </div>
    </div>
    <p
      v-html="movieReview.content"
      class="line-clamp-4 text-ellipsis italic text-[13px] mt-5"
    />
  </div>
</template>

<script>
export default {
  props: {
    movieReview: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    movieRate() {
      if (this.movieReview 
        && this.movieReview.author_details
        && this.movieReview.author_details.rating
      ) {
        const parsed = parseFloat(this.movieReview.author_details.rating.toFixed(1))
        return parsed;
      }

      return null;
    },
    imageAvatar() {
      const posterPath = "https://image.tmdb.org/t/p/original";
      
      const { avatar_path: avatarPath } = this.movieReview.author_details;

      return `${posterPath}/${avatarPath}`
    }
  }
}
</script>

<style>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 8;
}
</style>