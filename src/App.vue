<template>
  <!-- PRELOADER -->
  <div v-if="appPrefetching" class="hero-loader">
    <div class="hero-loader__spinner" />
  </div>

  <!-- APP -->
  <template v-else>
    <div class="layout">
      <navigation-menu @select="() => {}" :items="appRoutes" title="navigation_menu" class="layout__navbar" />

      <div class="layout__content">
        content here
      </div>
    </div>
  </template>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue';

const APP_ROUTES = ['game', 'history'];

export default {
  name: 'App',

  data() {
    return {
      appPrefetching: true,
      appRoutes: APP_ROUTES
    };
  },

  created() {
    this.initApp();
  },

  methods: {
    initApp() {
      const minPreload = 0;
      const startTime = performance.now();

      window.onload = () => {
        const endTime = performance.now();
        const isBeforeTheMinimumPreload = endTime - startTime < minPreload;
        const leftTime = minPreload - endTime - startTime;

        if (isBeforeTheMinimumPreload) {
          setTimeout(() => {
            this.appPrefetching = false;
          }, leftTime);
        } else {
          this.appPrefetching = false;
        }
      };
    }
  },

  components: {
    NavigationMenu
  }
};
</script>

<style src="./assets/app.scss" lang="scss"></style>
