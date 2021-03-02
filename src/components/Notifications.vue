<template>
	<teleport to="body" />
	<div class="fixed bottom-0 right-0 transform flex flex-col items-end">
		<div
			v-for="notification in notifications"
			:key="notification.uuid"
			class="flex items-center animate-toast-fade-right-to-left m-2 rounded w-max"
			:class="getNotificationClasses(notification)"
		>
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
