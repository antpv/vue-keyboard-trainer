<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FontsLoader',

  created() {
    const { head } = document;

    this.loadLinkPreconnect(head);
    this.loadStylesSheet(head);

    window.onload = () => {
      this.$emit('load');
    };
  },

  methods: {
    loadLinkPreconnect(parentElement) {
      const linkPreconnect = document.createElement('link');

      linkPreconnect.setAttribute('rel', 'preconnect');

      parentElement.appendChild(linkPreconnect);
    },

    loadStylesSheet(parentElement) {
      const linkStylesSheet = document.createElement('link');

      linkStylesSheet.setAttribute('rel', 'stylesheet');
      linkStylesSheet.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

      parentElement.appendChild(linkStylesSheet);
    },
  },

  render() {
    return null;
  },
});
</script>
