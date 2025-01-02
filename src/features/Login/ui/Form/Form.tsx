import { Text } from '@uniteam31/uni-shared-ui';
import React, { FormEvent, useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useUserStore } from 'entities/User';
import { Button, Input } from 'shared/ui';
import { postLogin } from '../../api/postLogin';
import { TLoginFormField } from '../../model/login';
import s from './Form.module.scss';

export const Form = () => {
	const { control, getValues } = useFormContext<TLoginFormField>();
	const { initAuthData } = useUserStore();

	// TODO добавить обработку лоадера и ошибок
	const [isLoading, setIsLoading] = useState(false);

	const {
		field: { value: email, onChange: onChangeEmail },
	} = useController({ control, name: 'email', rules: { required: true } });

	const {
		field: { value: password, onChange: onChangePassword },
	} = useController({ control, name: 'password', rules: { required: true } });

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			setIsLoading(true);

			postLogin({ formValues: getValues() })
				.then(() => {
					initAuthData();
				})
				.finally(() => setIsLoading(false));
		},
		[getValues, initAuthData],
	);

	// TODO стили для форм повторяются, можно вынести в basedFormStyle.scss в shared
	return (
		<form onSubmit={handleSubmit} className={s.Form}>
			<Text title={'Вход'} className={s.title} />

			<Input label={'Почта'} value={email} onChange={onChangeEmail} className={s.input} />

			<Input
				label={'Пароль'}
				type={'password'}
				value={password}
				onChange={onChangePassword}
				className={s.input}
			/>

			<Button className={s.button}>Войти</Button>
		</form>
	);
};
