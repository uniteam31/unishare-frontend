import axios from 'axios';
import { INote, TNoteFormFields } from '../model/types/note';

interface IPutNoteProps {
	id: INote['id'];
	body: TNoteFormFields;
}

export const putNote = async (props: IPutNoteProps) => {
	const { id, body } = props;

	const result = await axios.put(`http://localhost:8080/notes/${id}`, body);

	return result.data;
};
