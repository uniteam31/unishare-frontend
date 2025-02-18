import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';

// @ts-ignore
const NotesPageApp = lazy(() => import('friends/App'));

export const FriendsPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/friends');
	}, [setCurrentService]);

	return <NotesPageApp />;
};
