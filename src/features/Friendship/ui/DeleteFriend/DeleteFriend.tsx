import { useCallback } from 'react';
import { mutate } from 'swr';
import type { IUser } from 'entities/User';
import { Button } from 'shared/ui';
import { useDeleteFriend } from '../../api/useDeleteFriend';

interface IDeleteFriendProps {
	_id: IUser['_id'];
}

export const DeleteFriend = (props: IDeleteFriendProps) => {
	const { _id } = props;

	const { isLoading, deleteFriend, error } = useDeleteFriend();

	const handleDeleteFriendClick = useCallback(() => {
		deleteFriend({ userID: _id }).then(() => {
			// TODO разобраться с мутациями
			mutate((key) => true);
		});
	}, [_id, deleteFriend]);

	return <Button onClick={handleDeleteFriendClick}>Удалить</Button>;
};
