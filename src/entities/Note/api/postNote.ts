import axiosInstance from 'shared/api/axiosInstance';
import { INote, TNoteFormFields } from '../model/types/note';

export const postNote = async () => {
	const body: TNoteFormFields = {
		title: '',
		text: '',
	};

	try {
		const result = await axiosInstance.post<INote>(`${__API_URL__}/notes`, body);
		return result.data;
	} catch (e) {
		console.error(e);
		throw new Error('При создании заметки произошла ошибка');
	}
};
