import Cookies from 'js-cookie';
import React, { useCallback, useMemo, useState } from 'react';
import { mutate } from 'swr';
import { useNavigationStore } from 'entities/Navigation';
import { useGetUserSpaces } from 'entities/Space';
import { useUserStore } from 'entities/User';
import LogoutIcon from 'shared/assets/icons/logout.svg';
import { CURRENT_SPACE_ID_COOKIE_KEY } from 'shared/const';
import { Dropdown, Link } from 'shared/ui';
import type { TDropdownItem } from 'shared/ui';
import { MODULES } from '../model/const';
import s from './Navbar.module.scss';

export const Navbar = () => {
	// TODO добавить обработчики
	const { spaces } = useGetUserSpaces();
	const { currentServiceEndPath } = useNavigationStore();
	const { authData, logout } = useUserStore();

	const initialSelectedSpace: TDropdownItem = useMemo(
		() => ({
			name: authData!.username,
			value: authData!.personalSpaceID,
		}),
		[authData],
	);

	const [selectedSpace, setSelectedSpace] = useState<TDropdownItem>(initialSelectedSpace);

	const dropdownItems = useMemo(() => {
		const items: TDropdownItem[] = spaces.map((space) => ({
			value: space._id,
			name: space.name,
		}));

		return items;
	}, [spaces]);

	const handleLogout = useCallback(() => {
		logout();
	}, [logout]);

	const handleSelectSpace = useCallback((space: TDropdownItem) => {
		// TODO запоминать выбранный спейс в localstorage
		Cookies.set(CURRENT_SPACE_ID_COOKIE_KEY, String(space.value));

		mutate(() => true);

		setSelectedSpace(space);
	}, []);

	return (
		<div>
			<div className={s.Navbar}>
				<div className={s.breadcrumbs}>
					<div className={s.navigation}>
						<Link to={'/'}>
							<span className={s.mainName}>UNISHARE</span>
						</Link>

						<span className={s.serviceName}>/</span>

						<Dropdown
							view={'clear'}
							className={s.dropdown}
							selectedItem={selectedSpace}
							items={dropdownItems}
							onSelect={handleSelectSpace}
							closeOnClickOutside
						/>

						{MODULES[currentServiceEndPath].name && (
							<span className={s.serviceName}>
								/{MODULES[currentServiceEndPath].name}
							</span>
						)}
					</div>

					<LogoutIcon className={s.logoutIcon} onClick={handleLogout} />
				</div>
			</div>
		</div>
	);
};
