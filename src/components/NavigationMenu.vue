<template>
  <keyboard-emitter @down="handleKeydown" />

  <div class="navbar" :class="navbarClass">
    <div v-if="title" class="navbar__title">
      {{ title }}
    </div>
    <div
      v-for="item in items"
      :key="item"
      class="navbar__item"
    >
      <span class="navbar__item-text" :class="{ 'navbar__item-text--active': item === activeItem }">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
import KeyboardEmitter from './KeyboardEmitter.vue';

export default {
  name: 'NavigationMenu',

  props: {
    items: {
      type: Array,
      validator(items) {
        return items.every(item => typeof item === 'string');
      }
    },

    title: String,

    navbarClass: String,

    defaultActiveItem: {
      type: String,
      required: false
    }
  },

  emits: {
    select: String
  },

  watch: {
    defaultActiveItem: {
      handler(value) {
        this.activeItem = value;
      }
    }
  },

  data() {
    return {
      activeItem: this.defaultActiveItem
    };
  },

  methods: {
    handleKeydown(key) {
      const isDownKey = key === 'ArrowDown' || key === 'S';
      const isUpKey = key === 'ArrowUp' || key === 'W';
      const isSelect = key === 'Enter' || key === 'Space';

      if (isDownKey) {
        this.selectNextItem();
      }

      if (isUpKey) {
        this.selectPrevItem();
      }

      if (isSelect) {
        this.$emit('select', this.activeItem);
      }
    },

    selectNextItem() {
      const activeItemIdx = this.items.findIndex(i => i === this.activeItem) || 0;

      if (activeItemIdx < this.items.length - 1) {
        this.activeItem = this.items[activeItemIdx + 1];
      } else {
        this.activeItem = this.items[0];
      }
    },

    selectPrevItem() {
      const activeItemIdx = this.items.findIndex(i => i === this.activeItem) || 0;

      if (activeItemIdx > 0) {
        this.activeItem = this.items[activeItemIdx - 1];
      } else {
        this.activeItem = this.items[this.items.length - 1];
      }
    }
  },

  components: {
    KeyboardEmitter
  }
};
</script>
