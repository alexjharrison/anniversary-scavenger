import { useDeviceOrientation, useGeolocation } from "@vueuse/core";
import { computed, watchEffect } from "vue";
import { currentTarget, state } from "./state";

const bound = 0.0008;

/**
 * When enabled will constantly ping current location
 * If inside target range, will update to next location
 */
export const useReactiveLocation = () => {
  const { coords } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 2000, // update location no longer than every 2 seconds,
    timeout: 10000,
  });

  const { alpha } = useDeviceOrientation();

  const tau = computed(() => (alpha.value || 0) + 90);

  const y = computed(() =>
    Math.abs(coords.value.latitude - currentTarget.value.lat)
  );
  const x = computed(() =>
    Math.abs(coords.value.longitude - currentTarget.value.long)
  );

  const theta = computed(() => {
    const theta = Math.tan(x.value / y.value) * Math.PI * 180;
    return isNaN(theta) ? 0 : theta;
  });
  const distance = computed(() => {
    const y = Math.abs(coords.value.latitude - currentTarget.value.lat);
    const x = Math.abs(coords.value.longitude - currentTarget.value.long);

    return Math.sqrt(x ** 2 + y ** 2);
  });

  const angle = computed(() => {
    const y = Math.abs(coords.value.latitude - currentTarget.value.lat);
    const x = Math.abs(coords.value.longitude - currentTarget.value.long);
    const theta = Math.tan(x / y) * Math.PI * 180;
    console.table({ x, y, theta, angle: tau.value - theta });
    return tau.value - theta;
  });

  watchEffect(() => {
    console.log(tau.value);
    if (x.value < bound && y.value < bound) {
      state.value.locationCount++;
    }
  });

  return { distance, angle, x, y };
};
