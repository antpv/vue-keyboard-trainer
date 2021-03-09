<template>
  <div v-if="appPrefetching" class="hero-loader">
    <div class="hero-loader__spinner" />
  </div>
  <div v-else>
    App
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      appPrefetching: true,
    };
  },

  created() {
    this.initApp();
  },

  methods: {
    initApp() {
      const minPreload = 500;
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
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Recursive:wght@300;400;500&display=swap');

body {
  font-family: 'Recursive', sans-serif;
  background-color: #ffe8d6;
  margin: 0;
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
    border: 2px solid #cb997e;
    border-radius: 12px;
    display: inline-block;
  }
}
</style>
