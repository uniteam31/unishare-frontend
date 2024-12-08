import axiosInstance from 'shared/api/axiosInstance';
import { Token } from 'shared/api/types';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { TLoginFormField } from '../model/login';

type TPostLoginProps = {
	formValues: TLoginFormField;
};

export const postLogin = async (props: TPostLoginProps) => {
	const { formValues } = props;

	try {
		const response = await axiosInstance.post<Token>('/auth/login', formValues);

		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.data.token);
	} catch (e) {
		// TODO добавить вывод ошибки
		console.error(e);
	}
};
