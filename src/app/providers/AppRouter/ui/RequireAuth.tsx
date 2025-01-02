import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import { RoutesPaths } from '../routerConfig/routerConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
	const { authData } = useUserStore();
	const location = useLocation();

	if (!authData) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={RoutesPaths.welcome} state={{ from: location }} replace />;
	}

	return children;
}
