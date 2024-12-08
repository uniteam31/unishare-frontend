import { RouteProps } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { NotesPage } from 'pages/NotesPage';
import { WelcomePage } from 'pages/WelcomePage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

/** Конфигурация путей всего приложения */
export enum Routes {
	MAIN = 'main',
	NOTES = 'notes',
	WELCOME = 'welcome',
}

export const RoutesPaths: Record<Routes, string> = {
	[Routes.MAIN]: '/',
	[Routes.NOTES]: '/notes',
	[Routes.WELCOME]: '/welcome',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	// должна быть главная страница, но сейчас просто редирект на заметки
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <HomePage />,
		authOnly: true,
	},
	[Routes.NOTES]: {
		path: RoutesPaths.notes,
		element: <NotesPage />,
		authOnly: true,
	},
	[Routes.WELCOME]: {
		path: RoutesPaths.welcome,
		element: <WelcomePage />,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
