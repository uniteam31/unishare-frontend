import classNames from 'classnames';
import React from 'react';
import { TNoteFormFields } from '../../model/note';
import { TextArea } from '../TextArea/TextArea';
import { TitleInput } from '../TitleInput/TitleInput';
import s from './Item.module.scss';

interface INoteProps extends TNoteFormFields {
	className?: string;
	//
	onChangeTitle: (title: string) => void;
	onChangeText: (text: string) => void;
}

// TODO задействовать поле date
export const Item = (props: INoteProps) => {
	const { onChangeText, onChangeTitle } = props;
	const { date, title, text, className } = props;

	return (
		<div className={classNames(s.Item, className)}>
			<TitleInput
				value={title}
				onChange={onChangeTitle}
				placeholder={'Введите название...'}
				className={s.title}
			/>

			<TextArea value={text} onChange={onChangeText} />
		</div>
	);
};
