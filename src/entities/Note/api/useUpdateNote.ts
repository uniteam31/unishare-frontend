import { useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import type { INote, TNoteFormFields } from '../model/types/note';

interface IUpdateNoteProps {
	id: INote['_id'];
	body: TNoteFormFields;
}

export const useUpdateNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const updateNote = async ({ id, body }: IUpdateNoteProps) => {
		try {
			setIsLoading(true);

			const result = await axiosInstance.put<INote>(`${__API_URL__}/notes/${id}`, body);

			return result.data;
		} catch (e) {
			setError('Произошла ошибка при обновлении заметки');
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		updateNote,
		isLoading,
		error,
	};
};
