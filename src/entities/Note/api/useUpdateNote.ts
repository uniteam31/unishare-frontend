import { useCallback, useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import type { INote, TNoteFormFields } from '../model/types/note';

interface IUpdateNoteProps {
	id: INote['_id'];
	body: TNoteFormFields;
}

export const useUpdateNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const updateNote = useCallback(async ({ id, body }: IUpdateNoteProps) => {
		setIsLoading(true);
		setError(null);

		try {
			const result = await axiosInstance.put<INote>(`${__API_URL__}/notes/${id}`, body);

			return result.data;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла ошибка при обновлении заметки';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		updateNote,
		isLoading,
		error,
	};
};
