<template>
	<div class='relative overflow-hidden' v-gamepad:button-dpad-right='scrollRight'
			 v-gamepad:button-dpad-left='scrollLeft'>
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
			currentIndex,
		} = usePosition(carouselContainerInner);

		return {
			elements,
			goBack,
			carouselContainerInner,
			scrollLeft,
			scrollRight,
			currentIndex,
		};
	},
});
</script>

<style lang='sass' scoped>
.carousel-container-inner
	display: grid
	grid-auto-flow: column
	grid-gap: 2rem
	overflow-x: scroll
	scroll-snap-type: x mandatory
	-ms-overflow-style: none
	scrollbar-width: none

	&::-webkit-scrollbar
		display: none

	& > *
		scroll-snap-align: start
		flex-shrink: 0
		margin-left: 1rem

		&.active
			border: 2px solid white
</style>