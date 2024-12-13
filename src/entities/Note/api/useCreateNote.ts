import { useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import type { INote, TNoteFormFields } from '../model/types/note';

export const useCreateNote = () => {
	const body: TNoteFormFields = {
		title: '',
		text: '',
	};

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const createNote = async () => {
		setError(null);

		try {
			setIsLoading(true);

			const result = await axiosInstance.post<INote>(`${__API_URL__}/notes`, body);

			return result.data;
		} catch (e) {
			setError('Произошла ошибка при создании заметки');
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		createNote,
		isLoading,
		error,
	};
};
