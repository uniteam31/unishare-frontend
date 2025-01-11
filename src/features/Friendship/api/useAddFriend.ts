import { useCallback, useState } from 'react';
import type { IUser } from 'entities/User';
import axiosInstance from 'shared/api/axiosInstance';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';

interface IAddFriendProps {
	userID: IUser['_id'];
}

export const useAddFriend = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const addFriend = useCallback(async (props: IAddFriendProps) => {
		const { userID } = props;

		setIsLoading(true);
		setError(null);

		try {
			await axiosInstance.post(`/friends/add/${userID}`);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при отправке запроса в друзья';

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		addFriend,
	};
};
