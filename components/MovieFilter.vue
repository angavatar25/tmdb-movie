<template>
  <div class="bg-[#101925] py-3 rounded-md">
    <p class="px-4 pb-4">Sort Result By</p>
    <div class="w-full h-[1px] bg-gray-500"/>
    <div class="p-4">
      <select
        class="text-white w-full bg-black"
        name="cars"
        id="cars"
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
    <div class="w-full h-[1px] bg-gray-500"/>
    <p class="p-4">Genres</p>
    <div class="w-full h-[1px] bg-gray-500"/>
    <div class="p-4">
      <div class="flex justify-between">
        <div
          v-for="genre in genreList"
          :key="genre.id"
        >
          <label for="vehicle1">{{ genre.name }}</label>
          <input
            type="checkbox"
            :name="genre.name"
            :value="genre.name"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    genreList: {
      type: Array,
      default: () => [],
    }
  }
}
</script>