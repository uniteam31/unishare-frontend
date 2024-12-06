import React, { useCallback, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { deleteNote, Note, putNote, useGetNotes, useNoteStore } from 'entities/Note';
import type { INote, TNoteFormFields } from 'entities/Note';

export const Form = () => {
	const { control, setValue, watch } = useFormContext<TNoteFormFields>();
	const { notes, mutateNodes } = useGetNotes();
	const { selectedNote, setSelectedNote } = useNoteStore();

	useEffect(() => {
		if (!selectedNote) {
			return;
		}

		/** Устанавливаем новые значения в форму при изменении selectedNote */
		setValue('title', selectedNote.title);
		setValue('text', selectedNote.text);
	}, [selectedNote, setValue]);

	// TODO закинуть обновление формы под debounce
	useEffect(() => {
		const subscription = watch((values) => {
			if (!selectedNote) {
				return;
			}

			/** Вызываем обновление заметки только после изменения данных формы */
			putNote({ body: values, id: selectedNote.id }).then(() => {
				const updatedNotes = notes.map((note) =>
					note.id === selectedNote.id ? { ...note, ...values } : note,
				);
				mutateNodes(updatedNotes, false).finally(); // обновляем кэш с новыми данными
			});
		});

		/** Очистка подписки при размонтировании компонента */
		return () => subscription.unsubscribe();
	}, [mutateNodes, notes, selectedNote, selectedNote?.id, watch]);

	/** Для удаления ноды */
	const handleNoteDelete = useCallback(
		(id: INote['id']) => {
			deleteNote({ id }).then(() => {
				setSelectedNote(null);

				const updatedNotes = notes.filter((note) => id !== note.id);

				mutateNodes(updatedNotes, false).finally();
			});
		},
		[mutateNodes, notes, setSelectedNote],
	);

	const {
		field: { value: title, onChange: onChangeTitle },
	} = useController<TNoteFormFields>({
		name: 'title',
		control,
		defaultValue: selectedNote?.title,
	});

	const {
		field: { value: text, onChange: onChangeText },
	} = useController<TNoteFormFields>({
		name: 'text',
		control,
		defaultValue: selectedNote?.text,
	});

	/** В общем если не выбрана заметка, то ничего не возвращаем */
	if (!selectedNote) {
		return;
	}

	return (
		<Note.Item
			onChangeTitle={onChangeTitle}
			onChangeText={onChangeText}
			title={title}
			text={text}
			id={selectedNote.id}
			onDelete={handleNoteDelete}
		/>
	);
};
