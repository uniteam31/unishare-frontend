import { Modal } from './ui/Modal/Modal';

/** Общие компоненты */
type TLoginComponents = {
	Modal: typeof Modal;
};

/** Экспортируем общую обертку */
export const Login: TLoginComponents = {
	Modal,
};
