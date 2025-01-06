import React from 'react';
import type { TFriendStatus } from 'entities/FriendEntity';
import type { IUser } from 'entities/User';
import { AddFriend } from '../AddFriend/AddFriend';
import { CancelFriendRequest } from '../CancelFriendRequest/CancelFriendRequest';
import { DeleteFriend } from '../DeleteFriend/DeleteFriend';
import { ResolveFriendRequest } from '../ResolveFriendRequest/ResolveFriendRequest';

interface IFriendActionProps {
	_id: IUser['_id'];
	friendStatus?: TFriendStatus;
}

export const FriendAction = (props: IFriendActionProps) => {
	const { _id, friendStatus } = props;

	// TODO поправить мутацию в каждой фиче!!!!
	// TODO в каждой фиче юзать состояния!!!!
	switch (friendStatus) {
		case 'friend':
			return <DeleteFriend _id={_id} />;
		case 'pendingAcceptance':
			return <ResolveFriendRequest _id={_id} />;
		case 'sent':
			return <CancelFriendRequest _id={_id} />;
		default:
			return <AddFriend _id={_id} />;
	}
};
