import { Button, Warning } from '@uniteam31/uni-shared-ui';
import { useNavigate } from 'react-router';
import s from './ErrorPage.module.scss';

type Props = {
	title: string;
	text: string;
};

export const ErrorPage = (props: Props) => {
	const { title, text } = props;
	const navigate = useNavigate();

	return (
		<div className={s.ErrorPage}>
			<Warning className={s.message} title={title} text={text} theme={'red'} />

			<div className={s.buttons}>
				<Button onClick={() => window.location.reload()}>Перезагрузить</Button>

				<Button onClick={() => navigate('/')}>На главную</Button>
			</div>
		</div>
	);
};
