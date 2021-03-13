<template>
	<div
		class="flex items-center flex-col justify-center w-screen h-screen bg-gray-800"
	>
		<img class="max-w-xs" alt="Retroid logo" src="../assets/retroid.png" />
		<span class="text-white" v-gamepad:button-select="callback"
			>PRESS START</span
		>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '../router';
import ConsolesList from './ConsolesList.vue';

import useSound from 'vue-use-sound';
import homeSfx from "../sounds/Home.wav";

export default defineComponent({
	name: 'Home',
	components: {
		ConsolesList,
	},
	setup: () => {
		const [play] = useSound(homeSfx)

		const callback = () => {
			play();
			router.push('/consoles');
		};

		return { callback };
	},
});
</script>
