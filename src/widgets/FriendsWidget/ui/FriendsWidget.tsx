import classNames from 'classnames';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useGetIncomingFriendRequests } from 'entities/FriendEntity';
import { Widget } from 'entities/Widget';
import FriendsIcon from 'shared/assets/icons/friends.svg';
import { Skeleton, Warning } from 'shared/ui';
import s from './FriendsWidget.module.scss';

interface IFriendsWidgetProps {
	className?: string;
}

export const FriendsWidget = ({ className }: IFriendsWidgetProps) => {
	const {
		incomingFriendRequests,
		isLoading: isFriendsRequestsLoading,
		error: errorFriendsRequests,
	} = useGetIncomingFriendRequests();

	const isFriendsRequestsEmpty = !incomingFriendRequests.length;

	return (
		<div className={classNames(s.FriendsWidget, className)}>
			<Widget Icon={<FriendsIcon className={s.icon} />} title={'Друзья'} to={'/friends'}>
				{errorFriendsRequests && (
					<Warning title={'Ошибка'} text={errorFriendsRequests} theme={'red'} />
				)}

				{!isFriendsRequestsEmpty && !isFriendsRequestsLoading && !errorFriendsRequests && (
					<FriendEntity.ListItem
						className={s.request}
						{...incomingFriendRequests[0]}
						ActionComponent={FriendAction}
					/>
				)}

				{!isFriendsRequestsLoading && isFriendsRequestsEmpty && !errorFriendsRequests && (
					<Warning title={'Входящих заявок нет'} theme={'blue'} />
				)}

				{isFriendsRequestsLoading && <Skeleton className={s.skeleton} />}
			</Widget>
		</div>
	);
};
