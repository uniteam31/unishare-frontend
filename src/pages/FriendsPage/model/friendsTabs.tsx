import { ReactNode } from 'react';
import { AddFriendsList } from 'widgets/AddFriendsList';
import { FriendsList } from 'widgets/FriendsList';
import { IncomingFriendsRequestsList } from 'widgets/IncomingFriendsRequestsList';
import { OutgoingFriendsRequestsList } from 'widgets/OutgoingFriendsRequestsList';

export type TFriendsTabName =
	| 'friendsList'
	| 'addFriends'
	| 'incomingRequests'
	| 'outgoingRequests';

type TFriendsTab = {
	title: string;
	Component: ReactNode;
};

export const friendsTabs: Record<TFriendsTabName, TFriendsTab> = {
	friendsList: {
		title: 'Список друзей',
		Component: <FriendsList />,
	},
	addFriends: {
		title: 'Найти друзей',
		Component: <AddFriendsList />,
	},
	incomingRequests: {
		title: 'Входящие заявки',
		Component: <IncomingFriendsRequestsList />,
	},
	outgoingRequests: {
		title: 'Исходящие заявки',
		Component: <OutgoingFriendsRequestsList />,
	},
};
