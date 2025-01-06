import { useCallback } from 'react';
import { mutate } from 'swr';
import type { IUser } from 'entities/User';
import { Button } from 'shared/ui';
import { useCancelFriendRequest } from '../../api/useCancelFriendRequest';

interface ICancelFriendRequestProps {
	_id: IUser['_id'];
}

export const CancelFriendRequest = (props: ICancelFriendRequestProps) => {
	const { _id } = props;

	// TODO добавить уведомление на error
	const { isLoading, canselFriendRequest, error } = useCancelFriendRequest();

	const handleCancelFriendRequest = useCallback(() => {
		canselFriendRequest({ userID: _id }).then(() => {
			// TODO разобраться с мутациями
			mutate((key) => true);
		});
	}, [_id, canselFriendRequest]);

	return (
		<Button onClick={handleCancelFriendRequest} disabled={isLoading}>
			Отменить
		</Button>
	);
};
