import { Suspense } from 'react';
import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MODULES, TModuleItem } from 'widgets/Navbar';
import { LoadScreen } from 'shared/ui';
import { AppRoutesProps, Path, routerConfig } from '../routerConfig/routerConfig';
import { RequireAuth } from './RequireAuth';

/** Рендерит все маршруты и проставляет разрешения на просмотр. Также показывает LoadScreen при загрузке
 * новой страницы с сервисом */
export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const currentPath = route.path as Path;
		let module: TModuleItem = {
			name: '',
		};

		/** Прохожусь по всем роутам и ищу совпадению по текущему пути. После этого иду в MODULES
		 * из навбара, где каждому пути сопоставлено его название и ставлю его в label
		 * */
		Object.values(routerConfig).forEach((appRoute) => {
			if (appRoute.path === currentPath) {
				module = MODULES[appRoute.path];
			}
		});

		const element = (
			<Suspense fallback={<LoadScreen label={module.name} Icon={module?.Icon} />}>
				{route.element}
			</Suspense>
		);

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
