<template>
	<div
		class='flex justify-center items-center h-screen w-full bg-gray-800'
		v-gamepad:button-b='goBack'
	>
		<div class='justify-center items-center mx-auto w-full overflow-hidden'>
			<Carousel #default='{active}'>
				<CarouselItem v-for='(slide, index) in slides' :key='slide.tag'>
					<div
						class='text-4xl flex flex-col items-center justify-center h-80 w-80 rounded-2xl bg-blue-600 p-12 overflow-hidden'
						:class="active === index? 'border-4 border-white opacity-100': 'border-4 border-transparent opacity-50'">
						<img :src='`/src/assets/consoles/${slide.tag}.png`'>
					</div>
				</CarouselItem>
			</Carousel>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import router from '../router';
import Carousel from '../components/Carousel/Carousel.vue';
import CarouselItem from '../components/Carousel/CarouselItem.vue';

interface Console {
	tag: string,
	name: string
}

export default defineComponent({
	components: { Carousel, CarouselItem },
	name: 'ConsolesList',
	props: {},
	setup: () => {
		const goBack = () => {
			router.back();
		};

		const slides: Console[] = [
			{ tag: 'nes', name: 'Nintendo Entertainment System' },
			{ tag: 'snes', name: 'Super Nintendo Entertainment System' },
			{ tag: 'n64', name: 'Nintendo 64' },
			{ tag: 'ngc', name: 'Gamecube' },
			{ tag: 'wii', name: 'Wii' },
			{ tag: 'nwu', name: 'Wii U' },
		];

		return { goBack, slides };
	},
});
</script>
