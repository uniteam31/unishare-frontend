import { create } from 'zustand';
import axiosInstance from 'shared/api/axiosInstance';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { IUser } from '../types/user';

interface IUserStore {
	/** Поля */
	authData?: IUser;
	_init?: boolean;
	/** Методы */
	setAuthData: (authData: IUser) => void;
	initAuthData: () => void;
	logout: () => void;
}

export const useUserStore = create<IUserStore>((set, get) => ({
	setAuthData: (authData) => {
		set({ authData });
	},

	initAuthData: async () => {
		try {
			const response = await axiosInstance.get<IUser>('/auth');

			if (!response.data) {
				throw new Error('Что-то пошло не так...');
			}

			set({ authData: response.data });
		} catch (e) {
			// TODO добавить уведомление
			console.error('Произошла ошибка: ' + e);
		}

		set({ _init: true });
	},

	logout: () => {
		localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
		set({ authData: undefined });
	},
}));
