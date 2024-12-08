import { Form } from './ui/Form/Form';
import { Modal } from './ui/Modal/Modal';

/** Общие компоненты */
type TRegistrationComponents = {
	Form: typeof Form;
	Modal: typeof Modal;
};

/** Экспортируем общую обертку */
export const Registration: TRegistrationComponents = {
	Form,
	Modal,
};
