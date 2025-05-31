import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { ErrorPage } from 'shared/ui';

const NotesPageApp = lazy(() =>
	// eslint-disable-next-line
	import('notes/App').catch(() => {
		return {
			default: () => <ErrorPage title={'Заметки'} text={'Сервис заметок недоступен'} />,
		};
	}),
);

export const NotesPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/notes');
	}, [setCurrentService]);

	return <NotesPageApp />;
};
