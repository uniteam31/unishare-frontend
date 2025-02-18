import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';

// @ts-ignore
const NotesPageApp = lazy(() => import('notes/App'));

export const NotesPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/notes');
	}, [setCurrentService]);

	return <NotesPageApp />;
};
