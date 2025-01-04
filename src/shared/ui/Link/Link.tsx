import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Link as LinkReactRouter, LinkProps as LinkReactRouterProps } from 'react-router-dom';
import s from './Link.module.scss';

interface ILinkProps extends LinkReactRouterProps {
	className?: string;
}

/** Ссылка со сброшенными стилями */
export const Link = (props: PropsWithChildren<ILinkProps>) => {
	const { children, className, ...otherProps } = props;

	return (
		<LinkReactRouter className={classNames(s.Link, className)} {...otherProps}>
			{children}
		</LinkReactRouter>
	);
};
