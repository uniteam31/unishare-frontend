import { Text, TextAlign } from '@uniteam31/uni-shared-ui';
import React, { FormEvent, useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useUserStore } from 'entities/User';
import { Button, Input } from 'shared/ui';
import { postRegistration } from '../../api/postRegistration';
import { TRegistrationFormField } from '../../model/registration';
import s from './Form.module.scss';

export const Form = () => {
	const { control, getValues } = useFormContext<TRegistrationFormField>();
	const { initAuthData } = useUserStore();

	const [isLoading, setIsLoading] = useState(false);

	const {
		field: { value: email, onChange: onChangeEmail },
	} = useController({ control, name: 'email', rules: { required: true } });

	const {
		field: { value: password, onChange: onChangePassword },
	} = useController({ control, name: 'password', rules: { required: true } });

	const {
		field: { value: name, onChange: onChangeName },
	} = useController({ control, name: 'name' });

	const {
		field: { value: nickname, onChange: onChangeNickname },
	} = useController({ control, name: 'nickname' });

	const onSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			setIsLoading(true);

			postRegistration({ formValues: getValues() })
				.then(() => {
					initAuthData();
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[getValues, initAuthData],
	);

	return (
		<form className={s.Form} onSubmit={onSubmit}>
			<Text title={'Регистрация'} className={s.title} align={TextAlign.CENTER} />

			<Input label={'Почта'} value={email} onChange={onChangeEmail} className={s.input} />

			<Input
				label={'Пароль'}
				value={password}
				onChange={onChangePassword}
				type={'password'}
				className={s.input}
			/>

			<Input label={'Ваше имя'} value={name} onChange={onChangeName} className={s.input} />

			<Input
				label={'Nickname'}
				value={nickname}
				onChange={onChangeNickname}
				className={s.input}
			/>

			<Button className={s.button}>Регистрация</Button>
		</form>
	);
};
