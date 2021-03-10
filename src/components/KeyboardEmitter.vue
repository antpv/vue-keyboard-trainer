<script>
import { defineComponent } from 'vue';
import KEYBOARDS_KEYS from '../constants/KEYBOARDS_KEYS';

export default defineComponent({
  name: 'KeyboardEmitter',

  emits: {
    down: 'string'
  },

  created() {
    document.addEventListener('keydown', this.keydownSubscriber);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.keydownSubscriber);
  },

  methods: {
    keydownSubscriber(event) {
      const keyLabel = KEYBOARDS_KEYS[event.keyCode];

      if (keyLabel !== undefined) {
        this.$emit('down', keyLabel);
      }
    }
  },

  render() {
    return null;
  }
});
</script>
