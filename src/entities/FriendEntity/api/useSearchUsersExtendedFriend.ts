import useSWR from 'swr';
import type { IUser } from 'entities/User';
import axiosInstance from 'shared/api/axiosInstance';
import type { ApiResponse } from 'shared/api/types';
import type { IFriendEntity } from '../model/types/friendEntity';

interface ISearchUserProps {
	username: IUser['username'];
}

type TSearchUsersExtendedFriendResponse = ApiResponse<IFriendEntity['friends']>;

export const useSearchUsersExtendedFriend = (props: ISearchUserProps) => {
	const { username } = props;

	const fetcher = () =>
		axiosInstance
			.get<TSearchUsersExtendedFriendResponse>('/users', {
				params: {
					username,
				},
			})
			.then((response) => response.data.data);

	const { isValidating, data, error, mutate } = useSWR(
		`/api/users?username=${username}`,
		fetcher,
	);

	const foundUsers = data || [];

	return {
		foundUsers,
		isLoading: isValidating,
		error,
		mutateFoundUsers: mutate,
	};
};
