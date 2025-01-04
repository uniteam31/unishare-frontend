import classNames from 'classnames';
import React, { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'shared/ui/Link/Link';
import s from './Widget.module.scss';

interface IWidgetProps {
	Icon?: ReactNode;
	title?: string;
	/** Куда введет ссылка при клике на header */
	to?: string;
	//
	className?: string;
}

export const Widget = (props: PropsWithChildren<IWidgetProps>) => {
	const { Icon, title, to = '', className, children } = props;

	return (
		<div className={classNames(s.Widget, className)}>
			{(Icon || title) && (
				<Link to={to}>
					<div className={s.header}>
						{Icon && <div className={s.icon}>{Icon}</div>}
						{title && <div className={s.title}>{title}</div>}
					</div>
				</Link>
			)}

			{children}
		</div>
	);
};
