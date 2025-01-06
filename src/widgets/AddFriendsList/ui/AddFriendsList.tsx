import React, { memo } from 'react';
import { useController, useForm } from 'react-hook-form';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useSearchUsersExtendedFriend } from 'entities/FriendEntity';
import { Input } from 'shared/ui';
import s from './AddFriendsList.module.scss';

export const AddFriendsList = memo(() => {
	// TODO дописать тип
	const { control } = useForm();

	const {
		field: { value, onChange },
	} = useController({ name: 'username', control, defaultValue: '' });

	const { foundUsers, isLoading, error } = useSearchUsersExtendedFriend({
		username: value,
	});

	return (
		<div className={s.friends}>
			{/* TODO допилить */}
			<Input
				label={'Искать пользователя по username'}
				className={s.input}
				value={value}
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
