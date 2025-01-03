import axios from 'axios';
import { ApiResponse } from '../../api/types';

/** Достает сообщение из ответа от api */
export const getApiResponseErrorMessage = (error: unknown) => {
	if (!axios.isAxiosError(error)) {
		return null;
	}

	const response = error.response?.data as ApiResponse<null>;
	return response.message;
};
