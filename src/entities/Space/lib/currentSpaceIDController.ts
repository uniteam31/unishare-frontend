import Cookies from 'js-cookie';
import { CURRENT_SPACE_ID_COOKIE_KEY, CURRENT_SPACE_ID_LOCALSTORAGE_KEY } from 'shared/const';
import type { ISpace } from '../model/space';

// TODO: вынести в toolkit
/**
 * @description представляет класс для управления текущим состоянием space в localstorage и cookies
 * */
class CurrentSpaceIDController {
	setCurrentSpaceIDAndSendEvent(spaceID: ISpace['_id']) {
		Cookies.set(CURRENT_SPACE_ID_COOKIE_KEY, spaceID);
		localStorage.setItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY, spaceID);

		window.dispatchEvent(new Event('storage'));
	}

	getCurrentSpaceID() {
		return Cookies.get(CURRENT_SPACE_ID_COOKIE_KEY);
	}

	getSavedSpaceID() {
		return localStorage.getItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY);
	}
}

const SpaceIDController = new CurrentSpaceIDController();

export { SpaceIDController };
