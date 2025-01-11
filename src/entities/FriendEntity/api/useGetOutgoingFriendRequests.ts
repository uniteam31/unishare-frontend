import useSWR from 'swr';
import axiosInstance from 'shared/api/axiosInstance';
import type { ApiResponse } from 'shared/api/types';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import type { IFriendEntity } from '../model/types/friendEntity';

type TGetOutgoingFriendRequestsResponse = ApiResponse<IFriendEntity['friends']>;

export const useGetOutgoingFriendRequests = () => {
	const fetcher = () =>
		axiosInstance
			.get<TGetOutgoingFriendRequestsResponse>('/friends/outgoing')
			.then((response) => response.data.data);

	const { isValidating, error, data } = useSWR('/api/friends/outgoing', fetcher);

	const outgoingFriendRequests = data || [];

	return {
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		outgoingFriendRequests,
	};
};
