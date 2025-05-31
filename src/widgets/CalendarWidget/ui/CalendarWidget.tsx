import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorWidget, LoadScreen, Warning } from 'shared/ui';

const CalendarWidgetComponent = lazy(() =>
	import('calendar/Widget').catch(() => {
		return {
			default: () => (
				<ErrorWidget
					title={'Календарь'}
					text={'Сервис календаря недоступен'}
					size={'medium'}
				/>
			),
		};
	}),
);

export const CalendarWidget = () => {
	return (
		<ErrorBoundary
			fallback={
				<Warning theme={'red'} title={'Ошибка'} text={'Произошла непредвиденная ошибка'} />
			}
		>
			<Suspense fallback={<LoadScreen />}>
				<CalendarWidgetComponent />
			</Suspense>
		</ErrorBoundary>
	);
};
