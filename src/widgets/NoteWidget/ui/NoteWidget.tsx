import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { INote, Note, TNoteFormFields } from 'entities/Note';
import { Divider } from 'shared/ui/Divider/Divider';
import s from './NoteWidget.module.scss';

interface INoteWidgetProps {
	className?: string;
}

export const NoteWidget = (props: INoteWidgetProps) => {
	const { className } = props;

	// const [selectedNote, setSelectedNote] = useState(0);

	const fetcher = () => axios<INote[]>({ method: 'GET', url: 'http://localhost:8080/notes' });
	const { data, error, isValidating } = useSWR('api/notes', fetcher);
	const notes = data?.data || [];

	const { control } = useForm<TNoteFormFields>();

	const {
		field: { value: title, onChange: onChangeTitle },
	} = useController<TNoteFormFields>({ name: 'title', control });

	const {
		field: { value: text, onChange: onChangeText },
	} = useController<TNoteFormFields>({ name: 'text', control });

	return (
		<div className={classNames(s.NoteWidget, className)}>
			<Note.List notes={notes} />

			<Divider />

			<Note.Item
				onChangeTitle={onChangeTitle}
				onChangeText={onChangeText}
				title={title}
				text={text}
			/>
		</div>
	);
};
