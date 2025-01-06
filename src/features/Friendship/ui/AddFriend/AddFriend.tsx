import { useCallback } from 'react';
import { mutate } from 'swr';
import type { IUser } from 'entities/User';
import { Button } from 'shared/ui';
import { useAddFriend } from '../../api/useAddFriend';

interface IAddFriendProps {
	_id: IUser['_id'];
}

export const AddFriend = (props: IAddFriendProps) => {
	const { _id } = props;

	const { isLoading, addFriend, error } = useAddFriend();

	const handleAddFriend = useCallback(() => {
		addFriend({ userID: _id }).then(() => {
			// TODO разобраться с мутациями
			mutate((key) => true);
		});
	}, [_id, addFriend]);

	return <Button onClick={handleAddFriend}>Добавить</Button>;
};
