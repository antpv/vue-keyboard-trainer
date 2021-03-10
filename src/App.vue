<template>
  <!-- PRELOADER -->
  <div v-if="appPrefetching" class="hero-loader">
    <div class="hero-loader__spinner" />
  </div>

  <!-- APP -->
  <template v-else>
    <div class="navbar">
      <div class="navbar__item">
        <span class="navbar__item-text navbar__item-text--active">
          game
        </span>
      </div>
      <div class="navbar__item">
        <span class="navbar__item-text">
          keyboard_constructor
        </span>
      </div>
      <div class="navbar__item">
        <span class="navbar__item-text">
          about
        </span>
      </div>
      <div class="navbar__item">
        <span class="navbar__item-text">
          github
        </span>
      </div>
    </div>
  </template>

  <keyboard-emitter />
</template>

<script>
import KeyboardEmitter from './components/KeyboardEmitter.vue';

export default {
  name: 'App',

  data() {
    return {
      appPrefetching: true
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
    }
  },

  components: {
    KeyboardEmitter
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Recursive:wght@300;400;500&display=swap");

$color-font-base: #7f5539;
$color-font-accent: #6b705c;
$color-spinner: #7f5539;

html {
  font-size: 16px;
}

body {
  font-family: "Recursive", sans-serif;
  background-color: #ffe8d6;
  margin: 0;
  color: $color-font-base;
  line-height: 1.668;
  height: 100vh;
}

.hero-loader {
  width: 100wh;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  &__spinner {
    width: 24px;
    height: 24px;
    border: 2px solid $color-spinner;
    border-radius: 12px;
    display: inline-block;
  }
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.navbar {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
  }

  &__item-text {
    display: flex-inline;
    border-bottom: 2px solid transparent;
    border-radius: 1px;
    cursor: default;

    &--active {
      color: $color-font-accent;
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
      border-color: $color-font-accent;
    }
  }
}
</style>
