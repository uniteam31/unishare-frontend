import React from 'react';
import { Widget } from 'entities/Widget';
import s from './UserWidget.module.scss';

export const UserWidget = () => {
	return (
		<div className={s.UserWidget}>
			<Widget>User widget</Widget>
		</div>
	);
};
