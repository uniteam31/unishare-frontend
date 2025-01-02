import { Avatar, Text } from '@uniteam31/uni-shared-ui';
import React from 'react';
import { useUserStore } from 'entities/User';
import { Widget } from 'entities/Widget';
import s from './UserWidget.module.scss';

export const UserWidget = () => {
	const { authData } = useUserStore();

	return (
		<div className={s.UserWidget}>
			<Widget className={s.innerWidget}>
				<Avatar
					className={s.avatar}
					src={
						'https://avatars.mds.yandex.net/i?id=29f7366ac823f46165612d9480e60f0e_l-13215132-images-thumbs&n=13'
					}
				/>

				{/* TODO разделить на два компонента, first и last names */}
				<Text title={authData?.firstName} />
			</Widget>
		</div>
	);
};
