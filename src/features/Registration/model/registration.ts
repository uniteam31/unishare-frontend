import * as yup from 'yup';

export type TRegistrationFormField = {
	email: string;
	password: string;
	firstName: string;
	username: string;
};

export const registrationSchema = yup.object().shape({
	email: yup.string().email('Введите корректный email').required('Поле обязательно'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.required('Поле обязательно'),
	username: yup.string().required('Поле обязательно'),
	firstName: yup.string().required('Поле обязательно'),
});
