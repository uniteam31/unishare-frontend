import { lazy, Suspense } from 'react';
import { LoadScreen } from 'shared/ui';

const FriendsWidgetComponent = lazy(() => import('friends/Widget'));

export const FriendsWidget = () => {
	return (
		<Suspense fallback={<LoadScreen />}>
			<FriendsWidgetComponent />
		</Suspense>
	);
};
