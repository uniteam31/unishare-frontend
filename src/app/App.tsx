import React from 'react';
import './styles/index.scss';
import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/AppRouter';
// TODO импортировать .css после правки конфига
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	return (
		<div className={'App'}>
			<Navbar />

			<AppRouter />
		</div>
	);
};

export default App;
