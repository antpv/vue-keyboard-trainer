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

.layout {
  display: flex;

  &__navbar {
    margin-right: 1rem;
  }

  &__content {
    width: 640px;
    flex: 1;
    box-sizing: border-box;
    border: 2px solid #ddbea9;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 1rem;
  }
}

.navbar {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    margin-bottom: 0.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-text {
    display: flex-inline;
    border-bottom: 2px solid transparent;
    border-radius: 1px;
    cursor: default;

    &--active {
      color: $color-font-accent;
      border-color: $color-font-accent;
    }
  }
}
</style>
