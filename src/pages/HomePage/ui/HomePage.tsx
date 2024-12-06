import React, { useEffect } from 'react';
import { NoteWidget } from 'widgets/NoteWidget';
import { UserWidget } from 'widgets/UserWidget';
import { useNavigationStore } from 'entities/Navigation';
import s from './HomePage.module.scss';

export const HomePage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('main');
	}, [setCurrentService]);

	return (
		<div className={s.HomePage}>
			<UserWidget />
			<NoteWidget />
		</div>
	);
};
