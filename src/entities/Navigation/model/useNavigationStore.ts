import { create } from 'zustand';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Path } from 'app/providers/AppRouter';

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
