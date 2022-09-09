<template>
  <Splash v-if="!state.hasStarted" @start="state.hasStarted = true" />
  <main v-else-if="state.locationCount < locations.length">
    <Search v-if="state.isTraveling" @close="state.isTraveling = false" />
    <Reminisce
      v-else
      @close="
        state.isTraveling = true;
        state.locationCount++;
      "
    />
  </main>
  <Finished v-else />
</template>

<script setup lang="ts">
import { locations } from "./assets/locations";
import { state } from "./composables/state";
import Search from "./views/Search.vue";
import Splash from "./views/Splash.vue";
import Finished from "./views/Finished.vue";
import { onMounted } from "vue";
import Reminisce from "./views/Reminisce.vue";

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const shouldReset = urlParams.get("reset");
  if (shouldReset) {
    state.value = {
      hasStarted: false,
      locationCount: 0,
      isTraveling: true,
    };
    window.location.href = window.location.origin;
  }
});
</script>
