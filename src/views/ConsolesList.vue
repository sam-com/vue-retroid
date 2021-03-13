<template>
	<div
		class='flex justify-center items-center h-screen w-full bg-gray-800'
		v-gamepad:button-b='goBack'
	>
		<div class='justify-center items-center mx-auto w-full overflow-hidden'>
			<Carousel :elements='slides'>
			</Carousel>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import router from '../router';
import Carousel from '../components/Carousel.vue';

export default defineComponent({
	components: { Carousel },
	name: 'PlatformsList',
	props: {},
	methods: {},
	setup: () => {
		const goBack = () => {
			router.back();
		};

		const slides = [
			{ tag: 'nes' },
			{ tag: 'snes' },
			{ tag: 'n64' },
			{ tag: 'ngc' },
			{ tag: 'wii' },
			{ tag: 'nwu' },
		];

		return { goBack, slides };
	},
});
</script>
