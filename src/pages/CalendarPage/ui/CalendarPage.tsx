import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';

// eslint-disable-next-line
const CalendarPageApp = lazy(() => import('calendar/App'));

export const CalendarPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/calendar');
	}, [setCurrentService]);

	return <CalendarPageApp />;
};
