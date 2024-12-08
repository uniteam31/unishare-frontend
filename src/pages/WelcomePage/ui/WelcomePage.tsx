import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Login } from 'features/Login';
import { Registration } from 'features/Registration';
import { useUserStore } from 'entities/User';
import ShareIcon from 'shared/assets/icons/share.svg';
import { Button } from 'shared/ui';
import s from './WelcomePage.module.scss';

const WelcomePage = () => {
	const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const { authData } = useUserStore();

	const handleRegistrationModal = useCallback(() => {
		setIsRegistrationModalOpen((prev) => !prev);
	}, []);

	const handleLoginModal = useCallback(() => {
		setIsLoginModalOpen((prev) => !prev);
	}, []);

	if (authData) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={s.WelcomePage}>
			<ShareIcon style={{ maxWidth: '200px' }} />

			<div className={s.title}>UNISHARE</div>

			<div className={s.description}>Здесь будет очень красивый слоган или описание.</div>

			<div className={s.buttonsWrapper}>
				<Button onClick={handleLoginModal} className={s.loginButton}>
					Войти
				</Button>
				или
				<Button onClick={handleRegistrationModal} className={s.registrationButton}>
					Регистрация
				</Button>
			</div>

			<Registration.Modal
				isOpen={isRegistrationModalOpen}
				onClose={handleRegistrationModal}
			/>

			<Login.Modal isOpen={isLoginModalOpen} onClose={handleLoginModal} />
		</div>
	);
};

export default WelcomePage;
