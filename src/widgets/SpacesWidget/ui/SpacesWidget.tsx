import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorWidget, LoadScreen, Warning } from 'shared/ui';

const SpacesWidgetComponent = lazy(() =>
	import('spaces/Widget').catch(() => {
		return {
			default: () => (
				<ErrorWidget
					title={'Пространства'}
					text={'Сервис пространств недоступен'}
					size={'large'}
				/>
			),
		};
	}),
);

export const SpacesWidget = () => {
	return (
		<ErrorBoundary
			fallback={
				<Warning theme={'red'} title={'Ошибка'} text={'Произошла непредвиденная ошибка'} />
			}
		>
			<Suspense fallback={<LoadScreen />}>
				<SpacesWidgetComponent />
			</Suspense>
		</ErrorBoundary>
	);
};
