import { useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import type { INote } from '../model/types/note';

interface IDeleteNoteProps {
	id: INote['_id'];
}

export const useDeleteNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const deleteNote = async ({ id }: IDeleteNoteProps) => {
		try {
			setIsLoading(true);

			const result = await axiosInstance.delete(`${__API_URL__}/notes/${id}`);

			return result.data;
		} catch (e) {
			setError('Произошла ошибка при удалении заметки');
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		deleteNote,
		isLoading,
		error,
	};
};
