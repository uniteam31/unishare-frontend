import { Modal } from './ui/Modal/Modal';

/** Общие компоненты */
type TAddFriendsComponents = {
	Modal: typeof Modal;
};

/** Экспортируем общую обертку */
export const AddFriends: TAddFriendsComponents = {
	Modal,
};
