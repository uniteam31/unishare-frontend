import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { INote, Note, putNote, TNoteFormFields, useGetNotes } from 'entities/Note';

interface IFormProps {
	selectedNote: INote;
}

export const Form = ({ selectedNote }: IFormProps) => {
	const { control, setValue, watch } = useFormContext<TNoteFormFields>();
	const { notes, mutateNodes } = useGetNotes();

	useEffect(() => {
		/** Устанавливаем новые значения в форму при изменении selectedNote */
		setValue('title', selectedNote.title);
		setValue('text', selectedNote.text);
	}, [selectedNote, setValue]);

	// TODO закинуть обновление формы под debounce
	useEffect(() => {
		const subscription = watch((values) => {
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
	}, [mutateNodes, notes, selectedNote.id, watch]);

	const {
		field: { value: title, onChange: onChangeTitle },
	} = useController<TNoteFormFields>({
		name: 'title',
		control,
		defaultValue: selectedNote.title,
	});

	const {
		field: { value: text, onChange: onChangeText },
	} = useController<TNoteFormFields>({
		name: 'text',
		control,
		defaultValue: selectedNote.text,
	});

	return (
		<Note.Item
			onChangeTitle={onChangeTitle}
			onChangeText={onChangeText}
			title={title}
			text={text}
		/>
	);
};
