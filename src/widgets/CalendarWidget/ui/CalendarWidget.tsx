import { lazy, Suspense } from 'react';
import { LoadScreen } from 'shared/ui';

const CalendarWidgetComponent = lazy(() => import('calendar/Widget'));

export const CalendarWidget = () => {
	return (
		<Suspense fallback={<LoadScreen />}>
			<CalendarWidgetComponent />
		</Suspense>
	);
};
