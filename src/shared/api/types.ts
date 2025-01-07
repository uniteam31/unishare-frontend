export interface ApiResponse<T> {
	data: T;
	message: string;
}

export interface ApiResponseWithPagination<T> extends ApiResponse<T> {
	currentPage: number;
	totalPages: number;
}

export type TAccessToken = string;
