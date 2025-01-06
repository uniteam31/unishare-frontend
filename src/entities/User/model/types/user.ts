import type { TMeta } from 'shared/types/meta';

export interface IUser {
	_id: TMeta['_id'];
	firstName: string;
	username: string;
	avatar?: string;
}
