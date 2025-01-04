import { MutableRefObject, useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const timer = useRef() as MutableRefObject<any>;

	return useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
