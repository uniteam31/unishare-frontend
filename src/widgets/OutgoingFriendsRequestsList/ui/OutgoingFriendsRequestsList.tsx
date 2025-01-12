import React, { memo } from 'react';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useGetOutgoingFriendRequests } from 'entities/FriendEntity';
import s from './OutgoingFriendsRequestsList.module.scss';

export const OutgoingFriendsRequestsList = memo(() => {
	const { outgoingFriendRequests, isLoading, error } = useGetOutgoingFriendRequests();

	return (
		<div className={s.OutgoingFriendsRequestsList}>
			<FriendEntity.List
				friends={outgoingFriendRequests}
				ActionComponent={FriendAction}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
});
