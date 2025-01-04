import { useCallback, useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import type { INote, TNoteFormFields } from '../model/types/note';

export const useCreateNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const createNote = useCallback(async () => {
		const body: TNoteFormFields = {
			title: '',
			text: '',
		};

		setIsLoading(true);
		setError(null);

		try {
			const result = await axiosInstance.post<INote>('/notes', body);
			return result.data;
		} catch (error) {
			const errorMessage = getApiResponseErrorMessage(error) || 'Не удалось создать заметку';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		createNote,
		isLoading,
		error,
	};
};
