import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorWidget, LoadScreen, Warning } from 'shared/ui';

const NotesWidgetComponent = lazy(() =>
	import('notes/Widget').catch(() => {
		return {
			default: () => (
				<ErrorWidget title={'Заметки'} text={'Сервис заметок недоступен'} size={'medium'} />
			),
		};
	}),
);

export const NotesWidget = () => {
	return (
		<ErrorBoundary
			fallback={
				<Warning theme={'red'} title={'Ошибка'} text={'Произошла непредвиденная ошибка'} />
			}
		>
			<Suspense fallback={<LoadScreen />}>
				{NotesWidgetComponent && <NotesWidgetComponent />}
			</Suspense>
		</ErrorBoundary>
	);
};
