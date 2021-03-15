<template>
  <div class="game-content">
    <span
      v-for="(word, idx) in textByWords"
      :key="idx"
      :class="{
        'game-content-word--written': idx < activeWordIdx,
        'game-content-word--active': activeWordIdx === idx
      }"
      class="game-content-word"
    >{{ word }}</span>
  </div>

  <input
    class="game-input"
    :class="{ 'game-input-error': highlightError }"
    v-model="inputValue"
  />
</template>

<script>
export default {
  name: 'PageGame',

  props: {
    text: {
      type: String,
      required: true
    }
  },

  watch: {
    text: {
      handler(value) {
        // tick
      },
      immediate: true
    },

    inputValue(value) {
      this.highlightError = false;

      const isEmpty = value.length === 0;
      const isLastWord = this.activeWordIdx === this.textByWords.length;
      const expectedWord = isLastWord ? this.activeWord : this.activeWord + ' ';

      if (isEmpty && this.gameover === true) return;

      if (expectedWord === value) {
        this.activeWordIdx++;
        this.inputValue = '';

        if (isLastWord) {
          this.gameover = true;
        }
      } else if (expectedWord.startsWith(value)) {
        // starts with same value
      } else {
        this.highlightError = true;
      }
    }
  },

  data() {
    return {
      activeWordIdx: 0,
      inputValue: '',
      highlightError: false,
      gameover: false
    };
  },

  computed: {
    textByWords() {
      return this.text.split(' ');
    },

    activeWord() {
      return this.textByWords[this.activeWordIdx];
    }
  }
};
</script>
