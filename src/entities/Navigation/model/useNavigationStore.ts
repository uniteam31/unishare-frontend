import { create } from 'zustand';

export type TServices = 'main' | 'notes';

interface INavigationStore {
	currentService: TServices;
	setCurrentService: (service: TServices) => void;
}

export const useNavigationStore = create<INavigationStore>((set) => ({
	currentService: 'main',
	setCurrentService: (service) => {
		set((state) => {
			return {
				...state,
				currentService: service,
			};
		});
	},
}));
