/** Поля у формы заметки */
export type TNoteFormFields = {
    date?: string;
    title?: string;
    text?: string;
};

/** Данные заметки */
export type TNodeData = TNoteFormFields & {
    author: string;
};

/** Целый экземпляр */
export interface INote extends TNodeData {
    id: number;
}
