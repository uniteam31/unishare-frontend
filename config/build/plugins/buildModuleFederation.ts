import webpack from 'webpack';
import packageJson from '../../../package.json';
import { BuildOptions } from '../types/config';

export const buildModuleFederation = ({ notesUrl, friendsUrl }: BuildOptions) => {
	return new webpack.container.ModuleFederationPlugin({
		name: 'host',
		filename: 'remoteEntry.js',
		//
		remotes: {
			notes: `notes@${notesUrl}`,
			friends: `friends@${friendsUrl}`,
		},
		shared: {
			...packageJson.dependencies,
			react: {
				singleton: true,
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				singleton: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				singleton: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			},
			zustand: {
				singleton: true,
				requiredVersion: packageJson.dependencies['zustand'],
			},
		},
	});
};
