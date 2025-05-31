import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import { RoutesPaths } from '../routerConfig/routerConfig';

type Props = {
	children: ReactNode;
	isInitRequired?: boolean;
	isAuthRequired?: boolean;
};

export function CheckRequirements(props: Props) {
	const { children, isInitRequired, isAuthRequired } = props;

	const { authData } = useUserStore();
	const location = useLocation();

	if (isAuthRequired && !authData) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={RoutesPaths.welcome} state={{ from: location }} replace />;
	}

	if (isInitRequired && !authData?.isInited) {
		return <Navigate to={RoutesPaths.main} state={{ from: location }} replace />;
	}

	return children;
}
