import useSWR from 'swr';
import axiosInstance from 'shared/api/axiosInstance';
import type { ApiResponse } from 'shared/api/types';
import type { IFriendEntity } from '../model/types/friendEntity';

type TGetFriendsList = ApiResponse<IFriendEntity['friends']>;

export const useGetFriendsList = () => {
	const fetcher = () =>
		axiosInstance.get<TGetFriendsList>('/friends/list').then((response) => response.data.data);

	// TODO вынести все ключи
	const { data, error, mutate, isValidating } = useSWR('api/friends/list', fetcher);

	const friendsList = data || [];

	return {
		friendsList,
		isLoading: isValidating,
		error,
		mutateFriendsList: mutate,
	};
};
