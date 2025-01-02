import { TMeta } from 'shared/types/meta';

/** Поля у формы заметки */
export type TNoteFormFields = {
	title?: string;
	text?: string;
};

/** Данные заметки */
export type TNodeData = TNoteFormFields & {
	author: string;
};

/** Целый экземпляр */
export interface INote extends TNodeData, TMeta {}
