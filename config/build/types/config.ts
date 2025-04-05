export type BuildMode = 'development' | 'production';

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
	nodeModules: string;
}

export interface BuildEnv {
	PORT: number;
	MODE: BuildMode;
}

export interface BuildMicroservices {
	NOTES_URL: string;
	FRIENDS_URL: string;
	CALENDAR_URL: string;
	ACCOUNT_SETTINGS_URL: string;
	SPACES_URL: string;
	DISK_URL: string;
}

export interface BuildOptions {
	paths: BuildPaths;
	env: BuildEnv;
	microservices: BuildMicroservices;
	isDev: boolean;
	API_URL: string;
}
