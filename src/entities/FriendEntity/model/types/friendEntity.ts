import type { IUser } from 'entities/User';
import type { TMeta } from 'shared/types/meta';

export type TFriend = IUser & {
	_id: TMeta['_id'];
};

/** Поля сущности друзей */
export type TFriendEntityData = {
	friends: TFriend[];
	incomingRequests: TFriend[];
	outgoingRequests: TFriend[];
};

/** Собранная сущность друзей */
export interface IFriendEntity extends TFriendEntityData, TMeta {}
