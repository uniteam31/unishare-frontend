import React from 'react';
import { useForm } from 'react-hook-form';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import type { TLoginFormField } from '../../model/login';
import { Form } from '../Form/Form';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = (props: IModalProps) => {
	const { isOpen, onClose } = props;

	const methods = useForm<TLoginFormField>();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper<TLoginFormField> methods={methods}>
				<Form />
			</FormWrapper>
		</ModalUI>
	);
};
