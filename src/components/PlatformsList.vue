<template>
	<div
		class="flex flex-col"
		v-gamepad:left-analog-down.repeat="moveDown"
		v-gamepad:left-analog-up.repeat="moveUp"
    v-gamepad:button-b="goBack"
	>
		<span class="" :class="selected === 0 ? 'text-blue-500 bg-red-200' : ''"
			>Nintendo 64</span
		>
		<span :class="selected === 1 ? 'text-blue-500 bg-red-200' : ''"
			>Nintendo Gamecube</span
		>
		<span :class="selected === 2 ? 'text-blue-500 bg-red-200' : ''"
			>Nintendo Wii</span
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '../router';

export default defineComponent({
	name: 'PlatformsList',
	props: {},
	methods: {},
	setup: () => {
		const selected = ref(0);

		const moveDown = () => {
			selected.value = (selected.value + 1) % 3;
		};

		const moveUp = () => {
			if (selected.value === 0) {
				selected.value = 3;
			}
			selected.value = selected.value - 1;
		};

		const goBack = () => {
		  router.back();
    }

		return { selected, moveDown, moveUp, goBack };
	},
});
</script>

<style scoped>
.List span {
	color: blue;
}

.List span.active {
	background-color: red;
}
</style>
