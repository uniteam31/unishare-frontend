import { lazy, useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { ErrorPage } from 'shared/ui';

const DiskPageApp = lazy(() =>
	// eslint-disable-next-line
	import('disk/App').catch(() => {
		return {
			default: () => <ErrorPage title={'Диск'} text={'Сервис диск недоступен'} />,
		};
	}),
);

export const DiskPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/disk');
	}, [setCurrentService]);

	return <DiskPageApp />;
};
