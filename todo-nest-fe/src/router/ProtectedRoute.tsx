import { FC, PropsWithChildren } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

type Props = PropsWithChildren<{
  isAllowed: boolean;
  redirectPath?: string;
}>;

export const ProtectedRoute: FC<Props> = ({
  isAllowed,
  redirectPath = '/auth/signin',
  children,
}) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;

  return <>{children || <Outlet />}</>;
};
