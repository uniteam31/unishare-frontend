import classNames from 'classnames';
import React from 'react';
import { INote } from '../../model/types/note';
import { ListItem } from '../ListItem/ListItem';
import s from './List.module.scss';

interface IListProps {
	notes: INote[];
	onClickNote?: (id: INote['id']) => void;
	className?: string;
}

export const List = (props: IListProps) => {
	const { notes, onClickNote, className } = props;

	return (
		<div className={classNames(s.List, className)}>
			{notes.map((note) => {
				return (
					<ListItem key={note.id} {...note} className={s.item} onClick={onClickNote} />
				);
			})}
		</div>
	);
};
