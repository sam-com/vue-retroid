<template>
	<div class="h-96 my-0 mx-auto relative w-3/4">
		<button
			@click="previousSlide"
			class="absolute top-1/2 -translate-y-1/2 border-0 cursor-pointer -left-9"
		>
			Prev
		</button>
		<div class="relative w-full overflow-hidden">
			<ul
				ref="carouselRef"
				class="w-full relative list-none flex transition duration-500"
			>
				<li
					class="p-0 m-auto flex-shrink-0"
					v-for="slide in slides"
					:key="slide.src"
				>
					<img class="w-full object-contain" :src="slide.src" />
				</li>
			</ul>
		</div>
		<button
			class="absolute top-1/2 -translate-y-1/2 border-0 cursor-pointer -right-9"
			@click="nextSlide"
		>
			Next
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import Slide from './Slide.vue';

export default defineComponent({
	name: 'Carousel',
	components: { Slide },
	props: {
		itemsPerSlide: { type: Number, default: 1 },
		itemWidth: { type: Number, required: true },
		slides: {
			type: Object as PropType<Array<{ src: string }>>,
			required: true,
		},
	},
	setup: ({ slides, itemsPerSlide, itemWidth }) => {
		const numSlides = slides.length;
		const currentIdx = ref(0);
		const carouselRef = ref<HTMLElement | null>(null);

		const currentItemWidth = computed(
			() => carouselRef.value?.children[currentIdx.value].clientWidth || 0,
		);

		const nextSlide = () => {
			if (
				carouselRef &&
				carouselRef.value &&
				currentIdx.value < numSlides - 1
			) {
				carouselRef.value.style.transform = `translateX(-${
					currentItemWidth.value * (currentIdx.value + 1)
				}px)`;
				currentIdx.value += 1;
			}
		};

		const previousSlide = () => {
			if (carouselRef && carouselRef.value && currentIdx.value > 0) {
				carouselRef.value.style.transform = `translateX(${
					currentItemWidth.value * (currentIdx.value + 1)
				}px)`;
				currentIdx.value -= 1;
			}
		};

		return {
			carouselRef,
			slides,
			nextSlide,
			previousSlide,
			currentIdx,
		};
	},
});
</script>
