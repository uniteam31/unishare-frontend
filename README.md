# unishare

Dev стенд -> [ссылка](http://176.114.90.241/) (работает в режиме воруй-убивай)

## DEVELOPER GUIDE
### Сборка Dockerfile

**ENV**: API_URL, BRANCH  
**COMMANDS**:
1. Сборка образа -> `docker build --no-cache -t def1s/unishare-frontend --build-arg API_URL=... --build-arg BRANCH=... .` (точку не забывать)
2. Push -> `docker push def1s/unishare-frontend` (optional)
3. Run -> `docker run def1s/unishare-frontend`
4. Можно взять образ из DockerHub -> `docker pull def1s/unishare-frontend`

### ЗАЧЕМ И КАК
Для чистого и оптимального кода должен существовать единый набор правил и рекомендаций по разработке. В этом разделе кратко описаны
основные требования и практики, использующиеся при разработке модулей.

#### РЕКОМЕНДАЦИИ
1. Комментарии это **ОЧЕНЬ** хорошо, но еще лучше дробить функции на маленькие части и писать самодокументирующийся код
на основе названий функций. Большие функции - ЭТО ПЛОХО, а большие функции без комментариев - ЭТО ОЧЕНЬ ПЛОХО, потому что
понятно только тому, кто это написал и только в момент написания.
2. Писать сразу хорошо и **НИКОГДА** не откладывать что-то на рефакторинг. Хочется что-то отложить на потом, но нужно
помнить, что ПОТОМ - это скорее всего никогда, а кодовая база постоянно расширяется и задачи прибавляются.

#### ПРАКТИКИ
1. При написании интерфейсов мы используем префикс I, а для типов T. Интерфейсы чаще всего дублируют названия своей сущности.  
`interface IExample`  
`type TExample`
2. Интерфейсы используются для описания пропсов компонента, каждый интерфейс собирается из более мелких типов.
Типы используются для задания дополнительных свойств. Если интерфейс большой -> дробим на логические типы и собираем в один.

**entities/Note/model/types/note.ts**
```
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
```
Чаще всего дробим интерфейс на форму, данные, не входящие в форму и мета данные.
3. Если компонент (entity, widget, ...) содержит сущности, которые логически связаны с
родителем, то наружу мы выпускаем компонент-обертку, который эти сущности собирает в
единое целое
```
import { Item } from './ui/Item/Item';
import { List } from './ui/List/List';
import { ListItem } from './ui/ListItem/ListItem';

export type { INote, TNodeData, TNoteFormFields } from './model/types/note';

type TNoteComponents = {
	List: typeof List;
	ListItem: typeof ListItem;
	Item: typeof Item;
};

/** Экспортируем обертку для компонентов, которые связаны логически */
export const Note: TNoteComponents = {
	List,
	Item,
	ListItem,
};

export { useNoteStore } from './model/slice/useNoteStore';

export { useGetNotes } from './api/useGetNotes';
export { useCreateNote } from './api/useCreateNote';
export { useUpdateNote } from './api/useUpdateNote';
export { useDeleteNote } from './api/useDeleteNote';
```
Улучшается читаемость и нет пересечений между компонентами по типу Item, Title и т.п.