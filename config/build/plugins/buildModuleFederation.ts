import webpack from 'webpack';
import packageJson from '../../../package.json';

export const buildModuleFederation = () => {
	return new webpack.container.ModuleFederationPlugin({
		name: 'host',
		filename: 'remoteEntry.js',
		//
		remotes: {
			notes: 'notes@http://localhost:3001/remoteEntry.js',
		},
		shared: {
			...packageJson.dependencies,
			// react: {
			//     eager: true,
			//     requiredVersion: packageJson.dependencies['react'],
			// },
			// 'react-router-dom': {
			//     eager: true,
			//     requiredVersion: packageJson.dependencies['react-router-dom'],
			// },
			// 'react-dom': {
			//     eager: true,
			//     requiredVersion: packageJson.dependencies['react-dom'],
			// },
		},
	});
};
