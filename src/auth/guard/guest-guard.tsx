import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { useAuth } from '../context/auth';

interface Props {
  children: ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={paths.app.root} />;
  }

  return <>{children}</>;
}
