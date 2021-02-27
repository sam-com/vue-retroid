<template>
	<teleport to="body" />
	<div class="absolute bottom-0 left-1/2 translate-x-1/2" v-if="isOpen">
		this is a toast
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { setNotification } from '../api/notification/setNofitication';

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true,
		},
	},
	setup: () => {
		const { isOpen, message } = setNotification('allo');
		return { isOpen };
	},
});
</script>
