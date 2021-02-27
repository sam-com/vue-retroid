<template>
	<img alt="Vue logo" src="../assets/logo.png" />
	<span v-gamepad:button-select="callback">PRESS START</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlatformsList from '../components/PlatformsList.vue';
import router from '../router';
import { setNotification } from '../api/notification/nofitications';

export default defineComponent({
	name: 'Home',
	components: {
		PlatformsList,
	},
	setup: () => {
		const callback = () => {
			// router.push('/platforms');
			setNotification('this is a toast');
		};

		return { callback };
	},
});
</script>
