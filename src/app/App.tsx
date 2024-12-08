import classNames from 'classnames';
import React, { useEffect } from 'react';
import './styles/index.scss';
import { Navbar } from 'widgets/Navbar';
import { useUserStore } from 'entities/User';
import { AppRouter } from './providers/AppRouter';
// TODO импортировать .css после правки конфига
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';
import { Text } from 'shared/ui';

const App = () => {
	const { authData, initAuthData, _init } = useUserStore();

	useEffect(() => {
		initAuthData();
	}, [initAuthData]);

	if (!_init) {
		return (
			<div>
				<Text
					title={
						'Я КРАСИВОЕ СООБЩЕНИЕ УВЕДОМЛЯЮЩЕЕ ПОЛЬЗОВАТЕЛЯ О ЗАГРУЗКЕ ЕГО ПРОСТРАНСТВА'
					}
				/>
			</div>
		);
	}

	return (
		<div className={classNames('App', authData && 'content-page')}>
			{authData && <Navbar />}

			<AppRouter />
		</div>
	);
};

export default App;
