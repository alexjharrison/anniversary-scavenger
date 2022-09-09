<template>
  <div class="flex flex-col items-center h-screen justify-around text-center">
    <div>
      <h2 class="text-4xl mb-2">Let's Reminisce</h2>
      <p class="text-lg">Tell me about a fun thing that happened here</p>
      <small class="text-xs">(that i likely forgot)</small>
    </div>
    <h3 class="font-semibold text-6xl">{{ currentTarget.topic }}</h3>
    <img :src="img" :alt="currentTarget.name" class="" />
    <button
      @click="emit('close')"
      class="border rounded-2xl px-3 py-2 text-3xl mt-2 bg-purple-600 mb-16"
    >
      Onward Ho!
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { currentTarget } from "../composables/state";

const emit = defineEmits(["close"]);

const img = computed(
  () =>
    new URL(
      `../assets/img/vaca/${currentTarget.value.vacaImg}`,
      import.meta.url
    ).href
);
</script>
