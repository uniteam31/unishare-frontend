import { Suspense } from 'react';
import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from 'shared/ui';
import { AppRoutesProps, routerConfig } from '../routerConfig/routerConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

		return (
			<Route
				key={route.path}
				path={route.path}
				element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		);
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};
