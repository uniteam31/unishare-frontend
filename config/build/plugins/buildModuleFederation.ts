import webpack from 'webpack';
import packageJson from '../../../package.json';

export const buildModuleFederation = () => {
	return new webpack.container.ModuleFederationPlugin({
		name: 'host',
		filename: 'remoteEntry.js',
		//
		remotes: {
			notes: 'notes@http://localhost:3001/remoteEntry.js',
			friends: 'friends@http://localhost:3002/remoteEntry.js',
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
