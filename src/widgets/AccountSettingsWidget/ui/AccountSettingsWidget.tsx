import { Warning } from '@uniteam31/uni-shared-ui';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorWidget, LoadScreen } from 'shared/ui';

const AccountSettingsWidgetComponent = lazy(() =>
	import('accountSettings/Widget').catch(() => {
		return {
			default: () => (
				<ErrorWidget
					title={'Пользователь'}
					text={'Сервис настроек пользователя недоступен'}
					size={'small'}
				/>
			),
		};
	}),
);

export const AccountSettingsWidget = () => {
	return (
		<ErrorBoundary
			fallback={
				<Warning theme={'red'} title={'Ошибка'} text={'Произошла непредвиденная ошибка'} />
			}
		>
			<Suspense fallback={<LoadScreen />}>
				<AccountSettingsWidgetComponent />
			</Suspense>
		</ErrorBoundary>
	);
};
