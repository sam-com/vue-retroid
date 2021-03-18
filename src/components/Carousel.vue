<template>
	<div class='relative overflow-hidden' v-gamepad:button-dpad-right='handleScrollRight'
			 v-gamepad:button-dpad-left='handleScrollLeft'>
		<div ref='carouselContainerInner' class='carousel-container-inner'>
			<div v-for='(element, index) in elements'
					 class='text-white text-4xl flex items-center justify-center h-80 w-80 rounded-2xl bg-blue-400 p-4'
					 :class='{active: index === currentIndex}'
					 :key='element.tag'>
				<img :src='`/src/assets/consoles/${element.tag}.png`'>
			</div>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue';
import router from '../router';
import { usePosition } from '../hooks/usePosition';

import useSound from 'vue-use-sound';
import tickSfx from '../sounds/Nock.wav';

interface Console {
	tag: string
}

export default defineComponent({
	name: 'Carousel',
	props: {
		elements: { type: Object as PropType<Console[]>, required: true },
	},
	methods: {},
	setup: ({ elements }) => {
		const goBack = () => {
			router.back();
		};
		const carouselContainerInner = ref();
		const {
			scrollLeft,
			scrollRight,
			hasItemsOnRight,
			hasItemsOnLeft,
			currentIndex,
		} = usePosition(carouselContainerInner);

		const [play] = useSound(tickSfx);

		const handleScrollRight = () => {
			if (!hasItemsOnRight.value) {
				return;
			}
			play();
			scrollRight();
		};

		const handleScrollLeft = () => {
			if (!hasItemsOnLeft.value) {
				return;
			}
			play();
			scrollLeft();
		};

		return {
			elements,
			goBack,
			carouselContainerInner,
			handleScrollLeft,
			handleScrollRight,
			currentIndex,
		};
	},
});
</script>

<style lang='sass' scoped>
.carousel-container-inner
	display: grid
	grid-auto-flow: column
	grid-gap: 10rem
	overflow-x: scroll
	scroll-snap-type: x mandatory
	-ms-overflow-style: none
	scrollbar-width: none

	&::-webkit-scrollbar
		display: none

	&::before
		content: ''
		width: 1px
	&::after
		content: ''
		width: 1px

	& > *
		flex-shrink: 0
		border: 4px solid white
		opacity: 0.5
		scroll-snap-align: center

		&.carousel-active
			opacity: 1
</style>