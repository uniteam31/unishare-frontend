import { Warning, Widget } from '@uniteam31/uni-shared-ui';
import type { IWidgetProps } from '@uniteam31/uni-shared-ui';
import ErrorIcon from '../../../assets/icons/error.svg';

type Props = {
	title: string;
	text: string;
	size: IWidgetProps['size'];
};

export const ErrorWidget = (props: Props) => {
	const { title, text, size } = props;

	return (
		<Widget
			title={title}
			size={size}
			Icon={<ErrorIcon style={{ width: '30px', height: '30px' }} />}
		>
			<Warning title={'Ошибка'} theme={'red'} text={text} />
		</Widget>
	);
};
