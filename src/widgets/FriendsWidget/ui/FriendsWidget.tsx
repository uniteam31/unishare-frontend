import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorWidget, LoadScreen, Warning } from 'shared/ui';

const FriendsWidgetComponent = lazy(() =>
	import('friends/Widget').catch(() => {
		return {
			default: () => (
				<ErrorWidget title={'Друзья'} text={'Сервис друзей недоступен'} size={'small'} />
			),
		};
	}),
);

export const FriendsWidget = () => {
	return (
		<ErrorBoundary
			fallback={
				<Warning theme={'red'} title={'Ошибка'} text={'Произошла непредвиденная ошибка'} />
			}
		>
			<Suspense fallback={<LoadScreen />}>
				<FriendsWidgetComponent />
			</Suspense>
		</ErrorBoundary>
	);
};
