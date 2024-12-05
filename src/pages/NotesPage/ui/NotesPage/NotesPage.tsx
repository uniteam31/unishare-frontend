import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { INote, Note, TNoteFormFields, useGetNotes } from 'entities/Note';
import { FormWrapper } from 'shared/lib/FormWrapper/FormWrapper';
import { Divider } from 'shared/ui/Divider/Divider';
import { Form } from '../Form/Form';
import s from './NotesPage.module.scss';

export const NotesPage = () => {
	const [selectedNote, setSelectedNote] = useState<INote | null>();

	// TODO задействовать isLoading и error
	const { notes, isLoading, error } = useGetNotes();
	const methods = useForm<TNoteFormFields>();

	const handleNoteClick = useCallback(
		(id: INote['id']) => {
			const note = notes.find((note) => note.id === id);
			setSelectedNote(note);
		},
		[notes],
	);

	return (
		<div className={s.NotesPage}>
			<Note.List notes={notes} onClickNote={handleNoteClick} />

			<Divider />

			{!selectedNote && <div>Выберите заметку</div>}

			{selectedNote && (
				<FormWrapper<TNoteFormFields> methods={methods}>
					<Form selectedNote={selectedNote} />
				</FormWrapper>
			)}
		</div>
	);
};
