<template>
	<div class='relative overflow-hidden flex justify-center' v-gamepad:button-dpad-right='handleScrollRight'
			 v-gamepad:button-dpad-left='handleScrollLeft'>
		<div ref='carouselContainerInner' class='grid grid-flow-col gap-8 overflow-x-auto scroll-snap-x scrollbar-none'>
			<slot :active='currentIndex'></slot>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import router from '../../router';
import { usePosition } from '../../hooks/usePosition';

import useSound from 'vue-use-sound';
import tickSfx from '../../sounds/Nock.wav';

export default defineComponent({
	name: 'Carousel',
	setup: () => {
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
			scrollRight();
			play();
		};

		const handleScrollLeft = () => {
			if (!hasItemsOnLeft.value) {
				return;
			}
			scrollLeft();
			play();
		};

		return {
			goBack,
			carouselContainerInner,
			handleScrollLeft,
			handleScrollRight,
			currentIndex,
		};
	},
});
</script>