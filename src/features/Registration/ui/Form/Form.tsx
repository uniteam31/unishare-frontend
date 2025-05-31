import React, { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useUserStore } from 'entities/User';
import { formatApiErrorMessages } from 'shared/lib';
import { Button, Input, Text, TextAlign, Warning } from 'shared/ui';
import { useRegistration } from '../../api/useRegistration';
import { TRegistrationFormField } from '../../model/registration';
import s from './Form.module.scss';

export const Form = () => {
	const {
		control,
		getValues,
		formState: { errors: validationErrors },
		handleSubmit,
	} = useFormContext<TRegistrationFormField>();

	const { initAuthData } = useUserStore();
	const { registration, isLoading, error: registrationErrors } = useRegistration();

	const {
		field: { value: email, onChange: onChangeEmail },
	} = useController({ control, name: 'email', rules: { required: true } });

	const {
		field: { value: password, onChange: onChangePassword },
	} = useController({ control, name: 'password', rules: { required: true } });

	const {
		field: { value: firstName, onChange: onChangeFirstName },
	} = useController({ control, name: 'firstName', rules: { required: true } });

	const {
		field: { value: username, onChange: onChangeUsername },
	} = useController({ control, name: 'username', rules: { required: true } });

	const onSubmit = useCallback(() => {
		registration({ formValues: getValues() }).then(() => {
			initAuthData();
		});
	}, [getValues, initAuthData, registration]);

	// TODO стили для форм повторяются, можно вынести в basedFormStyle.scss в shared
	return (
		<form className={s.Form} onSubmit={handleSubmit(onSubmit)}>
			<Text title={'Регистрация'} className={s.title} align={TextAlign.CENTER} />

			{!isLoading && registrationErrors && (
				<Warning
					className={s.error}
					title={'Ошибка'}
					text={formatApiErrorMessages(registrationErrors)}
					theme={'red'}
				/>
			)}

			<div className={s.inputWrapper}>
				<Input
					label={'Почта'}
					value={email}
					onChange={onChangeEmail}
					className={s.input}
					type={'email'}
					error={!!validationErrors.email?.message}
				/>

				<div className={s.validateError}>{validationErrors.email?.message}</div>
			</div>

			<div className={s.inputWrapper}>
				<Input
					label={'Пароль'}
					value={password}
					onChange={onChangePassword}
					type={'password'}
					className={s.input}
					error={!!validationErrors.password?.message}
				/>

				<div className={s.validateError}>{validationErrors.password?.message}</div>
			</div>

			<div className={s.inputWrapper}>
				<Input
					label={'Ваше имя'}
					value={firstName}
					onChange={onChangeFirstName}
					className={s.input}
					error={!!validationErrors.firstName?.message}
				/>

				<div className={s.validateError}>{validationErrors.firstName?.message}</div>
			</div>

			<div className={s.inputWrapper}>
				<Input
					label={'Username'}
					value={username}
					onChange={onChangeUsername}
					className={s.input}
					error={!!validationErrors.username?.message}
				/>

				<div className={s.validateError}>{validationErrors.username?.message}</div>
			</div>

			<Button className={s.button} disabled={isLoading}>
				Регистрация
			</Button>
		</form>
	);
};
