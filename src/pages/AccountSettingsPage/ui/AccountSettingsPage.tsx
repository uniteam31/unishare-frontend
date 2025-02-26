import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';

// eslint-disable-next-line
const AccountSettingsPageApp = lazy(() => import('accountSettings/App'));

export const AccountSettingsPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/account/settings');
	}, [setCurrentService]);

	return <AccountSettingsPageApp />;
};
