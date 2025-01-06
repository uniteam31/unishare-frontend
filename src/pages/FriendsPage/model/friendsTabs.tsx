import { ReactNode } from 'react';
import { AddFriendsList } from 'widgets/AddFriendsList';
import { FriendsList } from 'widgets/FriendsList';
import { IncomingFriendsRequestsList } from 'widgets/IncomingFriendsRequestsList';

export type TFriendsTabName = 'friendsList' | 'addFriends' | 'incomingRequests';

type TFriendsTab = {
	title: string;
	Component: ReactNode;
};

export const FriendsTabs: Record<TFriendsTabName, TFriendsTab> = {
	friendsList: {
		title: 'Список друзей',
		Component: <FriendsList />,
	},
	addFriends: {
		title: 'Добавить друзей',
		Component: <AddFriendsList />,
	},
	incomingRequests: {
		title: 'Входящие заявки',
		Component: <IncomingFriendsRequestsList />,
	},
};
