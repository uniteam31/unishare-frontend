import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
import { useNavigationStore } from 'entities/Navigation';
import { SpaceIDController, useGetUserSpaces } from 'entities/Space';
import type { ISpace } from 'entities/Space';
import { useUserStore } from 'entities/User';
import LogoutIcon from 'shared/assets/icons/logout.svg';
import { Dropdown, Link } from 'shared/ui';
import type { TDropdownItem } from 'shared/ui';
import { MODULES } from '../model/const';
import s from './Navbar.module.scss';

const getSavedSpaceDropdownItem = (spaces: ISpace[]): TDropdownItem | null => {
	const savedSpaceID = SpaceIDController.getSavedSpaceID();

	if (savedSpaceID) {
		const savedSpace = spaces.find((space) => space.id === savedSpaceID);

		if (savedSpace) {
			return {
				name: savedSpace.name,
				value: savedSpace.id,
			};
		}
	}

	return null;
};

export const Navbar = () => {
	// TODO добавить обработчики
	const { spaces } = useGetUserSpaces();
	const { currentServiceEndPath } = useNavigationStore();
	const { authData, logout } = useUserStore();

	const [selectedSpace, setSelectedSpace] = useState<TDropdownItem | null>(null);

	useEffect(() => {
		const initialSavedSpace = getSavedSpaceDropdownItem(spaces);

		if (!initialSavedSpace) {
			if (spaces.length) {
				const initialSpace = spaces[0];

				setSelectedSpace({ name: initialSpace.name, value: initialSpace.id });
			}

			return;
		}

		setSelectedSpace(initialSavedSpace);
	}, [authData, spaces]);

	const dropdownItems = useMemo(() => {
		const items: TDropdownItem[] = spaces.map((space) => ({
			value: space.id,
			name: space.name,
		}));

		return items;
	}, [spaces]);

	const handleLogout = useCallback(() => {
		logout();
	}, [logout]);

	const handleSelectSpace = useCallback((space: TDropdownItem) => {
		SpaceIDController.setCurrentSpaceIDAndSendEvent(String(space.value));

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

						{!!spaces.length && (
							<>
								<span className={s.serviceName}>/</span>

								<Dropdown
									view={'clear'}
									selectedItem={selectedSpace}
									items={dropdownItems}
									onSelect={handleSelectSpace}
									closeOnClickOutside
								/>
							</>
						)}

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
