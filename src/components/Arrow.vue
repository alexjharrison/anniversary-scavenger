<template>
  <img
    src="../assets/img/arrow.svg"
    alt="arrow"
    :style="`transform:rotate(${angle || 0}deg);`"
    ref="img"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ angle: number | null }>();
const img = ref(null);
</script>

<style scoped>
img {
  width: 80%;
  margin: auto;
  padding: 25px;
}
</style>
