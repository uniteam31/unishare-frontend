import { List } from './ui/List/List';
import { ListItem } from './ui/ListItem/ListItem';

type TFriendEntityComponents = {
	List: typeof List;
	ListItem: typeof ListItem;
};

export const FriendEntity: TFriendEntityComponents = {
	List,
	ListItem,
};

export { useGetFriendsList } from './api/useGetFriendsList';
export { useSearchUsersExtendedFriend } from './api/useSearchUsersExtendedFriend';
export { useGetIncomingFriendRequests } from './api/useGetIncomingFriendRequests';
export { useGetOutgoingFriendRequests } from './api/useGetOutgoingFriendRequests';

export { TFriendStatus, TExtendedUserWithFriendStatus } from './model/types/friendEntity';
