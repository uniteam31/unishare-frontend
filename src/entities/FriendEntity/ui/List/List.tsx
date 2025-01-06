import classNames from 'classnames';
import React, { memo } from 'react';
import type { IFriendEntity, TActionComponent } from '../../model/types/friendEntity';
import { ListItem } from '../ListItem/ListItem';
import s from './List.module.scss';

interface IListProps {
	friends: IFriendEntity['friends'];
	//
	ActionComponent?: TActionComponent;
	//
	className?: string;
}

export const List = memo((props: IListProps) => {
	const { friends, ActionComponent, className } = props;

	return (
		<div className={classNames(s.List, className)}>
			{friends.map((friend) => (
				<ListItem
					{...friend}
					key={friend._id}
					className={s.listItem}
					ActionComponent={ActionComponent}
				/>
			))}
		</div>
	);
});
