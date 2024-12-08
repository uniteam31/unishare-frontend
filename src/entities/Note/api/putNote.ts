import axiosInstance from 'shared/api/axiosInstance';
import { INote, TNoteFormFields } from '../model/types/note';

interface IPutNoteProps {
	id: INote['_id'];
	body: TNoteFormFields;
}

export const putNote = async (props: IPutNoteProps) => {
	const { id, body } = props;

	try {
		await axiosInstance.put(`${__API_URL__}/notes/${id}`, body);
		// return result.data;
	} catch (e) {
		console.error(e);
		throw new Error('При обновлении заметки произошла ошибка');
	}
};
