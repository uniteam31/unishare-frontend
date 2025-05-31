declare module '*.scss' {
	// декларация для css modules на импорт
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;

declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

/** Декларация микрофронтов */
declare module 'notes/App';
declare module 'notes/Widget';

declare module 'friends/App';
declare module 'friends/Widget';

declare module 'calendar/App';
declare module 'calendar/Widget';

declare module 'accountSettings/App';
declare module 'accountSettings/Widget';

declare module 'spaces/App';
declare module 'spaces/Widget';

declare module 'disk/App';
declare module 'disk/Widget';
