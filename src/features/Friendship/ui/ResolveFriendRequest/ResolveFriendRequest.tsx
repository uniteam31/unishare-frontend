import { useCallback } from 'react';
import { mutate } from 'swr';
import type { IUser } from 'entities/User';
import { Button } from 'shared/ui';
import { useAcceptFriendRequest } from '../../api/useAcceptFriendRequest';
import { useDeclineFriendRequest } from '../../api/useDeclineFriendRequest';
import s from './ResolveFriendRequest.module.scss';

interface IResolveFriendRequestProps {
	_id: IUser['_id'];
}

export const ResolveFriendRequest = (props: IResolveFriendRequestProps) => {
	const { _id } = props;

	// TODO добавить уведомления на error
	const {
		acceptFriendRequest,
		isLoading: isRequestAccepting,
		error: errorAcceptFriendRequest,
	} = useAcceptFriendRequest();

	const {
		declineFriendRequest,
		isLoading: isRequestDeclining,
		error: errorDeclineFriendRequest,
	} = useDeclineFriendRequest();

	const handleAcceptFriendRequest = useCallback(() => {
		acceptFriendRequest({ userID: _id }).then(() => {
			// TODO разобраться с мутациями
			mutate((key) => true);
		});
	}, [_id, acceptFriendRequest]);

	const handleDeclineFriendRequest = useCallback(() => {
		declineFriendRequest({ userID: _id }).then(() => {
			// TODO разобраться с мутациями
			mutate((key) => true);
		});
	}, [_id, declineFriendRequest]);

	return (
		<div className={s.ResolveFriendRequest}>
			<Button
				onClick={handleAcceptFriendRequest}
				className={s.acceptRequest}
				disabled={isRequestAccepting}
			>
				Принять
			</Button>

			<Button
				onClick={handleDeclineFriendRequest}
				className={s.declineRequest}
				disabled={isRequestDeclining}
			>
				Отклонить
			</Button>
		</div>
	);
};
