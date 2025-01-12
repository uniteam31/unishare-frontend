import { useCallback, useState } from 'react';
import type { IUser } from 'entities/User';
import axiosInstance from 'shared/api/axiosInstance';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';

interface ICancelFriendRequestProps {
	userID: IUser['_id'];
}

export const useCancelFriendRequest = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const canselFriendRequest = useCallback(async (props: ICancelFriendRequestProps) => {
		const { userID } = props;

		setIsLoading(true);
		setError(null);

		try {
			await axiosInstance.post(`/friends/cancel/${userID}`);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при отмене запроса в друзья';

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		canselFriendRequest,
	};
};
