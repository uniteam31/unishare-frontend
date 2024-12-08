import { Modal } from './ui/Modal/Modal';

/** Общие компоненты */
type TRegistrationComponents = {
	Modal: typeof Modal;
};

/** Экспортируем общую обертку */
export const Registration: TRegistrationComponents = {
	Modal,
};
