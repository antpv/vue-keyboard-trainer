<template>
  <game-content :text="text" />
</template>

<script>
import GameContent from './GameContent.vue';
import content from '../content_example.json';

export default {
  name: 'PageGame',

  data() {
    return {
      text: content[0]
    };
  },

  components: {
    GameContent
  }
};
</script>
