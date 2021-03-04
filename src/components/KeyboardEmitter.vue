<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KeyboardEmitter',

  created() {
    document.addEventListener('keydown', (event) => {
      console.log(event);
    });
  },

  methods: {
  },

  render() {
    return null;
  },
});
</script>
