import React from 'react';
import './styles/index.scss';
import { AppRouter } from './providers/AppRouter';
// TODO импортировать .css после правки конфига
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	return (
		<div className={'App'}>
			{/*<NotesPage />*/}
			<AppRouter />
		</div>
	);
};

export default App;
