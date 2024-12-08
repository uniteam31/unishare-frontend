import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Registration } from 'features/Registration';
import { useUserStore } from 'entities/User';
import { Button } from 'shared/ui';
import s from './WelcomePage.module.scss';

export const WelcomePage = () => {
	const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
	const { authData } = useUserStore();

	const handleRegistrationModal = useCallback(() => {
		setIsRegistrationModalOpen((prev) => !prev);
	}, []);

	if (authData) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={s.WelcomePage}>
			<Button onClick={handleRegistrationModal}>Регистрация</Button>

			<Registration.Modal
				isOpen={isRegistrationModalOpen}
				onClose={handleRegistrationModal}
			/>
		</div>
	);
};
