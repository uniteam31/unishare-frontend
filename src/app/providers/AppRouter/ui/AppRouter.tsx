import { Suspense } from 'react';
import { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { MODULES } from 'widgets/Navbar';
import type { TModuleItem } from 'widgets/Navbar';
import { ErrorPage, LoadScreen } from 'shared/ui';
import { Path, routerConfig } from '../routerConfig/routerConfig';
import type { AppRoutesProps } from '../routerConfig/routerConfig';
import { CheckRequirements } from '../ui/CheckRequirements';

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
			<ErrorBoundary
				fallback={
					<ErrorPage title={'Ошибка'} text={'Произошло что-то очень непонятное...'} />
				}
			>
				<Suspense fallback={<LoadScreen label={module.name} Icon={module?.Icon} />}>
					{route.element}
				</Suspense>
			</ErrorBoundary>
		);

		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					<CheckRequirements
						isInitRequired={route.initedOnly}
						isAuthRequired={route.authOnly}
					>
						{element}
					</CheckRequirements>
				}
			/>
		);
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};
