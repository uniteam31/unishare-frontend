import React from 'react';
import { NoteWidget } from 'widgets/NoteWidget';
import s from './NotesPage.module.scss';

export const NotesPage = () => {
	return (
		<div className={s.NotesPage}>
			<NoteWidget />
		</div>
	);
};
