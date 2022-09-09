import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { locations } from "../assets/locations";
import { questions } from "../assets/questions";

export const state = ref({
  locationCount: 0,
  hasStarted: false,
  isTraveling: true,
});
// export const state = useLocalStorage("state", {
//   locationCount: 0,
//   hasStarted: false,
//   isTraveling: true,
// });

export const currentTarget = computed(
  () => locations[state.value.locationCount]
);

export const currentQuestion = computed(
  () => questions[state.value.locationCount]
);
