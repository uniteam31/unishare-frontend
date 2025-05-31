import type { WebpackConfiguration } from 'webpack-cli';
import type { BuildEnv } from './types/config';

export const BuildDevServer = ({ PORT }: BuildEnv): WebpackConfiguration['devServer'] => {
	return {
		port: PORT,
		historyApiFallback: true, // чтобы не падало при перезагрузке на маршруте
		hot: true,
	};
};
