import { create } from 'zustand';
import { axiosInstance } from 'shared/api';
import { SpaceIDController } from 'shared/lib';
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

			const savedSpaceID = SpaceIDController.getSavedSpaceID();

			if (savedSpaceID) {
				SpaceIDController.setCurrentSpaceIDAndSendEvent(savedSpaceID);
			}

			set({ authData });
		} catch (e) {
			// TODO добавить уведомление
			console.error('Произошла ошибка: ' + e);
		}

		set({ _init: true });
	},

	logout: () => {
		SpaceIDController.clearCurrentSpaceID();

		set({ authData: undefined });
	},
}));
