import path from 'path';
import type { WebpackConfiguration } from 'webpack-cli';
import type { BuildPaths } from './types/config';

export const BuildResolvers = (paths: BuildPaths): WebpackConfiguration['resolve'] => {
	const { src, nodeModules } = paths;

	return {
		extensions: ['.tsx', '.ts', '.js'],
		// настройки для работы абсолютных путей
		preferAbsolute: true,
		modules: [src, 'node_modules'],
		mainFiles: ['index'],
		alias: {
			/** Эти алиасы нужны для корректной работы yarn link при локальной разработке пакетов */
			react: path.join(nodeModules, 'react'),
			'react-dom': path.join(nodeModules, 'react-dom'),
		},
	};
};
