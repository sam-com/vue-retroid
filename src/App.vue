<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"/>
  <button v-gamepad:left-analog-right="callback" v-gamepad:left-analog-right.released="() => {}">click me</button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    callback: function () {
      console.log("registered");
    }
  },
  setup: () => {
  },
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  padding: 16px;
}

button.active {
  transform: scale(2);
}
</style>