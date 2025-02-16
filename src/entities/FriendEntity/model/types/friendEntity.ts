import type { ComponentType } from 'react';
import type { IUser } from 'entities/User';
import type { TMeta } from 'shared/types';

export type TFriendStatus = 'friend' | 'pendingAcceptance' | 'sent' | null;
export type TExtendedUserWithFriendStatus = IUser & {
	friendStatus: TFriendStatus;
};

export type TActionComponent = ComponentType<{
	_id: IUser['_id'];
	friendStatus: TFriendStatus;
}>;

/** Поля сущности друзей */
export type TFriendEntityData = {
	friends: TExtendedUserWithFriendStatus[];
	incomingRequests: TExtendedUserWithFriendStatus[];
	outgoingRequests: TExtendedUserWithFriendStatus[];
};

/** Собранная сущность друзей */
export interface IFriendEntity extends TFriendEntityData, TMeta {}
