import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildScssLoader } from '../build/loaders/buildScssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
	// переопределяю конфиг, чтобы storybook умел работать с абсолютными путями
	const paths: BuildPaths = {
		src: path.resolve(__dirname, '..', '..', 'src'),
		html: '',
		build: '',
		entry: '',
		nodeModules: '',
	};

	config?.resolve?.modules?.push(paths.src);
	config?.resolve?.extensions?.push('.ts', '.tsx');

	// для работы с css и scss
	config?.module?.rules?.push(buildScssLoader(true));

	// объявление глобальных переменных
	config?.plugins?.push(
		new DefinePlugin({
			__IS_DEV__: true,
			__API_URL__: JSON.stringify('http://localhost:8080/api'),
		}),
	);

	// для работы с svg
	// @ts-expect-error rule types
	config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/i };
		}

		return rule;
	});

	config?.module?.rules?.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});

	return config;
};
