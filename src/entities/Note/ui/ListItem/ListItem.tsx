import classNames from 'classnames';
import React, { FC, memo, useCallback } from 'react';
import { INote } from '../../model/note';
import s from './ListItem.module.scss';

interface IListItemProps extends INote {
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
		onClick?.(id);
	}, [id, onClick]);

	// TODO добавить валидатор длины полей и скрывать под хайд и ...
	return (
		<div className={classNames(s.ListItem, className)} onClick={handleClick}>
			<div className={s.title}>{title ?? 'Нет названия'}</div>
			<div className={s.text}>{text ?? 'Нет содержимого'}</div>
			<div className={s.date}>{date ?? 'Без даты создания'}</div>
		</div>
	);
});
