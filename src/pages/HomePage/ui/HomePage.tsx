import React, { memo, useCallback, useEffect, useState } from 'react';
import { AccountSettingsWidget } from 'widgets/AccountSettingsWidget';
import { CalendarWidget } from 'widgets/CalendarWidget';
import { FriendsWidget } from 'widgets/FriendsWidget';
import { NotesWidget } from 'widgets/NotesWidget';
import { SpacesWidget } from 'widgets/SpacesWidget';
import { useNavigationStore } from 'entities/Navigation';
import { SpaceIDController } from 'entities/Space';
import type { ISpace } from 'entities/Space';
import { useUserStore } from 'entities/User';
import s from './HomePage.module.scss';

const HomePage = memo(() => {
	const { setCurrentService } = useNavigationStore();
	const { authData } = useUserStore();

	const [currentSpaceID, setCurrentSpaceID] = useState<ISpace['_id']>();

	const watchLocalstorageCurrentSpaceID = useCallback(() => {
		const currentSpaceID = SpaceIDController.getCurrentSpaceID();
		setCurrentSpaceID(currentSpaceID);
	}, []);

	useEffect(() => {
		setCurrentService('/');
	}, [setCurrentService]);

	useEffect(() => {
		watchLocalstorageCurrentSpaceID();

		window.addEventListener('storage', watchLocalstorageCurrentSpaceID);

		return () => {
			window.removeEventListener('storage', watchLocalstorageCurrentSpaceID);
		};
	}, [watchLocalstorageCurrentSpaceID]);

	const isCurrentSpacePersonal = authData?.personalSpaceID === currentSpaceID;

	return (
		<div className={s.HomePage}>
			{isCurrentSpacePersonal && <AccountSettingsWidget />}

			<NotesWidget />

			<CalendarWidget />

			{isCurrentSpacePersonal && <FriendsWidget />}

			<SpacesWidget />
		</div>
	);
});

export default HomePage;
