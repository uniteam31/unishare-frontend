import React, { memo } from 'react';
import { useController, useForm } from 'react-hook-form';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useSearchUsersExtendedFriend } from 'entities/FriendEntity';
import { Input } from 'shared/ui';
import s from './AddFriendsList.module.scss';

export const AddFriendsList = memo(() => {
	const { control } = useForm<{ username: string }>();

	const {
		field: { value: username, onChange },
	} = useController({ name: 'username', defaultValue: '', control });

	const { foundUsers, isLoading, error } = useSearchUsersExtendedFriend({
		username,
	});

	return (
		<div className={s.friends}>
			<Input
				label={'Искать пользователя по username'}
				className={s.input}
				value={username}
				onChange={onChange}
			/>

			<FriendEntity.List
				friends={foundUsers}
				className={s.friendsList}
				ActionComponent={FriendAction}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
});
