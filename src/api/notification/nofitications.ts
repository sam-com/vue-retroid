import { toRefs, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export enum NotificationTypes {
	danger = 'danger',
	success = 'success',
	warning = 'warning',
	message = 'message',
}

export type Notification = {
	message: string;
	type: NotificationTypes;
};

type Options = { ttl?: number; type?: NotificationTypes}

const state: { notifications: Map<string, Notification> } = reactive({
	notifications: new Map<string, Notification>(),
});

export async function setNotification(
	message: string,
	{ttl=5, type=NotificationTypes.message}: Options = {}
) {
	const uuid = uuidv4();
	state.notifications.set(uuid, { message, type});

	setTimeout(() => {
		state.notifications.delete(uuid);
	}, ttl * 1000);
}

export function getNofications() {
	return toRefs(state);
}
