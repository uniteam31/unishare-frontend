import React, { FormEvent, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useUserStore } from 'entities/User';
import { Button, Input, Text, TextAlign, Warning } from 'shared/ui';
import { useRegistration } from '../../api/useRegistration';
import { TRegistrationFormField } from '../../model/registration';
import s from './Form.module.scss';

export const Form = () => {
	const { control, getValues } = useFormContext<TRegistrationFormField>();
	const { initAuthData } = useUserStore();
	const { registration, isLoading, error } = useRegistration();

	const {
		field: { value: email, onChange: onChangeEmail },
	} = useController({ control, name: 'email', rules: { required: true } });

	const {
		field: { value: password, onChange: onChangePassword },
	} = useController({ control, name: 'password', rules: { required: true } });

	const {
		field: { value: firstName, onChange: onChangeFirstName },
	} = useController({ control, name: 'firstName' });

	const {
		field: { value: username, onChange: onChangeUsername },
	} = useController({ control, name: 'username' });

	const onSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			registration({ formValues: getValues() }).then(() => {
				initAuthData();
			});
		},
		[getValues, initAuthData, registration],
	);

	// TODO стили для форм повторяются, можно вынести в basedFormStyle.scss в shared
	return (
		<form className={s.Form} onSubmit={onSubmit}>
			<Text title={'Регистрация'} className={s.title} align={TextAlign.CENTER} />

			{!isLoading && error && (
				<Warning className={s.error} title={'Ошибка'} text={error} theme={'red'} />
			)}

			<Input label={'Почта'} value={email} onChange={onChangeEmail} className={s.input} />

			<Input
				label={'Пароль'}
				value={password}
				onChange={onChangePassword}
				type={'password'}
				className={s.input}
			/>

			<Input
				label={'Ваше имя'}
				value={firstName}
				onChange={onChangeFirstName}
				className={s.input}
			/>

			<Input
				label={'Username'}
				value={username}
				onChange={onChangeUsername}
				className={s.input}
			/>

			<Button className={s.button} disabled={isLoading}>
				Регистрация
			</Button>
		</form>
	);
};
