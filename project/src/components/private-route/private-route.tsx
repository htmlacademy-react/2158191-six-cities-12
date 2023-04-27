import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { checkAuthAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/authorization-user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

store.dispatch(checkAuthAction());

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
