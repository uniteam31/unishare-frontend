import React, { memo, useEffect } from 'react';
import { FriendsWidget } from 'widgets/FriendsWidget';
import { NotesWidget } from 'widgets/NotesWidget';
import { UserWidget } from 'widgets/UserWidget';
import { useNavigationStore } from 'entities/Navigation';
import s from './HomePage.module.scss';

const HomePage = memo(() => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/');
	}, [setCurrentService]);

	return (
		<div className={s.HomePage}>
			<UserWidget />

			<NotesWidget />

			<FriendsWidget />
		</div>
	);
});

export default HomePage;
