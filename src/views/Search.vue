<template>
  <div>
    <Arrow :angle="angle.angle" />
    <p>angle: {{ angle.angle }}</p>
    <p>alpha: {{ alpha }}</p>
    <p>tau: {{ angle.tau }}</p>
    <p>distance: {{ distance }}</p>
    <p>x: {{ angle.x }}</p>
    <p>y: {{ angle.y }}</p>
    <p>theta {{ angle.theta }}</p>
    <p>State: {{ state }}</p>
    <p>Current Location: {{ currentTarget }}</p>
  </div>
</template>

<script setup lang="ts">
import { useReactiveLocation } from "../composables/location";
import Arrow from "../components/Arrow.vue";
import { currentTarget, state } from "../composables/state";
import { useDeviceOrientation, useGeolocation } from "@vueuse/core";
import { computed } from "@vue/reactivity";
import { watchEffect } from "vue";

const bound = 0.0008;

/**
 * When enabled will constantly ping current location
 * If inside target range, will update to next location
 */
const { coords } = useGeolocation({
  enableHighAccuracy: true,
  maximumAge: 2000, // update location no longer than every 2 seconds,
  timeout: 10000,
});

const { alpha } = useDeviceOrientation();

const tau = computed(() => 360 - (alpha.value || 0) - 90);

const y = computed(() =>
  Math.abs(coords.value.latitude - currentTarget.value.lat)
);
const x = computed(() =>
  Math.abs(coords.value.longitude - currentTarget.value.long)
);

const theta = computed(() => {
  const theta = Math.tan(x.value / y.value) * Math.PI * 180;
  return isNaN(theta) ? 0 : Math.tan(x.value / y.value) * Math.PI * 180;
});
const distance = computed(() => {
  return Math.sqrt(x.value ** 2 + y.value ** 2);
});

const angle = computed(() => {
  const tau = 360 - (alpha.value || 0) - 90;

  const y = Math.abs(coords.value.latitude - currentTarget.value.lat);
  const x = Math.abs(coords.value.longitude - currentTarget.value.long);

  const theta = 90 - (Math.tan(y / x) * 180) / Math.PI;
  console.log({ tau, theta, x, y });
  return {
    angle: 360 - (tau - theta),
    tau,
    x,
    y,
    theta,
  };
});
// const angle = computed(() => {
//   console.log({ tau, theta });
//   return (tau.value - theta.value) % 360;
// });
</script>
