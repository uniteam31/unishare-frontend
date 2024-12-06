import axios from 'axios';
import { INote } from '../model/types/note';

interface IDeleteNoteProps {
	id: INote['id'];
}

export const deleteNote = async (props: IDeleteNoteProps) => {
	const { id } = props;

	try {
		await axios.delete(`http://localhost:8080/notes/${id}`);
	} catch (e) {
		console.error(e);
		throw new Error('При удалении заметки произошла ошибка');
	}
};
