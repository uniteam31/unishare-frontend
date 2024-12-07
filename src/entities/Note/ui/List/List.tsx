import classNames from 'classnames';
import React from 'react';
import { Skeleton, Text, TextAlign } from 'shared/ui';
import { INote } from '../../model/types/note';
import { ListItem } from '../ListItem/ListItem';
import s from './List.module.scss';

interface IListProps {
	notes: INote[];
	selectedNodeID?: INote['id'];
	onClickNote?: (id: INote['id']) => void;
	//
	isLoading?: boolean;
	className?: string;
}

export const List = (props: IListProps) => {
	const { notes, selectedNodeID, onClickNote, isLoading, className } = props;

	return (
		<div className={classNames(s.List, className)}>
			{!isLoading && !notes.length && <Text title={'Пусто'} align={TextAlign.CENTER} />}

			{isLoading &&
				Array.from({ length: 5 }).map((_, index) => (
					<Skeleton className={classNames(s.item, s.skeleton)} key={index} />
				))}

			{!isLoading &&
				notes.map((note) => {
					return (
						<ListItem
							key={note.id}
							{...note}
							className={classNames(s.item, note.id === selectedNodeID && s.selected)}
							onClick={onClickNote}
						/>
					);
				})}
		</div>
	);
};
