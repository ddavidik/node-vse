import { FC, PropsWithChildren } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isJwtValid } from './isJwtValid';
import Cookies from 'js-cookie';

type Props = PropsWithChildren<{
  redirectPath?: string;
}>;

export const ProtectedRoute: FC<Props> = ({
  redirectPath = '/auth/signin',
  children,
}) => {
  const isAuthenticated = isJwtValid(Cookies.get('jwt'));

  if (!isAuthenticated) return <Navigate to={redirectPath} replace />;

  return <>{children || <Outlet />}</>;
};
