import React, { memo, useEffect } from 'react';
import { AccountSettingsWidget } from 'widgets/AccountSettingsWidget';
import { CalendarWidget } from 'widgets/CalendarWidget';
import { FriendsWidget } from 'widgets/FriendsWidget';
import { NotesWidget } from 'widgets/NotesWidget';
import { SpacesWidget } from 'widgets/SpacesWidget';
import { useNavigationStore } from 'entities/Navigation';
import s from './HomePage.module.scss';

const HomePage = memo(() => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/');
	}, [setCurrentService]);

	return (
		<div className={s.HomePage}>
			<AccountSettingsWidget />

			<NotesWidget />

			<CalendarWidget />

			<FriendsWidget />

			<SpacesWidget />
		</div>
	);
});

export default HomePage;
