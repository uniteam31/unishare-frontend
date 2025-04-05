import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorWidget, LoadScreen, Warning } from 'shared/ui';

const DiskWidgetComponent = lazy(() =>
	import('disk/Widget').catch(() => {
		return {
			default: () => (
				<ErrorWidget title={'Диск'} text={'Сервис диска недоступен'} size={'medium'} />
			),
		};
	}),
);

export const DiskWidget = () => {
	return (
		<ErrorBoundary
			fallback={
				<Warning theme={'red'} title={'Ошибка'} text={'Произошла непредвиденная ошибка'} />
			}
		>
			<Suspense fallback={<LoadScreen />}>
				<DiskWidgetComponent />
			</Suspense>
		</ErrorBoundary>
	);
};
