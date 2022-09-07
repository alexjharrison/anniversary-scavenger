import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";
import { locations } from "../assets/locations";
import { questions } from "../assets/questions";

export enum Status {
  TRAVELING,
  ANSWERING,
  VIEWING,
}
export const state = useLocalStorage("state", {
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
