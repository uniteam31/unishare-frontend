import classNames from 'classnames';
import { Widget } from 'entities/Widget';
import FriendsIcon from 'shared/assets/icons/friends.svg';
import s from './FriendsWidget.module.scss';

interface IFriendsWidgetProps {
	className?: string;
}

export const FriendsWidget = ({ className }: IFriendsWidgetProps) => {
	return (
		<div className={classNames(s.FriendsWidget, className)}>
			<Widget
				Icon={<FriendsIcon className={s.icon} />}
				title={'Друзья'}
				to={'/friends'}
			></Widget>
		</div>
	);
};
