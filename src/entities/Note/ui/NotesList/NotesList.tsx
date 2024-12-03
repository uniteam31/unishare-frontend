import classNames from 'classnames';
import React from 'react';
import { NoteUI } from 'shared/ui';
import { INote } from '../../model/note';
import s from './NotesList.module.scss';

interface INotesListProps {
	notes: INote[];
	className?: string;
}

export const NotesList = (props: INotesListProps) => {
	const { notes, className } = props;

	return (
		<div className={classNames(s.NotesList, className)}>
			{notes.map((note) => {
				const { id, ...otherNoteFields } = note;

				return <NoteUI.Item key={id} {...otherNoteFields} className={s.item} />;
			})}
		</div>
	);
};
