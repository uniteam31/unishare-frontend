import { MutableRefObject, useCallback, useRef } from 'react';

// eslint-disable-next-line
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
	// eslint-disable-next-line
	const timer = useRef() as MutableRefObject<any>;

	return useCallback(
		// eslint-disable-next-line
		(...args: any[]) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}

			timer.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);
}
