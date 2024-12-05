import { PropsWithChildren, ReactNode } from 'react';
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';

interface IFormWrapperProps<T extends FieldValues> {
	methods: UseFormReturn<T>;

	// onSubmit: (formData: T) => void;

	children?: ReactNode;
}

export const FormWrapper = <T extends FieldValues>(
	props: PropsWithChildren<IFormWrapperProps<T>>,
) => {
	const { methods, children } = props;

	return <FormProvider {...methods}>{children}</FormProvider>;
};
