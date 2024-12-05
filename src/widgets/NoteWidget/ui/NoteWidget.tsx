import classNames from 'classnames';
import React from 'react';
import { Note, useGetNotes } from 'entities/Note';
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

	return (
		<div className={classNames(s.NoteWidget, className)}>
			<Widget Icon={<NoteIcon />} title={'Заметки'} headerTo={'/notes'}>
				<div className={s.notesList}>
					{notes.slice(0, 2).map((note) => (
						<Link to={`/notes/${note.id}`} key={note.id}>
							<Note.ListItem {...note} />
						</Link>
					))}
				</div>
			</Widget>
		</div>
	);
};
