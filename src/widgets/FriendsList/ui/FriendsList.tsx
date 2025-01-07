import React, { memo } from 'react';
import { useController, useForm } from 'react-hook-form';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useGetFriendsList } from 'entities/FriendEntity';
import { Input } from 'shared/ui';
import s from './FriendsList.module.scss';

export const FriendsList = memo(() => {
	const { control } = useForm<{ username: string }>();

	const {
		field: { value: username, onChange },
	} = useController({ name: 'username', defaultValue: '', control });

	const { friendsList, isLoading, error } = useGetFriendsList({ username });

	return (
		<div className={s.friends}>
			<Input
				label={'Искать среди друзей'}
				value={username}
				onChange={onChange}
				className={s.input}
			/>

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
