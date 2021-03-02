<template>
	<!--	<img alt="Vue logo" src="../assets/logo.png" />-->
	<!--	<span v-gamepad:button-select="callback">PRESS START</span>-->
	<Carousel :slides="slides" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '../router';
import PlatformsList from '../components/PlatformsList.vue';
import Carousel from '../components/Carousel/Carousel.vue';

export default defineComponent({
	name: 'Home',
	components: {
		Carousel,
		PlatformsList,
	},
	setup: () => {
		const callback = () => {
			router.push('/platforms');
		};

		const slides = [
			{ src: '/src/assets/slide1.png' },
			{ src: '/src/assets/slide2.png' },
			{ src: '/src/assets/slide3.png' },
			// { src: '/src/assets/slide4.jpeg' },
			{ src: '/src/assets/slide1.png' },
			{ src: '/src/assets/slide2.png' },
			{ src: '/src/assets/slide3.png' },
			{ src: '/src/assets/slide1.png' },
			{ src: '/src/assets/slide2.png' },
			{ src: '/src/assets/slide3.png' },
		];

		return { callback, slides };
	},
});
</script>
