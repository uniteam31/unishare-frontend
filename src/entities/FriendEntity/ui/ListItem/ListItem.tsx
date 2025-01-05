import { Text } from '@uniteam31/uni-shared-ui';
import classNames from 'classnames';
import React, { memo } from 'react';
import RemoveIcon from 'shared/assets/icons/remove.svg';
import { Avatar } from 'shared/ui';
import type { TFriend } from '../../model/types/friendEntity';
import s from './ListItem.module.scss';

interface IListItemProps extends TFriend {
	className?: string;
}

export const ListItem = memo((props: IListItemProps) => {
	const { username, firstName, avatar, className } = props;

	return (
		<div className={classNames(s.ListItem, className)}>
			<div className={s.wrapper}>
				{/* TODO расхардкодить */}
				<Avatar
					src={
						avatar ||
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
					className={s.avatar}
				/>

				<Text title={username} text={firstName} className={s.personalInfo} />
			</div>

			<RemoveIcon className={s.icon} />
		</div>
	);
});
