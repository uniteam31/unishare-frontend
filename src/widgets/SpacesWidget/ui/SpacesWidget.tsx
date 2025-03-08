import { lazy, Suspense } from 'react';
import { LoadScreen } from 'shared/ui';

const SpacesWidgetComponent = lazy(() => import('spaces/Widget'));

export const SpacesWidget = () => {
	return (
		<Suspense fallback={<LoadScreen />}>
			<SpacesWidgetComponent />
		</Suspense>
	);
};
