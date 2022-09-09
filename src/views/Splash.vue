<template>
  <div class="flex flex-col justify-evenly items-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-semibold mb-5">Allyx's Anniversary Scavenger</h1>
      <p>Press below to start adventuring</p>
    </div>
    <img
      src="../assets/img/splash/heart.webp"
      alt="fingerprint"
      class="w-11/12 rounded-lg my-10"
      @click="emit('start')"
    />
    <button
      @click="emit('start')"
      class="border rounded-md text-3xl px-3 py-1 mb-20 bg-cyan-500 shadow-xl"
    >
      Let's Go
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["start"]);
</script>
