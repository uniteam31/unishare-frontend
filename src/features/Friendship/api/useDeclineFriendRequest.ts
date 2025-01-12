import { useCallback, useState } from 'react';
import type { IUser } from 'entities/User';
import axiosInstance from 'shared/api/axiosInstance';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';

interface IDeclineFriendRequestProps {
	userID: IUser['_id'];
}

export const useDeclineFriendRequest = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const declineFriendRequest = useCallback(async (props: IDeclineFriendRequestProps) => {
		const { userID } = props;

		setIsLoading(true);
		setError(null);

		try {
			await axiosInstance.post(`/friends/decline/${userID}`);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при отклонении запроса в друзья';

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		declineFriendRequest,
	};
};
