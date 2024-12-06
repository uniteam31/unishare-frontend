import { TServices } from 'entities/Navigation';

type ModuleItem = {
	name: string;
};

export const MODULES: Record<TServices, ModuleItem> = {
	main: {
		name: '',
	},
	notes: {
		name: 'Заметки',
	},
};
