import React from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { Link } from 'shared/ui/Link/Link';
import { MODULES } from '../model/const';
import s from './Navbar.module.scss';

export const Navbar = () => {
	const { currentService } = useNavigationStore();

	return (
		<div>
			<div className={s.Navbar}>
				<div className={s.breadcrumbs}>
					<Link to={'/'}>
						<span className={s.mainName}>UNISHARE</span>
					</Link>

					{MODULES[currentService].name && (
						<span className={s.serviceName}>/{MODULES[currentService].name}</span>
					)}
				</div>
			</div>
		</div>
	);
};
