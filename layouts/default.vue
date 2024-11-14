<template>
  <div class="bg-[#292E36] text-white">
    <NavBar/>
    <Nuxt />
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

body {
  font-family: "Montserrat", sans-serif;
}
</style>