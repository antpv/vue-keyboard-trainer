<template>
  <!-- PRELOADER -->
  <div v-if="appPrefetching" class="hero-loader">
    <div class="hero-loader__spinner" />
  </div>

  <!-- APP -->
  <template v-else>
    <div class="layout">
      <!-- todo: bind selected item with active route -->
      <navigation-menu
        v-if="isHomeRoute"
        @select="onSelectMenuItem"
        :items="APP_ROUTES"
        defaultActiveItem="game"
        title="navigation_menu"
        navbarClass="layout__navbar"
      />

      <div v-if="isHomeRoute" class="layout__content">
        <span class="label">
          Press Enter for select
        </span>
      </div>
      <div v-else class="layout__content" :class="{ 'layout__content--full-width': selectedRoutePath !== null }">
        <router-view />
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
      APP_ROUTES
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
    },

    onSelectMenuItem(path) {
      this.$router.push(path);
    }
  },

  computed: {
    isHomeRoute() {
      return this.$route.path === '/';
    }
  },

  components: {
    NavigationMenu
  }
};
</script>


<style src="./assets/app.scss" lang="scss"></style>
