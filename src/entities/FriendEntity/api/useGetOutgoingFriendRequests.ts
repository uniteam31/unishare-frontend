import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
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
