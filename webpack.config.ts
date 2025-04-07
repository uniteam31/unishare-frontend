import * as process from 'node:process';
import path from 'path';
import webpack from 'webpack';
import { BuildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildMicroservices, BuildMode, BuildPaths } from './config/build/types/config';
import 'dotenv-defaults/config';

export default () => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		nodeModules: path.resolve(__dirname, 'node_modules'),
	};

	// env
	const MODE: BuildMode = (process.env.MODE as BuildMode) || 'development';
	const PORT = Number(process.env.PORT) || 3000;
	const IS_DEV = MODE === 'development';
	const API_URL = process.env.API_URL || 'http://localhost:8000/api';

	const NOTES_URL = process.env.NOTES_URL || 'http://localhost:3001/remoteEntry.js';
	const FRIENDS_URL = process.env.FRIENDS_URL || 'http://localhost:3002/remoteEntry.js';
	const CALENDAR_URL = process.env.CALENDAR_URL || 'http://localhost:3003/remoteEntry.js';
	const ACCOUNT_SETTINGS_URL =
		process.env.ACCOUNT_SETTINGS_URL || 'http://localhost:3004/remoteEntry.js';
	const SPACES_URL = process.env.SPACES_URL || 'http://localhost:3005/remoteEntry.js';
	const DISK_URL = process.env.DISK_URL || 'http://localhost:3006/remoteEntry.js';

	const microservices: BuildMicroservices = {
		NOTES_URL,
		FRIENDS_URL,
		CALENDAR_URL,
		ACCOUNT_SETTINGS_URL,
		SPACES_URL,
		DISK_URL,
	};

	const env = {
		MODE,
		PORT,
	};

	const config: webpack.Configuration = BuildWebpackConfig({
		env,
		paths,
		API_URL,
		microservices,
		isDev: IS_DEV,
	});

	return config;
};
