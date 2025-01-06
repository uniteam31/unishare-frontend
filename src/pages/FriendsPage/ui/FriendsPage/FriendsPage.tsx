import React, { memo, useCallback, useEffect, useState } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { Direction, Divider } from 'shared/ui/Divider/Divider';
import { friendsTabs, TFriendsTabName } from '../../model/friendsTabs';
import { TabsSelector } from '../TabsSelector/TabsSelector';
import s from './FriendsPage.module.scss';

const FriendsPage = memo(() => {
	const [currentTab, setCurrentTab] = useState<TFriendsTabName>('friendsList');
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/friends');
	}, [setCurrentService]);

	const handleSelectTab = useCallback((tabName: TFriendsTabName) => {
		setCurrentTab(tabName);
	}, []);

	return (
		<div className={s.FriendsPage}>
			<Divider direction={Direction.VERTICAL} />

			<TabsSelector currentTab={currentTab} onClickTab={handleSelectTab} />

			<Divider direction={Direction.VERTICAL} />

			<div className={s.tabs}>{friendsTabs[currentTab].Component}</div>

			<Divider direction={Direction.VERTICAL} />
		</div>
	);
});

export default FriendsPage;
