import classNames from 'classnames';
import React, { memo } from 'react';
import s from './CircleCounter.module.scss';

type TColor = 'red' | 'green' | 'orange';

interface ICircleCounterProps {
	count: number;
	color?: TColor;
}

export const CircleCounter = memo((props: ICircleCounterProps) => {
	const { count, color = 'red' } = props;

	if (!count) {
		return null;
	}

	return <div className={classNames(s.CircleCounter, s[color])}>{count}</div>;
});
