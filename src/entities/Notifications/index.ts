import { CircleCounter } from './ui/CircleCounter/CircleCounter';

type TNotificationsComponents = {
	CircleCounter: typeof CircleCounter;
};

/** Экспортируем обертку для компонентов, которые связаны логически */
export const Notifications: TNotificationsComponents = {
	CircleCounter,
};
