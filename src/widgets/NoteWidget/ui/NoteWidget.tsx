import classNames from 'classnames';
import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { INote, Note, NotesList, TNoteFormFields } from 'entities/Note';
import { Divider } from 'shared/ui/Divider/Divider';
import s from './NoteWidget.module.scss';

const mockedNotes: INote[] = [
	{
		id: 1,
		date: '21.02.2023',
		text: 'text',
		title: 'Заметка номер 1',
		author: 'author',
	},
	{
		id: 2,
		date: '21.02.2023',
		text: 'text',
		title: 'Заметка номер 2',
		author: 'author',
	},
	{
		id: 3,
		date: '21.02.2023',
		text: 'text',
		title: 'Заметка номер 3',
		author: 'author',
	},
	{
		id: 4,
		date: '21.02.2023',
		text: 'text',
		title: 'Заметка номер 4',
		author: 'author',
	},
];

interface INoteWidgetProps {
	className?: string;
}

export const NoteWidget = (props: INoteWidgetProps) => {
	const { className } = props;

	const { control } = useForm<TNoteFormFields>();

	const {
		field: { value: title, onChange: onChangeTitle },
	} = useController<TNoteFormFields>({ name: 'title', control });

	const {
		field: { value: text, onChange: onChangeText },
	} = useController<TNoteFormFields>({ name: 'text', control });

	return (
		<div className={classNames(s.NoteWidget, className)}>
			<NotesList notes={mockedNotes} />

			<Divider />

			<Note
				onChangeTitle={onChangeTitle}
				onChangeText={onChangeText}
				title={title}
				text={text}
			/>
		</div>
	);
};
