import { lazy } from 'react';

// @ts-ignore
const NotesWidgetComponent = lazy(() => import('notes/Widget'));

export const NotesWidget = () => {
	return <NotesWidgetComponent />;
};
