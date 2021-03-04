<template>
  <div class="root">
    <FontsLoader @load="fontsLoaded = true" />

    <template v-if="fontsLoaded">
      App
    </template>
  </div>
</template>

<script>
import FontsLoader from './components/FontsLoader.vue';

export default {
  name: 'App',

  data() {
    return {
      fontsLoaded: false,
    };
  },

  components: {
    FontsLoader,
  },
};
</script>

<style lang="scss">
.root {
  font-family: 'Inter', sans-serif;
}
</style>
