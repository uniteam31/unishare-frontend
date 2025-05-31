import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { ErrorPage } from 'shared/ui';

const FriendsPageApp = lazy(() =>
	// eslint-disable-next-line
	import('friends/App').catch(() => {
		return {
			default: () => <ErrorPage title={'Друзья'} text={'Сервис друзей недоступен'} />,
		};
	}),
);

export const FriendsPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/friends');
	}, [setCurrentService]);

	return <FriendsPageApp />;
};
