import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigationStore } from 'entities/Navigation';
import { INote, Note, postNote, TNoteFormFields, useGetNotes, useNoteStore } from 'entities/Note';
import { FormWrapper } from 'shared/lib/FormWrapper/FormWrapper';
import { Button } from 'shared/ui';
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
		(id: INote['_id']) => {
			const note = notes.find((note) => note._id === id);

			if (!note) {
				return;
			}

			setSelectedNote(note);
		},
		[notes, setSelectedNote],
	);

	const handleNoteCreate = useCallback(async () => {
		postNote()
			.then((createdNote) => {
				setSelectedNote(createdNote);

				mutateNodes([...notes, createdNote], false).finally();
			})
			.catch(() => {
				// TODO можно выводить уведомление об ошибке
			});
	}, [mutateNodes, notes, setSelectedNote]);

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

			{selectedNote && (
				<FormWrapper<TNoteFormFields> methods={methods}>
					<Form />
				</FormWrapper>
			)}
		</div>
	);
};
