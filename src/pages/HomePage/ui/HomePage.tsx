import React, { Suspense, memo, useEffect } from 'react';
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

			<Suspense fallback={<div>Loading Notes...</div>}>
				<NotesWidget />
			</Suspense>

			<Suspense fallback={<div>Loading Friends...</div>}>
				<FriendsWidget />
			</Suspense>
		</div>
	);
});

export default HomePage;
