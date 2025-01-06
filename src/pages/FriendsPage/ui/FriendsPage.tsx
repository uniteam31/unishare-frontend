import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { Direction, Divider } from 'shared/ui/Divider/Divider';
import { FriendsTabs } from '../model/friendsTabs';
import type { TFriendsTabName } from '../model/friendsTabs';
import s from './FriendsPage.module.scss';

const FriendsPage = memo(() => {
	const { setCurrentService } = useNavigationStore();

	const [currentTab, setCurrentTab] = useState<TFriendsTabName>('friendsList');

	useEffect(() => {
		setCurrentService('/friends');
	}, [setCurrentService]);

	const renderTabsSelector = useCallback(() => {
		const tabsArray = Object.entries(FriendsTabs);

		return tabsArray.map(([name, tab]) => (
			<div
				className={classNames(s.tabsSelectorItem, name === currentTab && s.active)}
				onClick={() => setCurrentTab(name as TFriendsTabName)}
				key={tab.title}
			>
				{tab.title}
			</div>
		));
	}, [currentTab]);

	return (
		<div className={s.FriendsPage}>
			<div className={s.friends}>
				<div className={s.tabsSelector}>{renderTabsSelector()}</div>

				<div className={s.tabs}>{FriendsTabs[currentTab].Component}</div>
			</div>

			<Divider direction={Direction.VERTICAL} />
		</div>
	);
});

export default FriendsPage;
