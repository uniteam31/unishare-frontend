import { ReactNode } from 'react';
import { FriendsList } from 'widgets/FriendsList';

export type TFriendsTabName = 'friendsList';

type TFriendsTab = {
	title: string;
	Component: ReactNode;
};

export const TABS: Record<TFriendsTabName, TFriendsTab> = {
	friendsList: {
		title: 'Список друзей',
		Component: <FriendsList />,
	},
};
