import React, { useCallback, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { deleteNote, Note, putNote, useGetNotes, useNoteStore } from 'entities/Note';
import type { INote, TNoteFormFields } from 'entities/Note';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';

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

	/** Функция, посылающая новые данные заметки на сервер после ее изменения */
	const handleSubmitForm = useCallback(
		(selectedNote: INote, values: TNoteFormFields) => {
			/** Вызываем обновление заметки только после изменения данных формы */
			putNote({ body: values, id: selectedNote._id })
				.then(() => {
					const updatedNotes = notes.map((note) =>
						note._id === selectedNote._id ? { ...note, ...values } : note,
					);

					mutateNodes(updatedNotes, false).finally(); // обновляем кэш с новыми данными
				})
				.catch((e) => {
					// TODO можно выводить уведомление об ошибке
				});
		},
		[mutateNodes, notes],
	);

	const debouncedHandleSubmitForm = useDebounce(handleSubmitForm, 500);

	useEffect(() => {
		const subscription = watch((values) => {
			if (!selectedNote) {
				return;
			}

			debouncedHandleSubmitForm(selectedNote, values);
		});

		/** Очистка подписки при размонтировании компонента */
		return () => subscription.unsubscribe();
	}, [debouncedHandleSubmitForm, selectedNote, selectedNote?._id, watch]);

	/** Для удаления ноды */
	const handleNoteDelete = useCallback(
		(id: INote['_id']) => {
			deleteNote({ id }).then(() => {
				setSelectedNote(null);

				const updatedNotes = notes.filter((note) => id !== note._id);

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
			id={selectedNote._id}
			onDelete={handleNoteDelete}
		/>
	);
};
