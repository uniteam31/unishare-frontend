import React, { FormEvent, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useUserStore } from 'entities/User';
import { Button, Input, Text, Warning } from 'shared/ui';
import { useLogin } from '../../api/useLogin';
import { TLoginFormField } from '../../model/login';
import s from './Form.module.scss';

export const Form = () => {
	const { control, getValues } = useFormContext<TLoginFormField>();
	const { initAuthData } = useUserStore();
	const { isLoading, error, login } = useLogin();

	const {
		field: { value: email, onChange: onChangeEmail },
	} = useController({ control, name: 'email', rules: { required: true } });

	const {
		field: { value: password, onChange: onChangePassword },
	} = useController({ control, name: 'password', rules: { required: true } });

	const handleLoginFormSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			login({ formValues: getValues() }).then(() => {
				initAuthData();
			});
		},
		[getValues, initAuthData, login],
	);

	// TODO стили для форм повторяются, можно вынести в basedFormStyle.scss в shared
	return (
		<form onSubmit={handleLoginFormSubmit} className={s.Form}>
			<Text title={'Вход'} className={s.title} />

			{!isLoading && error && (
				<Warning className={s.error} title={'Ошибка'} text={error} theme={'red'} />
			)}

			<Input label={'Почта'} value={email} onChange={onChangeEmail} className={s.input} />

			<Input
				label={'Пароль'}
				type={'password'}
				value={password}
				onChange={onChangePassword}
				className={s.input}
			/>

			<Button className={s.button} disabled={isLoading}>
				Войти
			</Button>
		</form>
	);
};
