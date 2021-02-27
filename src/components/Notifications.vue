<template>
	<teleport to="body" />
	<div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col">
		<div
			v-for="[uuid, notification] of notifications"
			:key="uuid"
			class="flex items-center animate-toast-fade-in m-2 rounded"
			:class="getNotificationClasses(notification)"
		>
			<!-- <img class="w-4 h-4" alt="Vue logo" src="../assets/logo.png" /> -->
			<span class="p-2 text-white">{{ notification.message }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
	getNofications,
	Notification,
	NotificationTypes,
} from '../api/notification/nofitications';

export default defineComponent({
	name: 'Notifications',
	setup: () => {
		const getNotificationClasses = (notification: Notification) => {
			return {
				'bg-blue-500': notification.type === NotificationTypes.message,
				'bg-red-500': notification.type === NotificationTypes.danger,
				'bg-yellow-500': notification.type === NotificationTypes.warning,
				'bg-green-500': notification.type === NotificationTypes.success,
			};
		};

		const { notifications } = getNofications();
		return { notifications, getNotificationClasses };
	},
});
</script>
