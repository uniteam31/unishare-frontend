import classNames from 'classnames';
import React, { memo } from 'react';
import { Skeleton, Warning } from 'shared/ui';
import type { IFriendEntity, TActionComponent } from '../../model/types/friendEntity';
import { ListItem } from '../ListItem/ListItem';
import s from './List.module.scss';

interface IListProps {
	friends: IFriendEntity['friends'];
	ActionComponent?: TActionComponent;
	//
	isLoading?: boolean;
	error?: string;
	//
	className?: string;
}

// TODO добавить бесконечную ленту (UNI-89)
export const List = memo((props: IListProps) => {
	const { friends, ActionComponent } = props;
	const { isLoading, error, className } = props;

	const isUsersEmpty = !friends.length;

	return (
		<div className={classNames(s.List, className)}>
			{isLoading &&
				Array.from({ length: 5 }).map((_, index) => (
					<Skeleton className={s.skeleton} key={index} />
				))}

			{error && (
				<Warning
					title={'Что-то явно пошло не так'}
					text={error}
					theme={'red'}
					className={s.warning}
				/>
			)}

			{isUsersEmpty && !isLoading && !error && (
				<Warning
					title={'Список пуст'}
					text={'Здесь никого нет'}
					theme={'blue'}
					className={s.warning}
				/>
			)}

			{!isLoading &&
				!error &&
				friends.map((friend) => (
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
