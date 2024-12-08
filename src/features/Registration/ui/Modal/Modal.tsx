import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { FormWrapper } from 'shared/lib/FormWrapper/FormWrapper';
import { ModalUI } from 'shared/ui';
import { TRegistrationFormField } from '../../model/registration';
import { Form } from '../Form/Form';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = memo((props: IModalProps) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TRegistrationFormField>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper<TRegistrationFormField> methods={methods}>
				<Form />
			</FormWrapper>
		</ModalUI>
	);
});
