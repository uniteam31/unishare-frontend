import { Item } from './ui/Item/Item';
import { List } from './ui/List/List';
import { ListItem } from './ui/ListItem/ListItem';

export type { INote, TNodeData, TNoteFormFields } from './model/note';

type NoteComponents = {
	List: typeof List;
	ListItem: typeof ListItem;
	Item: typeof Item;
};

/** Экспортируем обертку для компонентов, которые связаны логически */
export const Note: NoteComponents = {
	List,
	Item,
	ListItem,
};

export { useGetNotes } from './api/useGetNotes';
export { putNote } from './api/putNote';
