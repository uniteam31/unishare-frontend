import classNames from 'classnames';
import React, { useCallback } from 'react';
import { INote, Note, useGetNotes, useNoteStore } from 'entities/Note';
import { Widget } from 'entities/Widget';
import NoteIcon from 'shared/assets/icons/note.svg';
import { Link } from 'shared/ui/Link/Link';
import s from './NoteWidget.module.scss';

interface INoteWidgetProps {
	className?: string;
}

export const NoteWidget = (props: INoteWidgetProps) => {
	const { className } = props;

	const { notes, isLoading, error } = useGetNotes();
	const { setSelectedNote } = useNoteStore();

	const handleNoteClick = useCallback(
		(id: INote['id']) => {
			const selectedNote = notes.find((note) => id === note.id);

			if (!selectedNote) {
				return;
			}

			setSelectedNote(selectedNote);
		},
		[notes, setSelectedNote],
	);

	return (
		<div className={classNames(s.NoteWidget, className)}>
			<Widget Icon={<NoteIcon className={s.icon} />} title={'Заметки'} headerTo={'/notes'}>
				<div className={s.notesList}>
					{notes.slice(0, 2).map((note) => (
						<Link to={'/notes'} key={note.id}>
							<Note.ListItem className={s.note} {...note} onClick={handleNoteClick} />
						</Link>
					))}
				</div>
			</Widget>
		</div>
	);
};
