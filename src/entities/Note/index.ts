import { Item } from './ui/Item/Item';
import { List } from './ui/List/List';

export type { INote, TNodeData, TNoteFormFields } from './model/note';

type NoteComponents = {
	List: typeof List;
	Item: typeof Item;
};

/** Экспортируем обертку для компонентов, которые связаны логически */
export const Note: NoteComponents = {
	List,
	Item,
};
