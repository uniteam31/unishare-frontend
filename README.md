# unishare

### ССЫЛКИ

[DEV стенд](http://176.114.90.241/) (работает в режиме воруй-убивай)  
[JENKINS CI/CD](https://176.114.90.241:8080/) (private)  
[UNITEAM NOTION](https://www.notion.so/UNITEAM-1049780386b880adbbe1e3480e5159ce?pvs=4) (private)  
[UNISHARE NOTION](https://www.notion.so/UNISHARE-1709780386b880388d2dfbbc751678c3?pvs=4) (private)  
[YOUGILE](https://ru.yougile.com/board/kyihl3hhjnbh)  

## DEVELOPER GUIDE
### Сборка Dockerfile (для локального теста docker-compose)

**ENV**: API_URL, BRANCH  
**COMMANDS**:
1. Сборка образа -> `docker build --no-cache -t def1s/unishare-frontend --build-arg API_URL=... --build-arg BRANCH=... --build-arg NOTES_URL=... --build-arg FRIENDS_URL=... --build-arg ACCOUNT_SETTINGS_URL=... .` (точку не забывать)
2. Push -> `docker push def1s/unishare-frontend` (но смысла особо нет, в пайплайне все равно перепушит)
3. Run -> `docker run def1s/unishare-frontend`
4. Можно взять образ из DockerHub -> `docker pull def1s/unishare-frontend`

### ЗАЧЕМ И КАК
Для чистого и оптимального кода должен существовать единый набор правил и рекомендаций по разработке. В этом разделе кратко описаны
основные требования и практики, использующиеся при разработке модулей.

#### ПРОЦЕСС РАЗРАБОТКИ

1. Создается таска на [YOUGILE](https://ru.yougile.com/board/kyihl3hhjnbh)
   1. Если задача содержит часть подзадач, то создаются подтаски.
2. Создается ветка с номером текущей таски. Каждый коммит комментируется с указанием таски: 'UNI-XX: some changes'
   1. Ветка ВСЕГДА имеет номер таски, даже если выполняется подтаска этой задачи. В коммите можно
указать 'UNI-[главный номер]-[подзадача]', но не принципиально.
3. Задача всегда вливается через ПР в dev ветку. Если упал пайплайн, то [смотрим](https://176.114.90.241:8080/)   что не так -> фиксим -> повторяем пока не соберется
4. После вливания в dev при условии успешной сборки изменения автоматически накатываются на [DEV стенд](http://176.114.90.241/)  
5. Кайфуем

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
родителем, то наружу мы выпускаем компонент-обертку, собирающая эти сущности в
единое целое

**entities/Note/index.ts**
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

4. Все формы оборачиваем в FormWrapper и прокидываем в него тип для значений (см. пункт 2)
```
...

const methods = useForm<TLoginFormField>();

return (
    <ModalUI isOpen={isOpen} onClose={onClose}>
        <FormWrapper<TLoginFormField> methods={methods}>
            <Form />
        </FormWrapper>
    </ModalUI>
);
```
Получается строгая типизация формы.

5. Все состояния (загрузка, ошибки) управляются компонентом с наибольшей ответственностью за ui сущности.
На примере entites/Note.List заметим, что он имеет в пропсах isLoading и error, но вот виджет заметки, рисующий часть заметок,
контролирует сам себя, потому что entites/Note.ListItem не имеет под собой большой ответственности за ui самого виджета.

6. На данный момент (пока что!) все методы по работе с бэкендом выносятся в api сущности в виде хуков. Все get запросы
контролируются с помощью SWR, который предоставляет стейт с состояниями, в остальных методах вручную пишем
стейты с загрузкой и ошибкой.
