import { toRefs, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export enum NotificationTypes {
	danger = 'danger',
	success = 'success',
	warning = 'warning',
	message = 'message',
}

export type Notification = {
	uuid: string;
	message: string;
	type: NotificationTypes;
};

type Options = { ttl?: number; type?: NotificationTypes };

const state = reactive({
	notifications: new Array<Notification>(),
});

export async function setNotification(
	message: string,
	{ ttl = 5, type = NotificationTypes.message }: Options = {},
) {
	const uuid = uuidv4();
	state.notifications.unshift({ uuid, message, type });

	setTimeout(() => {
		state.notifications = state.notifications.filter(
			(notification) => notification.uuid !== uuid,
		);
	}, ttl * 1000);
}

export function getNofications() {
	return toRefs(state);
}
