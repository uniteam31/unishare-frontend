import { List } from './ui/List/List';

type TFriendEntityComponents = {
	List: typeof List;
};

export const FriendEntity: TFriendEntityComponents = {
	List: List,
};

export { useGetFriendsList } from './api/useGetFriendsList';
export { TFriend } from './model/types/friendEntity';
