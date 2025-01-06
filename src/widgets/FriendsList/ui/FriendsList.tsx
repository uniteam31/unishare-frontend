import React, { memo } from 'react';
import { FriendEntity, useGetFriendsList } from 'entities/FriendEntity';
import { Input } from 'shared/ui';
import s from './FriendsList.module.scss';

export const FriendsList = memo(() => {
	// TODO передать в List
	const { friendsList, isLoading, error } = useGetFriendsList();

	return (
		<div className={s.friends}>
			{/* TODO допилить */}
			<Input label={'Искать среди друзей'} className={s.input} />

			<FriendEntity.List friends={friendsList} className={s.friendsList} />
		</div>
	);
});
