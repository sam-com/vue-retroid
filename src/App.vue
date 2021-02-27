<template>
	<!--  <router-link :to="{ name: 'Home' }">Home</router-link> |-->
	<router-view></router-view>
	<Notifications />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notifications from './components/Notifications.vue';

export default defineComponent({
	name: 'App',
	components: {
		Notifications,
	},
	setup: () => {},
});
</script>
