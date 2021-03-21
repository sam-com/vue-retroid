<template>
	<div class='flex-shrink-0 scroll-snap-align-center'>
		<slot />
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'CarouselItem',
});
</script>
