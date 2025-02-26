import { lazy, Suspense } from 'react';
import { LoadScreen } from 'shared/ui';

const AccountSettingsWidgetComponent = lazy(() => import('accountSettings/Widget'));

export const AccountSettingsWidget = () => {
	return (
		<Suspense fallback={<LoadScreen />}>
			<AccountSettingsWidgetComponent />
		</Suspense>
	);
};
