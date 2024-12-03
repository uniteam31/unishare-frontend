import classNames from 'classnames';
import React from 'react';
import { NoteUI } from 'shared/ui';
import { TNoteFormFields } from '../../model/note';
import s from './Note.module.scss';

interface INoteProps extends TNoteFormFields {
	className?: string;
	//
	onChangeTitle: (title: string) => void;
	onChangeText: (text: string) => void;
}

// TODO задействовать поле date
export const Note = (props: INoteProps) => {
	const { onChangeText, onChangeTitle } = props;
	const { date, title, text, className } = props;

	return (
		<div className={classNames(s.NotesList, className)}>
			<NoteUI.TitleInput
				value={title}
				onChange={onChangeTitle}
				placeholder={'Введите название...'}
				className={s.title}
			/>

			<NoteUI.TextArea value={text} onChange={onChangeText} />
		</div>
	);
};
