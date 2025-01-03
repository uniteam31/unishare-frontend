import { useCallback, useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import { ApiResponse, TAccessToken } from 'shared/api/types';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import { TLoginFormField } from '../model/login';

interface ILoginProps {
	formValues: TLoginFormField;
}

export const useLogin = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const login = useCallback(async (props: ILoginProps) => {
		const { formValues } = props;

		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.post<ApiResponse<TAccessToken>>(
				'/auth/login',
				formValues,
			);

			const accessToken = response.data.data;
			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла неизвестная ошибка';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		login,
	};
};
