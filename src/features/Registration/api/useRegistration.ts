import { useCallback, useState } from 'react';
import axiosInstance from 'shared/api/axiosInstance';
import { ApiResponse, TAccessToken } from 'shared/api/types';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import { TRegistrationFormField } from '../model/registration';

interface IRegistrationProps {
	formValues?: TRegistrationFormField;
}

export const useRegistration = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const registration = useCallback(async (props: IRegistrationProps) => {
		const { formValues } = props;

		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.post<ApiResponse<TAccessToken>>(
				'/auth/registration',
				formValues,
			);

			const accessToken = response.data.data;
			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла неизвестная ошибка при регистрации';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		registration,
	};
};
