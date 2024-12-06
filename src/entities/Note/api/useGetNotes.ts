import axios from 'axios';
import useSWR from 'swr';
import { INote } from '../model/types/note';

export const useGetNotes = () => {
	// TODO поменять путь на API_URL
	const fetcher = () =>
		axios<INote[]>({ method: 'GET', url: 'http://localhost:8080/notes' }).then(
			(res) => res.data,
		);

	const { data, error, isValidating, mutate } = useSWR('api/notes', fetcher);

	const notes = data || [];

	return {
		mutateNodes: mutate,
		notes,
		error,
		isLoading: isValidating,
	};
};
