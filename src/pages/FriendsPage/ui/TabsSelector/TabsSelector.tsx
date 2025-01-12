import classNames from 'classnames';
import React, { memo, useCallback } from 'react';
import {
	useGetFriendsList,
	useGetIncomingFriendRequests,
	useGetOutgoingFriendRequests,
} from 'entities/FriendEntity';
import { Notifications } from 'entities/Notifications';
import { friendsTabs } from '../../model/friendsTabs';
import type { TFriendsTabName } from '../../model/friendsTabs';
import s from './TabsSelector.module.scss';

interface ITabsSelectorProps {
	onClickTab: (tabName: TFriendsTabName) => void;
	currentTab: TFriendsTabName;
}

export const TabsSelector = memo((props: ITabsSelectorProps) => {
	const { onClickTab, currentTab } = props;

	const { incomingFriendRequests } = useGetIncomingFriendRequests();
	const { outgoingFriendRequests } = useGetOutgoingFriendRequests();
	const { friendsList } = useGetFriendsList();

	const handleSelectTab = useCallback(
		(tabName: TFriendsTabName) => {
			onClickTab(tabName);
		},
		[onClickTab],
	);

	const arrayTabs = Object.entries(friendsTabs);

	return (
		<div className={s.TabsSelector}>
			{arrayTabs.map(([tabName, tab]) => (
				<div
					className={classNames(s.tabsSelectorItem, tabName === currentTab && s.active)}
					onClick={() => handleSelectTab(tabName as TFriendsTabName)}
					key={tab.title}
				>
					{tabName === 'incomingRequests' && (
						<Notifications.CircleCounter count={incomingFriendRequests.length} />
					)}

					{tabName === 'outgoingRequests' && (
						<Notifications.CircleCounter
							count={outgoingFriendRequests.length}
							color={'orange'}
						/>
					)}

					{tabName === 'friendsList' && (
						<Notifications.CircleCounter count={friendsList.length} color={'green'} />
					)}

					{tab.title}
				</div>
			))}
		</div>
	);
});
