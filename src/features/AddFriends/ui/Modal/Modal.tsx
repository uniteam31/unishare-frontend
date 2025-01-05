import React, { memo } from 'react';
import { ModalUI } from 'shared/ui';
import { SearchList } from '../SearchList/SearchList';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = memo((props: IModalProps) => {
	const { isOpen, onClose } = props;

	return (
		<ModalUI onClose={onClose} isOpen={isOpen}>
			<SearchList />
		</ModalUI>
	);
});
