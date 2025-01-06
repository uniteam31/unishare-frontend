import React, { memo } from 'react';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useGetFriendsList } from 'entities/FriendEntity';
import { Input } from 'shared/ui';
import s from './FriendsList.module.scss';

export const FriendsList = memo(() => {
	const { friendsList, isLoading, error } = useGetFriendsList();

	return (
		<div className={s.friends}>
			{/* TODO допилить */}
			<Input label={'Искать среди друзей'} className={s.input} />

			<FriendEntity.List
				friends={friendsList}
				className={s.friendsList}
				ActionComponent={FriendAction}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
});
