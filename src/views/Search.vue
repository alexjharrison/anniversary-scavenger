<template>
  <div class="text-center">
    <Arrow :angle="space.theta" />
    <p class="-mt-5 mb-12 text-lg">{{ Math.round(space.distance) }} meters</p>
    <div class="bg-purple-500 w-80 mx-auto py-3 px-2 rounded-lg">
      <h2 class="text-5xl mb-3">Next Stop</h2>
      <p class="text-2xl font-light">{{ currentTarget.name }}</p>
    </div>
    <img class="h-40 mx-auto mt-8" :src="img" :alt="currentTarget.name" />
    <!-- <button @click="emit('close')">click</button> -->
  </div>
</template>

<script setup lang="ts">
import Arrow from "../components/Arrow.vue";
import { currentTarget, state } from "../composables/state";
import { useGeolocation } from "@vueuse/core";
import { computed } from "@vue/reactivity";
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";

const emit = defineEmits(["close"]);
const bound = 10; //meters
const orientationAbsolute = ref(0);

const img = computed(
  () =>
    new URL(
      `../assets/img/duke/${currentTarget.value.targetImg}`,
      import.meta.url
    ).href
);

/**
 * When enabled will constantly ping current location
 * If inside target range, will update to next location
 */
const { coords } = useGeolocation({
  enableHighAccuracy: true,
  maximumAge: 2000, // update location no longer than every 2 seconds,
  timeout: 10000,
});

const space = computed(() => {
  const beta = (orientationAbsolute.value - 270 + 360) % 360;

  const dx = currentTarget.value.long - coords.value.longitude;
  const dy = currentTarget.value.lat - coords.value.latitude;

  const alpha =
    ((2 * Math.atan(dy / (dx + Math.sqrt(dx ** 2 + dy ** 2))) * 180) / Math.PI +
      360) %
    360;
  const theta = beta - alpha;
  const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) * 111139;
  return {
    dx,
    dy,
    theta,
    distance,
    orientationAbsolute,
    alpha,
    beta,
    coords: { y: coords.value.latitude, x: coords.value.longitude },
  };
});

watchEffect(() => {
  if (space.value.distance < bound) {
    emit("close");
  }
});

onMounted(() => {
  // @ts-ignore
  window.addEventListener("deviceorientationabsolute", saveOrientation);
});
onBeforeUnmount(() => {
  // @ts-ignore
  window.removeEventListener("deviceorientationabsolute", saveOrientation);
});

function saveOrientation(evt: DeviceOrientationEvent) {
  orientationAbsolute.value = evt.alpha || 0;
}
</script>
