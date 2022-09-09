<template>
  <div>
    <Arrow :angle="angle.theta" />
    <p v-for="(val, key) in angle">{{ key }}: {{ val }}</p>
    <p>{{ orientationAbsolute }}</p>
    <p>{{ currentTarget }}</p>
  </div>
</template>

<script setup lang="ts">
import Arrow from "../components/Arrow.vue";
import { currentTarget, state } from "../composables/state";
import { useGeolocation } from "@vueuse/core";
import { computed } from "@vue/reactivity";
import { onBeforeUnmount, onMounted, ref } from "vue";

const bound = 0.0008;
const orientationAbsolute = ref(0);

/**
 * When enabled will constantly ping current location
 * If inside target range, will update to next location
 */
const { coords } = useGeolocation({
  enableHighAccuracy: true,
  maximumAge: 2000, // update location no longer than every 2 seconds,
  timeout: 10000,
});

const angle = computed(() => {
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
