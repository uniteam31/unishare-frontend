import axios from 'axios';
import { INote, TNoteFormFields } from '../model/types/note';

export const postNote = async () => {
	const body: TNoteFormFields = {
		title: '',
		text: '',
	};

	try {
		const result = await axios.post<INote>('http://localhost:8080/notes', body);
		return result.data;
	} catch (e) {
		console.error(e);
		throw new Error('При создании заметки произошла ошибка');
	}
};
