export interface ApiResponse<T> {
	data: T;
	message: string;
}

export type Token = {
	token: string;
};
