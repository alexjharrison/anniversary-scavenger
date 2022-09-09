import { useLocalStorage } from "@vueuse/core";
import { computed, reactive, ref } from "vue";
import { locations } from "../assets/locations";
import { questions } from "../assets/questions";

export enum Status {
  TRAVELING,
  ANSWERING,
  VIEWING,
}

//South, East, North, West
// export const state = useLocalStorage("state", {
//   locationCount: 2,
//   hasStarted: false,
//   status: Status.TRAVELING,
// });
export const state = ref({
  locationCount: 0,
  hasStarted: false,
  status: Status.TRAVELING,
});

export const currentTarget = computed(
  () => locations[state.value.locationCount]
);

export const currentQuestion = computed(
  () => questions[state.value.locationCount]
);
