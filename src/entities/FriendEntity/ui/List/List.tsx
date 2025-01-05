import classNames from 'classnames';
import React, { memo } from 'react';
import type { TFriend } from '../../model/types/friendEntity';
import { ListItem } from '../ListItem/ListItem';
import s from './List.module.scss';

interface IListProps {
	friends: TFriend[];
	//
	className?: string;
}

export const List = memo((props: IListProps) => {
	const { friends, className } = props;

	return (
		<div className={classNames(s.List, className)}>
			{friends.map((friend) => (
				<ListItem
					firstName={friend.firstName}
					username={friend.username}
					_id={friend._id}
					key={friend._id}
				/>
			))}
		</div>
	);
});
