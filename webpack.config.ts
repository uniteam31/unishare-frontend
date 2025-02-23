import * as process from 'node:process';
import path from 'path';
import webpack from 'webpack';
import { BuildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildMode, BuildPaths } from './config/build/types/config';
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
	// TODO calendar here
	const ACCOUNT_SETTINGS = process.env.ACCOUNT_SETTINGS || 'http://localhost:3004/remoteEntry.js';

	const config: webpack.Configuration = BuildWebpackConfig({
		mode: MODE,
		paths,
		port: PORT,
		isDev: IS_DEV,
		apiUrl: API_URL,
		//
		notesUrl: NOTES_URL,
		friendsUrl: FRIENDS_URL,
		accountSettings: ACCOUNT_SETTINGS,
	});

	return config;
};
