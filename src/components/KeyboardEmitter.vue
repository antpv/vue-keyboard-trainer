<template>
  <input
    ref="hiddenInput"
    @blur="focusOnInput"
    @keydown="keydownSubscriber"
    class="hidden-input"
  />
</template>

<script>
import { defineComponent } from 'vue';
import KEYBOARDS_KEYS from '../constants/KEYBOARDS_KEYS';

export default defineComponent({
  name: 'KeyboardEmitter',

  emits: {
    down: 'string'
  },

  mounted() {
    this.focusOnInput();
  },

  methods: {
    keydownSubscriber(event) {
      const keyLabel = KEYBOARDS_KEYS[event.keyCode];

      if (keyLabel !== undefined) this.$emit('down', keyLabel);
    },

    focusOnInput() {
      this.$refs.hiddenInput.focus();
    }
  }
});
</script>

<style scoped>
.hidden-input {
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
}
</style>
