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

	const { acceptFriendRequest } = useAcceptFriendRequest();
	const { declineFriendRequest } = useDeclineFriendRequest();

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
			<Button onClick={handleAcceptFriendRequest}>Принять</Button>
			<Button onClick={handleDeclineFriendRequest}>Отклонить</Button>
		</div>
	);
};
