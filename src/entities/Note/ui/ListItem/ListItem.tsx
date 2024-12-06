import classNames from 'classnames';
import React, { FC, memo, useCallback } from 'react';
import { INote } from '../../model/types/note';
import s from './ListItem.module.scss';

interface IListItemProps extends Partial<INote> {
	onClick?: (id: INote['id']) => void;
	//
	className?: string;
}

// TODO добавить автора
export const ListItem: FC<IListItemProps> = memo((props) => {
	const { title, text, date, className } = props;
	//
	const { id, onClick } = props;

	const handleClick = useCallback(() => {
		if (!id) {
			return;
		}

		onClick?.(id);
	}, [id, onClick]);

	// TODO добавить валидатор длины полей и скрывать под хайд и ...
	return (
		<div className={classNames(s.ListItem, className)} onClick={handleClick}>
			<div className={s.title}>{title?.length ? title : 'Нет названия'}</div>
			<div className={s.text}>{text?.length ? text : 'Нет содержимого'}</div>
			<div className={s.date}>{date?.length ? date : 'Без даты создания'}</div>
		</div>
	);
});
