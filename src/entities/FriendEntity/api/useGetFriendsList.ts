import useSWR from 'swr';
import type { IUser } from 'entities/User';
import { axiosInstance } from 'shared/api';
import { useDebounceValue } from 'shared/hooks';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { IFriendEntity } from '../model/types/friendEntity';

interface IGetFriendsListProps {
	username?: IUser['username'];
}
type TGetFriendsListResponse = ApiResponse<IFriendEntity['friends']>;

export const useGetFriendsList = (props?: IGetFriendsListProps) => {
	const username = props?.username || '';
	const debouncedUsername = useDebounceValue(() => username, 300);

	const fetcher = () =>
		axiosInstance
			.get<TGetFriendsListResponse>('/friends/list', {
				params: {
					username: debouncedUsername,
				},
			})
			.then((response) => response.data.data);

	// TODO вынести все ключи
	const { data, error, mutate, isValidating } = useSWR(
		`api/friends/list/${debouncedUsername}`,
		fetcher,
	);

	const friendsList = data || [];

	return {
		friendsList,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutateFriendsList: mutate,
	};
};
