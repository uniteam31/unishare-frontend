import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routerConfig } from '../routerConfig/routerConfig';
// import cls from './AppRouter.module.scss';

// TODO добавить Loader
// провайдер и функция для отрисовки страниц исходя из конфига
export const AppRouter = memo(() => {
	const renderRoutes = useCallback((route: RouteProps) => {
		const element = <Suspense fallback={'Загрузка...'}>{route.element}</Suspense>;

		return <Route element={element} key={route.path} path={route.path} />;
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderRoutes)}</Routes>;
});
