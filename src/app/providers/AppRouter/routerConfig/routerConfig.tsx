import { RouteProps } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { NotesPage } from 'pages/NotesPage';

/** Конфигурация путей всего приложения */

export enum Routes {
	MAIN = 'main',
	NOTES = 'notes',
}

export const RoutesPaths: Record<Routes, string> = {
	[Routes.MAIN]: '/',
	[Routes.NOTES]: '/notes',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, RouteProps> = {
	// должна быть главная страница, но сейчас просто редирект на заметки
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <HomePage />,
	},
	[Routes.NOTES]: {
		path: RoutesPaths.notes,
		element: <NotesPage />,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
