import React, { memo } from 'react';
import s from './ListItem.module.scss';

interface IListItemProps {
	//
	className?: string;
}

export const ListItem = memo((props: IListItemProps) => {
	const { className } = props;

	return <div className={s.ListItem}></div>;
});
