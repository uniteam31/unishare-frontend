import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { Direction, Divider } from 'shared/ui/Divider/Divider';
import { TABS, TFriendsTabName } from '../model/tabs';
import s from './FriendsPage.module.scss';

const FriendsPage = memo(() => {
	const { setCurrentService } = useNavigationStore();

	const [currentTab, setCurrentTab] = useState<TFriendsTabName>('friendsList');

	useEffect(() => {
		setCurrentService('/friends');
	}, [setCurrentService]);

	const renderTabsSelector = useCallback(() => {
		const tabsArray = Object.entries(TABS);

		return tabsArray.map(([name, tab]) => (
			<div
				className={classNames(s.tabsSelectorItem, name === currentTab && s.active)}
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

				<div className={s.tabs}>{TABS[currentTab].Component}</div>
			</div>

			<Divider direction={Direction.VERTICAL} />
		</div>
	);
});

export default FriendsPage;
