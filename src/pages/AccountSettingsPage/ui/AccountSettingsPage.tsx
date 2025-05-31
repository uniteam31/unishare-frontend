import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { ErrorPage } from 'shared/ui';

const AccountSettingsPageApp = lazy(() =>
	// eslint-disable-next-line
	import('accountSettings/App').catch(() => {
		return {
			default: () => (
				<ErrorPage title={'Аккаунт'} text={'Сервис настройки пользователя недоступен'} />
			),
		};
	}),
);

export const AccountSettingsPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/account/settings');
	}, [setCurrentService]);

	return <AccountSettingsPageApp />;
};
