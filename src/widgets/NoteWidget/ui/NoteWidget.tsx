import classNames from 'classnames';
import React, { useCallback } from 'react';
import { INote, Note, useGetNotes, useNoteStore } from 'entities/Note';
import { Widget } from 'entities/Widget';
import NoteIcon from 'shared/assets/icons/note.svg';
import { Skeleton, Warning } from 'shared/ui';
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
		(id: INote['_id']) => {
			const selectedNote = notes.find((note) => id === note._id);

			if (!selectedNote) {
				return;
			}

			setSelectedNote(selectedNote);
		},
		[notes, setSelectedNote],
	);

	return (
		<div className={classNames(s.NoteWidget, className)}>
			<Widget Icon={<NoteIcon className={s.icon} />} title={'Заметки'} to={'/notes'}>
				<div className={s.notesList}>
					{isLoading &&
						!error &&
						Array.from({ length: 2 }).map((_, index) => (
							<Skeleton className={s.skeleton} key={index} />
						))}

					{/** В данном виджете можно отобразить только 2 последние заметки */}
					{!isLoading &&
						notes.slice(0, 2).map((note) => (
							<Link to={'/notes'} key={note._id}>
								<Note.ListItem
									className={s.note}
									{...note}
									onClick={handleNoteClick}
								/>
							</Link>
						))}

					{!isLoading && !error && !notes.length && (
						<Warning
							title={'Заметок нет'}
							text={'Создайте первую внутри сервиса!'}
							theme={'blue'}
						/>
					)}

					{!isLoading && error && (
						<Warning
							title={'Произошла ошибка'}
							text={'Скорее всего мы уже работаем над этим'}
							theme={'red'}
						/>
					)}
				</div>
			</Widget>
		</div>
	);
};
