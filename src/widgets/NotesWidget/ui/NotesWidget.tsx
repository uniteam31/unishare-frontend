import { lazy, Suspense } from 'react';
import { LoadScreen } from 'shared/ui';

const NotesWidgetComponent = lazy(() => import('notes/Widget'));

export const NotesWidget = () => {
	return (
		<Suspense fallback={<LoadScreen />}>
			<NotesWidgetComponent />
		</Suspense>
	);
};
