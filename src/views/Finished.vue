<template>
  <div class="h-screen relative flex items-center mt-10 flex-col">
    <h1 class="text-white z-10 text-6xl text-center leading-normal">
      Happy Anniversary Beb
    </h1>
    <img src="../assets/img/cheers.jpg" alt="cheers" class="h-80 mt-8 z-10" />
    <Fireworks
      class="absolute"
      :style="{
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        position: 'fixed',
        background: '#000',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Fireworks } from "@fireworks-js/vue";
</script>
