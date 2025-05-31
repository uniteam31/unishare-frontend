import webpack from 'webpack';
import packageJson from '../../../package.json';
import type { BuildMicroservices } from '../types/config';

export const buildModuleFederation = (microservices: BuildMicroservices) => {
	const { NOTES_URL, FRIENDS_URL, CALENDAR_URL, ACCOUNT_SETTINGS_URL, SPACES_URL, DISK_URL } =
		microservices;

	return new webpack.container.ModuleFederationPlugin({
		name: 'host',
		filename: 'remoteEntry.js',
		//
		remotes: {
			notes: `notes@${NOTES_URL}`,
			friends: `friends@${FRIENDS_URL}`,
			calendar: `calendar@${CALENDAR_URL}`,
			accountSettings: `accountSettings@${ACCOUNT_SETTINGS_URL}`,
			spaces: `spaces@${SPACES_URL}`,
			disk: `disk@${DISK_URL}`,
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
