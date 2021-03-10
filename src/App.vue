<template>
  <!-- PRELOADER -->
  <div v-if="appPrefetching" class="hero-loader">
    <div class="hero-loader__spinner" />
  </div>

  <!-- APP -->
  <template v-else>
    <div class="layout">
      <div class="layout__navbar navbar">
        <div class="navbar__item">
          <span class="navbar__item-text" :class="{ 'navbar__item-text--active': selNavItemIdx === 0 }">
            game
          </span>
        </div>
        <div class="navbar__item">
          <span class="navbar__item-text" :class="{ 'navbar__item-text--active': selNavItemIdx === 1 }">
            previous_results
          </span>
        </div>
      </div>

      <div class="layout__content">
        content here
      </div>
    </div>
  </template>

  <keyboard-emitter @down="handleKeydown" />
</template>

<script>
import KeyboardEmitter from './components/KeyboardEmitter.vue';

export default {
  name: 'App',

  data() {
    return {
      appPrefetching: true,
      selNavItemIdx: 0,
      navItemsCount: 1
    };
  },

  created() {
    this.initApp();
  },

  methods: {
    initApp() {
      const minPreload = 2000;
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

    // todo: include constants, add arrows support
    handleKeydown(keycode) {
      if (keycode === 'S') {
        if (this.selNavItemIdx < this.navItemsCount) {
          this.selNavItemIdx += 1;
        } else {
          this.selNavItemIdx = 0;
        }
      }

      if (keycode === 'W') {
        if (this.selNavItemIdx > 0) {
          this.selNavItemIdx -= 1;
        } else {
          this.selNavItemIdx = this.navItemsCount;
        }
      }
    }
  },

  components: {
    KeyboardEmitter
  }
};
</script>

<style src="./assets/app.scss" lang="scss"></style>
