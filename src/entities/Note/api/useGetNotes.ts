import axios from 'axios';
import useSWR from 'swr';
import { INote } from '../model/types/note';

export const useGetNotes = () => {
	const fetcher = () =>
		axios<INote[]>({ method: 'GET', url: `${__API_URL__}/notes` }).then((res) => res.data);

	const { data, error, isValidating, mutate } = useSWR('api/notes', fetcher);

	const notes = data || [];

	return {
		mutateNodes: mutate,
		notes,
		error,
		isLoading: isValidating,
	};
};
