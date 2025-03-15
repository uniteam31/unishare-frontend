import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { ErrorPage } from 'shared/ui';

const SpacesPageApp = lazy(() =>
	// eslint-disable-next-line
	import('spaces/App').catch(() => {
		return {
			default: () => (
				<ErrorPage title={'Пространства'} text={'Сервис пространств недоступен'} />
			),
		};
	}),
);

export const SpacesPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/spaces');
	}, [setCurrentService]);

	return <SpacesPageApp />;
};
