import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigationStore } from 'entities/Navigation';
import { Note, useCreateNote, TNoteFormFields, useGetNotes, useNoteStore } from 'entities/Note';
import type { INote } from 'entities/Note';
import { FormWrapper } from 'shared/lib/FormWrapper/FormWrapper';
import { Button } from 'shared/ui';
import { Divider } from 'shared/ui/Divider/Divider';
import { Form } from '../Form/Form';
import s from './NotesPage.module.scss';

const NotesPage = () => {
	const { selectedNote, setSelectedNote } = useNoteStore();
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/notes');
	}, [setCurrentService]);

	// TODO задействовать isLoading и error
	const { notes, isLoading, error, mutateNodes } = useGetNotes();

	const { createNote, isLoading: isNoteCreating, error: createNoteError } = useCreateNote();

	const methods = useForm<TNoteFormFields>();

	const handleNoteClick = useCallback(
		(id: INote['_id']) => {
			const note = notes.find((note) => note._id === id);

			if (!note) {
				return;
			}

			setSelectedNote(note);
		},
		[notes, setSelectedNote],
	);

	const handleNoteCreate = useCallback(() => {
		createNote().then((createdNote) => {
			if (!createdNote) {
				return;
			}

			setSelectedNote(createdNote);

			mutateNodes([createdNote, ...notes], false).finally();
		});
	}, [createNote, mutateNodes, notes, setSelectedNote]);

	return (
		<div className={s.NotesPage}>
			<div className={s.notesList}>
				<Button className={s.createNoteButton} onClick={handleNoteCreate}>
					Создать заметку
				</Button>
				<Note.List
					notes={notes}
					onClickNote={handleNoteClick}
					selectedNodeID={selectedNote?._id}
					isLoading={isLoading}
				/>
			</div>

			<Divider />

			<FormWrapper<TNoteFormFields> methods={methods}>
				<Form />
			</FormWrapper>
		</div>
	);
};

export default NotesPage;
