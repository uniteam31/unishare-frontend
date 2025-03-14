import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';

// eslint-disable-next-line
const SpacesPageApp = lazy(() => import('spaces/App'));

export const SpacesPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/spaces');
	}, [setCurrentService]);

	return <SpacesPageApp />;
};
