<template>
	<img :src='slide.src' alt=''>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'Slide',
	props: {
		slide: {
			type: Object as PropType<{ src: string }>,
			required: true,
		},
	},
	setup: (props) => {
		console.log(props.slide);
	},
});
</script>
