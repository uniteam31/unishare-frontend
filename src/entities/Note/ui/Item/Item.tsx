import classNames from 'classnames';
import React from 'react';
import TrashIcon from 'shared/assets/icons/trash.svg';
import { INote, TNoteFormFields } from '../../model/types/note';
import { TextArea } from '../TextArea/TextArea';
import { TitleInput } from '../TitleInput/TitleInput';
import s from './Item.module.scss';

interface INoteProps extends TNoteFormFields {
	className?: string;
	//
	onChangeTitle: (title: string) => void;
	onChangeText: (text: string) => void;
	//
	id: INote['_id'];
	onDelete?: (id: INote['_id']) => void;
}

// TODO задействовать поле date
export const Item = (props: INoteProps) => {
	const { onChangeText, onChangeTitle } = props;
	const { date, title, text, className } = props;
	const { id, onDelete } = props;

	return (
		<div className={classNames(s.Item, className)}>
			<TrashIcon className={s.trashIcon} onClick={() => onDelete?.(id)} />

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
