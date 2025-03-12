import Cookie from 'js-cookie';
import { create } from 'zustand';
import { axiosInstance } from 'shared/api';
import {
	ACCESS_TOKEN_LOCALSTORAGE_KEY,
	CURRENT_SPACE_ID_COOKIE_KEY,
	CURRENT_SPACE_ID_LOCALSTORAGE_KEY,
} from 'shared/const';
import type { ApiResponse } from 'shared/types';
import type { IUser } from '../types/user';

interface IUserStore {
	/** Поля */
	authData?: IUser;
	_init?: boolean;

	/** Методы */
	setAuthData: (authData: IUser) => void;
	initAuthData: () => void;
	logout: () => void;
}

type TUserInitialData = ApiResponse<IUser>;

export const useUserStore = create<IUserStore>((set, get) => ({
	setAuthData: (authData) => {
		set({ authData });
	},

	initAuthData: async () => {
		try {
			const response = await axiosInstance.get<TUserInitialData>('/auth');
			const authData = response.data.data;

			if (!authData) {
				throw new Error('Что-то пошло не так...');
			}

			const savedSpaceID = localStorage.getItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY);

			if (savedSpaceID) {
				Cookie.set(CURRENT_SPACE_ID_COOKIE_KEY, savedSpaceID);
			} else {
				Cookie.set(CURRENT_SPACE_ID_COOKIE_KEY, authData.personalSpaceID);
			}

			set({ authData });
		} catch (e) {
			// TODO добавить уведомление
			console.error('Произошла ошибка: ' + e);
		}

		set({ _init: true });
	},

	logout: () => {
		localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
		localStorage.removeItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY);
		Cookie.remove(CURRENT_SPACE_ID_COOKIE_KEY);

		set({ authData: undefined });
	},
}));
