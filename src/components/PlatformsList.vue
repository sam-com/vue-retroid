<template>
  <div class="List" v-gamepad:left-analog-down.repeat="moveDown" v-gamepad:left-analog-up.repeat="moveUp" >
    <span :class="selected === 0 ? 'active': ''">Nintendo 64</span>
    <span :class="selected === 1 ? 'active': ''">Nintendo Gamecube</span>
    <span :class="selected === 2 ? 'active': ''">Nintendo Wii</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "PlatformsList",
  props: {},
  methods: {
  },
  setup: () => {
    const selected = ref(0);

    const moveDown = () => {
      selected.value = (selected.value + 1) % 3;
    }

    const moveUp = () => {
      if(selected.value === 0) {
        selected.value = 3;
      }
      selected.value = (selected.value -1);
    }

    return {selected, moveDown, moveUp}
  }
})
</script>

<style scoped>
.List {
  display: flex;
  flex-direction: column;
}

.List span {
  color: blue;
}

.List span.active {
  background-color: red;
}
</style>