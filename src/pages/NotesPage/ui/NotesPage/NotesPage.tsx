import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigationStore } from 'entities/Navigation';
import { INote, Note, postNote, TNoteFormFields, useGetNotes, useNoteStore } from 'entities/Note';
import { FormWrapper } from 'shared/lib/FormWrapper/FormWrapper';
import { Button, Text } from 'shared/ui';
import { Divider } from 'shared/ui/Divider/Divider';
import { Form } from '../Form/Form';
import s from './NotesPage.module.scss';

export const NotesPage = () => {
	const { selectedNote, setSelectedNote } = useNoteStore();

	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('notes');
	}, [setCurrentService]);

	// TODO задействовать isLoading и error
	const { notes, isLoading, error, mutateNodes } = useGetNotes();
	const methods = useForm<TNoteFormFields>();

	const handleNoteClick = useCallback(
		(id: INote['id']) => {
			const note = notes.find((note) => note.id === id);
			setSelectedNote(note);
		},
		[notes],
	);

	const handleNoteCreate = useCallback(async () => {
		const createdNote = await postNote();
		setSelectedNote(createdNote);

		mutateNodes([...notes, createdNote], false).finally();
	}, [mutateNodes, notes]);

	return (
		<div className={s.NotesPage}>
			<div className={s.notesList}>
				<Button className={s.createNoteButton} onClick={handleNoteCreate}>
					Создать заметку
				</Button>
				<Note.List notes={notes} onClickNote={handleNoteClick} />
			</div>

			<Divider />

			{!selectedNote && (
				<Text
					className={s.notification}
					title={'Выберите заметку или создайте новую'}
					text={'Для создания или выбора используйте панель слева'}
				/>
			)}

			{selectedNote && (
				<FormWrapper<TNoteFormFields> methods={methods}>
					<Form selectedNote={selectedNote} />
				</FormWrapper>
			)}
		</div>
	);
};
