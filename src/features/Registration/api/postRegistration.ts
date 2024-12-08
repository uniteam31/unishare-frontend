import axiosInstance from 'shared/api/axiosInstance';
import { Token } from 'shared/api/types';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { TRegistrationFormField } from '../model/registration';

type TRegistrationProps = {
	formValues?: TRegistrationFormField;
};

export const postRegistration = async (props: TRegistrationProps) => {
	const { formValues } = props;

	try {
		const response = await axiosInstance.post<Token>('/auth/registration', formValues);

		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.data.token);
	} catch (e) {
		// TODO добавить вывод ошибки
		console.error(e);
	}
};
