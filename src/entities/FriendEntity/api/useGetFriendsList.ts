import useSWR from 'swr';
import type { IUser } from 'entities/User';
import axiosInstance from 'shared/api/axiosInstance';
import type { ApiResponse } from 'shared/api/types';
import { useDebounceValue } from 'shared/hooks/useDebounceValue/useDebounceValue';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
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
