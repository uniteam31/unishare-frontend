import axios from 'axios';
import { INote, TNoteFormFields } from '../model/note';

interface IPostNoteProps {
	id: INote['id'];
	body: TNoteFormFields;
}

export const putNote = async (props: IPostNoteProps) => {
	const { id, body } = props;

	const result = await axios.put(`http://localhost:8080/notes/${id}`, body);

	return result.data;
};
