import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { ErrorPage } from 'shared/ui';

const CalendarPageApp = lazy(() =>
	// eslint-disable-next-line
	import('calendar/App').catch(() => {
		return {
			default: () => <ErrorPage title={'Календарь'} text={'Сервис календаря недоступен'} />,
		};
	}),
);

export const CalendarPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/calendar');
	}, [setCurrentService]);

	return <CalendarPageApp />;
};
