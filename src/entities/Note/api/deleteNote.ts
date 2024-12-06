import axios from 'axios';
import { INote } from '../model/types/note';

interface IDeleteNoteProps {
	id: INote['id'];
}

export const deleteNote = async (props: IDeleteNoteProps) => {
	const { id } = props;

	const result = await axios.delete(`http://localhost:8080/notes/${id}`);

	return result.data;
};
