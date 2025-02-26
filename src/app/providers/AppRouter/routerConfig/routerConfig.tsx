import { RouteProps } from 'react-router-dom';
import { AccountSettingsPage } from 'pages/AccountSettingsPage';
import { FriendsPage } from 'pages/FriendsPage';
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
	FRIENDS = 'friends',
	ACCOUNT_SETTINGS = 'accountSettings',
}

export type Path = '/' | '/notes' | '/welcome' | '/friends' | '/account/settings';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAIN]: '/',
	[Routes.NOTES]: '/notes',
	[Routes.WELCOME]: '/welcome',
	[Routes.FRIENDS]: '/friends',
	[Routes.ACCOUNT_SETTINGS]: '/account/settings',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
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
	[Routes.FRIENDS]: {
		path: RoutesPaths.friends,
		element: <FriendsPage />,
		authOnly: true,
	},
	[Routes.ACCOUNT_SETTINGS]: {
		path: RoutesPaths.accountSettings,
		element: <AccountSettingsPage />,
		authOnly: true,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
