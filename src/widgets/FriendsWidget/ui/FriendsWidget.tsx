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
	const { incomingFriendRequests, isLoading, error } = useGetIncomingFriendRequests();

	const isRequestsLoading = isLoading && !error;
	const isRequestsEmpty = !incomingFriendRequests.length;
	const isError = !isLoading && error;

	return (
		<div className={classNames(s.FriendsWidget, className)}>
			<Widget Icon={<FriendsIcon className={s.icon} />} title={'Друзья'} to={'/friends'}>
				{isError && <Warning title={'Ошибка'} text={'Скорее всего мы над этим работаем'} />}

				{!isRequestsEmpty && !isRequestsLoading && (
					<FriendEntity.ListItem
						className={s.request}
						{...incomingFriendRequests[0]}
						ActionComponent={FriendAction}
					/>
				)}

				{!isRequestsLoading && isRequestsEmpty && (
					<Warning title={'Входящих заявок нет'} theme={'blue'} />
				)}

				{isRequestsLoading && <Skeleton className={s.skeleton} />}
			</Widget>
		</div>
	);
};
