import useSWR from 'swr';
import axiosInstance from 'shared/api/axiosInstance';
import { ApiResponse } from 'shared/api/types';
import { INote } from '../model/types/note';

type TGetNotesResponse = ApiResponse<INote[]>;

export const useGetNotes = () => {
	const fetcher = () =>
		axiosInstance<TGetNotesResponse>({ method: 'GET', url: '/notes' }).then(
			(res) => res.data.data,
		);

	const { data, error, isValidating, mutate } = useSWR('api/notes', fetcher);

	const notes = data || [];

	return {
		mutateNotes: mutate,
		notes,
		error,
		isLoading: isValidating,
	};
};
