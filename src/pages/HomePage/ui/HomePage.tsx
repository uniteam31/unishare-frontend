import React, { memo, useCallback, useEffect } from 'react';
import { AccountSettingsWidget } from 'widgets/AccountSettingsWidget';
import { CalendarWidget } from 'widgets/CalendarWidget';
import { DiskWidget } from 'widgets/DiskWidget';
import { FriendsWidget } from 'widgets/FriendsWidget';
import { NotesWidget } from 'widgets/NotesWidget';
import { SpacesWidget } from 'widgets/SpacesWidget';
import { useNavigationStore } from 'entities/Navigation';
import { useGetUserSpaces } from 'entities/Space';
import { useUserStore } from 'entities/User';
import { Warning } from 'shared/ui';
import s from './HomePage.module.scss';

const HomePage = memo(() => {
	const { setCurrentService } = useNavigationStore();
	const { spaces } = useGetUserSpaces();

	// TODO: remove useless code
	const { authData, initAuthData } = useUserStore();

	/** Для связи между микрофронтами используются customEvents */
	const listenRequestInitAuthData = useCallback(() => {
		initAuthData();
	}, [initAuthData]);

	useEffect(() => {
		setCurrentService('/');
	}, [setCurrentService]);

	useEffect(() => {
		window.addEventListener('updateAuth', listenRequestInitAuthData);

		return () => {
			window.removeEventListener('updateAuth', listenRequestInitAuthData);
		};
	}, [listenRequestInitAuthData]);

	// TODO: в будущем разделять сценарии отсутствия пространств и инициализации
	const isSpacesAvailable = Boolean(spaces.length);

	return (
		<div className={s.HomePage}>
			{(!authData?.isInited || !isSpacesAvailable) && (
				<>
					<Warning
						className={s.welcomeMessage}
						title={'Создайте свое первое пространство, чтобы начать!'}
						theme={'blue'}
					/>
					<SpacesWidget />
				</>
			)}

			{authData?.isInited && isSpacesAvailable && (
				<>
					{/* TODO: выпилить отсюда и из микрофронта, перенести в навбар */}
					<AccountSettingsWidget />

					<NotesWidget />

					<CalendarWidget />

					<FriendsWidget />

					<SpacesWidget />

					<DiskWidget />
				</>
			)}
		</div>
	);
});

export default HomePage;
