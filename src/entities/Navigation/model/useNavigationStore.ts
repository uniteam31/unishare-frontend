import { create } from 'zustand';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Path } from 'app/providers/AppRouter';

/** Отвечает за навигацию между сервисами. Эндпоинты вызывают функцию setCurrentService, Navbar отрисовывает
 * 	текущий путь исходя из заданного модуля.
 * */
interface INavigationStore {
	currentServiceEndPath: Path;
	setCurrentService: (service: Path) => void;
}

export const useNavigationStore = create<INavigationStore>((set) => ({
	currentServiceEndPath: '/',
	setCurrentService: (service) => {
		set({ currentServiceEndPath: service });
	},
}));
