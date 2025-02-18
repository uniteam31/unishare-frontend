import { lazy } from 'react';

// @ts-ignore
const FriendsWidgetComponent = lazy(() => import('friends/Widget'));

export const FriendsWidget = () => {
	return <FriendsWidgetComponent />;
};
