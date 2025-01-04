import { useCallback, useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import type { INote } from '../model/types/note';

interface IDeleteNoteProps {
	id: INote['_id'];
}

export const useDeleteNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const deleteNote = useCallback(async ({ id }: IDeleteNoteProps) => {
		setIsLoading(true);
		setError(null);

		try {
			const result = await axiosInstance.delete(`/notes/${id}`);

			return result.data;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла ошибка при удалении заметки';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		deleteNote,
		isLoading,
		error,
	};
};
