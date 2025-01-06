import { List } from './ui/List/List';

type TFriendEntityComponents = {
	List: typeof List;
};

export const FriendEntity: TFriendEntityComponents = {
	List: List,
};

export { useGetFriendsList } from './api/useGetFriendsList';
export { useSearchUsersExtendedFriend } from './api/useSearchUsersExtendedFriend';
export { useGetIncomingFriendRequests } from './api/useGetIncomingFriendRequests';
export { useGetOutgoingFriendRequests } from './api/useGetOutgoingFriendRequests';

export { TFriendStatus, TExtendedUserWithFriendStatus } from './model/types/friendEntity';
