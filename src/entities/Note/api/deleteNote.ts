import axiosInstance from 'shared/api/axiosInstance';
import { INote } from '../model/types/note';

interface IDeleteNoteProps {
	id: INote['_id'];
}

export const deleteNote = async (props: IDeleteNoteProps) => {
	const { id } = props;

	try {
		await axiosInstance.delete(`${__API_URL__}/notes/${id}`);
	} catch (e) {
		console.error(e);
		throw new Error('При удалении заметки произошла ошибка');
	}
};
